from sqlalchemy import Column, ForeignKey, Text, text, PrimaryKeyConstraint, Integer
from sqlalchemy.dialects.postgresql import BYTEA, JSONB, UUID
from sqlalchemy.orm import relationship

from frontend.extensions import db


class ChallengeSet(db.Model):
    __tablename__ = "challenge_set"

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("uuid_generate_v4()")
    )
    slug = Column(Text, index=True, unique=True, nullable=False)
    name = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    version = Column(Text, nullable=False)

    challenges = relationship("Challenge")


class Challenge(db.Model):
    __tablename__ = "challenge"

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("uuid_generate_v4()")
    )
    slug = Column(Text, nullable=False)
    parent_id = Column(
        UUID(as_uuid=True),
        ForeignKey("challenge_set.id", ondelete="CASCADE"),
        nullable=False,
    )
    name = Column(Text(), nullable=False)
    description = Column(Text, nullable=False)
    provisioner = Column(JSONB, nullable=False)

    documentation = relationship("Documentation")


class Documentation(db.Model):
    __tablename__ = "documentation"
    __table_args__ = (PrimaryKeyConstraint("parent_id", "path"),)

    parent_id = Column(
        UUID(as_uuid=True), ForeignKey("challenge.id", ondelete="CASCADE")
    )
    path = Column(Text, nullable=False)
    order = Column(Integer, nullable=False)
    name = Column(Text, nullable=False)
    content = Column(BYTEA, nullable=False)
