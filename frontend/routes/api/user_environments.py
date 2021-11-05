"""
Routes that relate to managing user environments.
"""
from flask import Blueprint, jsonify, request

from frontend.extensions import lookup_service, provisioning_service
from frontend.model.challenges import ChallengeSet, Challenge
from frontend.pb import (
    ListUserEnvironmentsRequest,
    StartEnvironmentRequest,
    ListEnvironmentServicesRequest,
)
from frontend.routes.decorators import (
    requires_auth,
    get_user_id,
    requires_permission_raise,
)
from frontend.routes.scopes import permission_write_user_environments, \
    permission_read_user_environments

"""
Blueprint that encapsulates this group of routes.
"""
bp = Blueprint("user_environments", __name__)


@bp.route("/environments", methods=["GET"])
@requires_auth
def list_user_environments():
    requires_permission_raise(permission_read_user_environments)

    user_id = get_user_id()

    r = ListUserEnvironmentsRequest()
    r.user_id.contents = user_id
    resp = lookup_service.ListUserEnvironments(r)

    def map_env(env):
        cs_id = env.challenge_set_id.contents
        c_id = env.challenge_id.contents
        cs = ChallengeSet.query.filter_by(id=cs_id).first()
        c = Challenge.query.filter_by(id=c_id).first()

        return {
            "id": env.env_id.contents,
            "challengeSetId": env.challenge_set_id.contents,
            "challengeId": env.challenge_id.contents,
            "challengeSetSlug": cs.slug,
            "challengeSlug": c.slug,
        }

    environments = list(map(map_env, resp.environments))
    return jsonify(environments)


@bp.route("/environments", methods=["POST"])
@requires_auth
def create_user_environment():
    requires_permission_raise(permission_write_user_environments)

    user_id = get_user_id()
    body = request.get_json()

    if "challengeSetSlug" not in body or "challengeSlug" not in body:
        # TODO: Better errors
        return jsonify({}), 400

    cs_slug = body["challengeSetSlug"]
    c_slug = body["challengeSlug"]

    cs = ChallengeSet.query.filter_by(slug=cs_slug).first_or_404()
    c = Challenge.query.filter_by(parent_id=cs.id, slug=c_slug).first_or_404()

    r = StartEnvironmentRequest()
    r.challenge_set_id.contents = str(cs.id)
    r.challenge_id.contents = str(c.id)
    r.challenge_owner.contents = user_id

    resp = provisioning_service.StartEnvironment(r)

    return jsonify({"id": resp.success.environment_id.contents})


@bp.route("/environments/<env_id>/services")
@requires_auth
def get_environment_services(env_id):
    """
    This route gets an environment's services.
    :param env_id: ID of the environment.
    :return: List of environment services.
    """
    requires_permission_raise(permission_read_user_environments)

    # TODO: Does not validate whether the environment is the user's own.

    r = ListEnvironmentServicesRequest()
    r.environment_id.contents = env_id

    resp = lookup_service.ListEnvironmentServices(r)

    def map_termproxy_service(svc):
        return {
            "host": svc.host,
            "port": svc.port
        }

    def map_web_service(svc):
        return {
            "url": svc.url
        }

    termproxy_services = list(map(map_termproxy_service,
                                  resp.termproxy_services))
    web_services = list(map(map_web_service, resp.web_services))

    return jsonify({
        "termproxy": termproxy_services,
        "web": web_services
    })
