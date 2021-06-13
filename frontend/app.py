"""
This file constructs the Flask application and registers extensions / routes.
"""
import sys

from flask import Flask, jsonify

from .extensions import (
    db,
    migrate,
)

from .model.challenges import *


def create_app(config_object="frontend.settings"):
    """
    Create application factory, as explained here:
    http://flask.pocoo.org/docs/patterns/appfactories/.
    :param config_object: The configuration object to use.
    """
    app = Flask(__name__.split(".")[0])
    app.config.from_object(config_object)

    register_extensions(app)
    register_blueprints(app)
    return app


def register_extensions(app):
    """
    Register Flask extensions.
    """
    db.init_app(app)
    migrate.init_app(app, db)
    return None


def register_blueprints(app):
    """
    Register Flask blueprints.
    """
    from .routes import root_bp
    from .routes.api import admin_challenges_bp, challenges_bp, user_environments_bp

    app.register_blueprint(root_bp, url_prefix="/")

    app.register_blueprint(challenges_bp, url_prefix="/api/")
    app.register_blueprint(admin_challenges_bp, url_prefix="/api/admin/")
    app.register_blueprint(user_environments_bp, url_prefix="/api/user/")

    return None
