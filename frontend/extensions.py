"""
This file contains all Flask extensions.
"""
import os
import grpc

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from frontend.pb import EnvironmentLookupServiceStub, EnvironmentProvisioningServiceStub

operator_channel_target = "localhost:1234"
if os.getenv("CTF_OPERATOR_SERVICE_HOST"):
    host = os.getenv("CTF_OPERATOR_SERVICE_HOST")
    operator_channel_target = f"{host}:1234"

db = SQLAlchemy()
migrate = Migrate()
operator_channel = grpc.insecure_channel(operator_channel_target)
lookup_service = EnvironmentLookupServiceStub(operator_channel)
provisioning_service = EnvironmentProvisioningServiceStub(operator_channel)
