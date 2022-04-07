import json
import os
from functools import wraps
from urllib.request import urlopen

from flask import request, _request_ctx_stack
from jose import jwt

from frontend.autherror import AuthError

AUTH0_DOMAIN = "acasictf-dev-lg.us.auth0.com"
API_AUDIENCE = "https://ctf.cyberliteracyforall.com/api"
ALGORITHMS = ["RS256"]
AUTH_DISABLED = os.getenv("AUTH_DISABLE") == "true"

if AUTH_DISABLED:
    print("Warning: auth is disabled!")


def requires_scope(required_scope):
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """
    if AUTH_DISABLED:
        return True
    token = get_token_auth_header()
    unverified_claims = jwt.get_unverified_claims(token)
    if unverified_claims.get("scope"):
        token_scopes = unverified_claims["scope"].split()
        for token_scope in token_scopes:
            if token_scope == required_scope:
                return True
    return False


def requires_permission(required_permission):
    """
    Determines if the required permission is present in the Access Token
    Args:
        required_permission (str): The permission required to access the resource
    """
    if AUTH_DISABLED:
        return True
    token = get_token_auth_header()
    unverified_claims = jwt.get_unverified_claims(token)
    if unverified_claims.get("permissions"):
        token_permissions = unverified_claims["permissions"]
        for token_permission in token_permissions:
            if token_permission == required_permission:
                return True
    return False


def requires_permission_raise(required_permission):
    if not requires_permission(required_permission):
        raise AuthError(
            {
                "code": "missing_permission",
                "description": "User does not have necessary permission for this resource",
            },
            403,
        )


def get_user_id():
    if AUTH_DISABLED:
        return "82a74aeb-aeb4-465c-a014-d097ee346d63"
    token = get_token_auth_header()
    unverified_claims = jwt.get_unverified_claims(token)
    if unverified_claims.get("http://acasictf.org/user-id"):
        return unverified_claims["http://acasictf.org/user-id"]
    raise AuthError(
        {
            "code": "user_id_claim_missing",
            "description": "User ID claim is missing",
        },
        400,
    )

def get_user_name():
    if AUTH_DISABLED:
        return "Guest User"
    token = get_token_auth_header()
    unverified_claims = jwt.get_unverified_claims(token)
    if unverified_claims.get("http://acasictf.org/nickname"):
        return unverified_claims["http://acasictf.org/nickname"]
    raise AuthError(
        {
            "code": "user_name_claim_missing",
            "description": "User Name claim is missing",
        },
        400,
    )


def get_token_auth_header():
    """Obtains the Access Token from the Authorization Header"""
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise AuthError(
            {
                "code": "authorization_header_missing",
                "description": "Authorization header is expected",
            },
            401,
        )

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise AuthError(
            {
                "code": "invalid_header",
                "description": "Authorization header must start with" " Bearer",
            },
            401,
        )
    elif len(parts) == 1:
        raise AuthError(
            {"code": "invalid_header", "description": "Token not found"}, 401
        )
    elif len(parts) > 2:
        raise AuthError(
            {
                "code": "invalid_header",
                "description": "Authorization header must be" " Bearer token",
            },
            401,
        )

    token = parts[1]
    return token


def requires_auth(f):
    """Determines if the Access Token is valid"""
    if AUTH_DISABLED:
        return f

    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen("https://" + AUTH0_DOMAIN + "/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"],
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer="https://" + AUTH0_DOMAIN + "/",
                )
            except jwt.ExpiredSignatureError:
                raise AuthError(
                    {"code": "token_expired", "description": "token is expired"}, 401
                )
            except jwt.JWTClaimsError:
                raise AuthError(
                    {
                        "code": "invalid_claims",
                        "description": "incorrect claims,"
                        "please check the audience and issuer",
                    },
                    401,
                )
            except Exception:
                raise AuthError(
                    {
                        "code": "invalid_header",
                        "description": "Unable to parse authentication" " token.",
                    },
                    401,
                )

            _request_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)
        raise AuthError(
            {"code": "invalid_header", "description": "Unable to find appropriate key"},
            401,
        )

    return decorated
