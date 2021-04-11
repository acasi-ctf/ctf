"""
This file encapsulates configuration for the Flask application.
"""
import os


sqlAlchemyUri = "postgresql://postgres:postgres@localhost:5432/ctf_frontend"
if os.getenv("POSTGRES_HOST"):
    host = os.getenv("POSTGRES_HOST")
    password = os.getenv("POSTGRES_PASSWORD")
    sqlAlchemyUri = f"postgresql://postgres:{password}@{host}:5432/ctf_frontend"


SQLALCHEMY_DATABASE_URI = sqlAlchemyUri
