"""
Routes that relate to managing challenges by an administrator.
"""
from flask import Blueprint, request, Response

"""
Blueprint that encapsulates this group of routes.
"""
bp = Blueprint("admin_challenges", __name__)


@bp.route("/challenge-sets", methods=["GET"])
def api_admin_challenge_sets_list():
    return "[]"


@bp.route("/challenge-sets", methods=["POST"])
def api_admin_challenges_create():
    return Response(status=204)
