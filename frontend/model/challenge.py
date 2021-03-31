from sqlalchemy import Column, ForeignKey, Text, text
from sqlalchemy.dialects.postgresql import JSONB, UUID

from frontend.extensions import db


class ChallengeSet(db.Model):
    __tablename__ = "challenge_set"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("uuid_generate_v4()")
    )
    slug = Column(
        Text(),
        index=True,
        nullable=False
    )
    name = Column(
        Text(),
        nullable=False
    )
    description = Column(
        Text(),
        nullable=False
    )
    version = Column(
        Text(),
        nullable=False
    )


class Challenge(db.Model):
    __tablename__ = "challenge"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("uuid_generate_v4()")
    )
    parent = Column(UUID(as_uuid=True),
                    ForeignKey("challenge_set.id", ondelete='CASCADE'),
                    nullable=False)
    slug = Column(
        Text(),
        index=True,
        nullable=False
    )
    name = Column(
        Text(),
        nullable=False
    )
    description = Column(
        Text(),
        nullable=False
    )
    provisioner = Column(
        JSONB(),
        nullable=False
    )
    documentation = Column(
        JSONB(),
        nullable=False
    )
