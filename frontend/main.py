"""
This is the main file that initializes the Flask application.
"""
from flask import jsonify

from frontend.app import create_app
from frontend.autherror import AuthError

app = create_app()


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
