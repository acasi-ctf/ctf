"""
Routes that relate to managing challenges by an administrator.
"""
from flask import Blueprint, request, Response

from frontend.challenges.model_reconciler import ChallengeSetModelReconciler
from frontend.challenges.template import ChallengeTemplate
from frontend.extensions import provisioning_service
from frontend.pb import UploadEnvironmentTemplateRequest
from frontend.routes.decorators import requires_permission_raise, requires_auth
from frontend.routes.scopes import permission_write_challenges

"""
Blueprint that encapsulates this group of routes.
"""
bp = Blueprint("admin_challenges", __name__)


@bp.route("/challenge-sets", methods=["GET"])
@requires_auth
def api_admin_challenge_sets_list():
    return "[]"


@bp.route("/challenge-sets", methods=["POST"])
@requires_auth
def api_admin_challenges_create():
    requires_permission_raise(permission_write_challenges)
    file = request.files["file"]
    contents = file.read()

    from zipfile import ZipFile
    from io import BytesIO

    zipfile = ZipFile(BytesIO(contents))
    ct = ChallengeTemplate(zipfile)

    reconciler = ChallengeSetModelReconciler(ct)
    reconciler.reconcile()

    # TODO: Should we move this into the reconciler?
    r = UploadEnvironmentTemplateRequest()
    r.env_zip = contents
    provisioning_service.UploadEnvironmentTemplate(r)

    return Response(status=204)
