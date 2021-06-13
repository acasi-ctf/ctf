"""
Root page route.
"""
from flask import Blueprint

"""
Blueprint that encapsulates this group of routes.
"""
bp = Blueprint("root", __name__)


@bp.route("/", methods=["GET"])
def root():
    return ""
