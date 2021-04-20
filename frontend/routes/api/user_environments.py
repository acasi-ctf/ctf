"""
Routes that relate to managing user environments.
"""
from flask import Blueprint, jsonify, Response

"""
Blueprint that encapsulates this group of routes.
"""
bp = Blueprint("user_environments", __name__)


@bp.route("/environments")
def list_user_environments():
    return jsonify(
        [
            {
                "id": "880e579a-a40e-4ffa-b806-997f49b4286a",
                "challengeSetSlug": "example",
                "challengeSlug": "basic-env-example",
            }
        ]
    )
