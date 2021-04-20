"""
This file contains all Flask extensions.
"""
import os
import grpc

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

operator_channel_target = "localhost:1234"
if os.getenv("OPERATOR_HOST"):
    host = os.getenv("OPERATOR_HOST")
    operator_channel_target = f"{host}:1234"

db = SQLAlchemy()
migrate = Migrate()
operator_channel = grpc.insecure_channel(operator_channel_target)
