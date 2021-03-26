from sqlalchemy import Column, Text, text
from sqlalchemy.dialects.postgresql import JSONB, UUID

from frontend.main import db


class ChallengeSet(db.Model):
    __table__ = "challenge-set"

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("uuid_generate_v4()")
    )
    slug = Column(Text(), index=True)
    name = Column(Text())
    description = Column(Text())
    version = Column(Text())


class Challenge(db.Model):
    __table__ = "challenge"

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("uuid_generate_v4()")
    )
    slug = Column(Text(), index=True)
    name = Column(Text())
    description = Column(Text())
    provisioner = Column(JSONB())
    documentation = Column(JSONB())
