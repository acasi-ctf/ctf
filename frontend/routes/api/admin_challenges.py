from flask import Blueprint, request, Response

bp = Blueprint("admin_challenges", __name__)


@bp.route("/challenge-sets", methods=["GET"])
def api_admin_challenge_sets_list():
    return "[]"


@bp.route("/challenge-sets", methods=["POST"])
def api_admin_challenges_create():
    return Response(status=204)
