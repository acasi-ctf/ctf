"""
This file defines database tables for the Frontend API using SQLAlchemy.
"""
from sqlalchemy import Column, ForeignKey, Text, text, PrimaryKeyConstraint, Integer, DateTime
from sqlalchemy.dialects.postgresql import BYTEA, JSONB, UUID
from sqlalchemy.orm import relationship

from frontend.extensions import db


class ChallengeSet(db.Model):
    """
    This table contains challenge sets.
    """

    __tablename__ = "challenge_set"

    """
    Universally-unique ID of this challenge.
    """
    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("uuid_generate_v4()")
    )

    """
    Human and URL-friendly representation of a challenge set's name.
    """
    slug = Column(Text, index=True, unique=True, nullable=False)

    """
    Human name of this challenge set.
    """
    name = Column(Text, nullable=False)

    """
    Description of this challenge set.
    """
    description = Column(Text, nullable=False)

    """
    Human-friendly version of this challenge set.
    """
    version = Column(Text, nullable=False)

    """
    Relationship to Challenge table.
    """
    challenges = relationship("Challenge")


class Challenge(db.Model):
    """
    This table contains challenges, which have a many-to-one relationship with
    a single challenge set parent.
    """

    __tablename__ = "challenge"

    """
    Universally-unique ID of this challenge.
    """
    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("uuid_generate_v4()")
    )

    """
    Human and URL-friendly representation of a challenge's name.
    """
    slug = Column(Text, nullable=False)

    """
    Foreign key that references the parent challenge set's universally-unique ID.
    """
    parent_id = Column(
        UUID(as_uuid=True),
        ForeignKey("challenge_set.id", ondelete="CASCADE"),
        nullable=False,
    )

    """
    Human name of this challenge.
    """
    name = Column(Text(), nullable=False)

    """
    Description of this challenge.
    """
    description = Column(Text, nullable=False)

    """
    Provisioner information of this challenge.
    """
    provisioner = Column(JSONB, nullable=False)

    """
    Relationship to Documentation table.
    """
    documentation = relationship("Documentation")


class Documentation(db.Model):
    """
    This table contains documentation for challenges.
    """

    __tablename__ = "documentation"
    __table_args__ = (PrimaryKeyConstraint("parent_id", "path"),)

    """
    Foreign key that references the parent challenge's universally-unique ID.
    """
    parent_id = Column(
        UUID(as_uuid=True), ForeignKey("challenge.id", ondelete="CASCADE")
    )

    """
    Unique path to documentation.
    """
    path = Column(Text, nullable=False)

    """
    Order in which this documentation should show up in the UI.
    """
    order = Column(Integer, nullable=False)

    """
    Name to be used for this documentation in the UI.
    """
    name = Column(Text, nullable=False)

    """
    Contents of this documentation.
    """
    content = Column(BYTEA, nullable=False)


class UserChallenges(db.Model):
    """
    This table contains data on recently run challenges.
    """

    __tablename__ = "user_challenges"

    """
    Id of challenge run.
    """
    challenge_id = Column(
        UUID(as_uuid=True), ForeignKey("challenge.id", ondelete="CASCADE")
    )

    """
    Id of user who ran challenge.
    """
    user_id = Column(UUID(as_uuid=True), nullable=False)

    """
    Time challenge was initialized.
    """
    created = Column(DateTime, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint(challenge_id, user_id, created),
    )
