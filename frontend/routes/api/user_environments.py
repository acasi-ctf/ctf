"""
Routes that relate to managing user environments.
"""
from flask import Blueprint, jsonify
from frontend.extensions import lookup_service
from frontend.pb import ListUserEnvironmentsRequest
from frontend.routes.decorators import requires_auth, get_user_id

"""
Blueprint that encapsulates this group of routes.
"""
bp = Blueprint("user_environments", __name__)


@bp.route("/environments")
@requires_auth
def list_user_environments():
    user_id = get_user_id()

    r = ListUserEnvironmentsRequest()
    r.user_id.contents = user_id
    resp = lookup_service.ListUserEnvironments(r)

    def map_env(env):
        return {
            "id": env.env_id.contents,
            "challengeSetId": env.challenge_set_id.contents,
            "challengeId": env.challenge_id.contents,
        }

    environments = list(map(map_env, resp.environments))
    return jsonify(environments)
