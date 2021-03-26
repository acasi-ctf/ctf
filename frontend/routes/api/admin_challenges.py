from flask import request, Blueprint

bp = Blueprint('admin_challenges', __name__)


@bp.route('', methods=['GET'])
def api_admin_challenges_list():
    return "[]"


@bp.route('', methods=['POST'])
def api_admin_challenges_create():
    return {
        'test': 123
    }
