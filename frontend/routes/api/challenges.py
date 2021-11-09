"""
Routes that relate to fetching challenge sets and challenges.
"""
from flask import Blueprint, jsonify, Response
from sqlalchemy import func

from frontend.extensions import db
from frontend.model.challenges import (
    ChallengeSet,
    Challenge,
    Documentation,
    UserChallenges,
)


"""
Blueprint that encapsulates this group of routes.
"""
bp = Blueprint("challenges", __name__)


def map_challenge_set(x):
    """
    Map a SQLAlchemy ChallengeSet model object into a generic map.
    :param x: SQLAlchemy ChallengeSet model.
    :return: Generic map containing relevant details for REST API.
    """
    return {"id": x.id, "slug": x.slug, "name": x.name, "description": x.description}


def map_challenge(x):
    """
    Map a SQLAlchemy Challenge model object into a generic map.
    :param x: SQLAlchemy Challenge model.
    :return: Generic map containing relevant details for REST API.
    """
    return {
        "id": x.id,
        "slug": x.slug,
        "name": x.name,
        "description": x.description,
        "documentation": list(map(map_documentation, x.documentation)),
    }


def map_documentation(x):
    """
    Map a SQLAlchemy Documentation model object into a generic map.
    :param x: SQLAlchemy Documentation model.
    :return: Generic map containing relevant details for REST API.
    """
    return {"path": x.path, "name": x.name, "order": x.order}


@bp.route("/challenge-sets")
def list_challenge_sets():
    """
    This route lists challenge sets.
    :return: List of challenge sets in JSON.
    """
    challenge_sets = map(map_challenge_set, ChallengeSet.query.all())

    return jsonify(list(challenge_sets))


@bp.route("/challenge-sets/<challenge_set_slug>")
def get_challenge_set(challenge_set_slug):
    """
    This route gets a challenge set.
    :param challenge_set_slug: Slug of the challenge set to fetch.
    :return: Challenge set in JSON.
    """
    cs = ChallengeSet.query.filter_by(slug=challenge_set_slug).first_or_404()
    challenge_set = map_challenge_set(cs)

    return jsonify(challenge_set)


@bp.route("/challenge-sets/<challenge_set_slug>/challenges")
def list_challenge_set_challenges(challenge_set_slug):
    """
    This route lists challenges in a challenge set.
    :param challenge_set_slug: Slug of the challenge set to fetch.
    :return: List of challenges in JSON.
    """
    cs = ChallengeSet.query.filter_by(slug=challenge_set_slug).first_or_404()
    c = map(map_challenge, cs.challenges)

    return jsonify(list(c))


@bp.route("/challenge-sets/<challenge_set_slug>/challenges/<challenge_slug>")
def get_challenge(challenge_set_slug, challenge_slug):
    """
    This route gets a challenge.
    :param challenge_set_slug: Slug of the challenge set to fetch.
    :param challenge_slug: Slug of the challenge to fetch.
    :return: Challenge in JSON.
    """
    cs = ChallengeSet.query.filter_by(slug=challenge_set_slug).first_or_404()
    c = Challenge.query.filter_by(parent_id=cs.id, slug=challenge_slug).first_or_404()

    return jsonify(map_challenge(c))


@bp.route(
    "/challenge-sets/<challenge_set_slug>/challenges/<challenge_slug>/docs/<path:doc_path>"
)
def get_challenge_doc(challenge_set_slug, challenge_slug, doc_path):
    """
    This route gets a document.
    :param challenge_set_slug: Slug of the challenge set to fetch.
    :param challenge_slug: Slug of the challenge to fetch.
    :param doc_path: Path of documentation to fetch.
    :return: Documentation in Markdown with proper mimetype set.
    """
    cs = ChallengeSet.query.filter_by(slug=challenge_set_slug).first_or_404()
    c = Challenge.query.filter_by(parent_id=cs.id, slug=challenge_slug).first_or_404()
    d = Documentation.query.filter_by(parent_id=c.id, path=doc_path).first_or_404()

    return Response(d.content, mimetype="text/markdown")


@bp.route("/top-challenges")
def get_top_challenges():
    """
    This route groups challenges and returns the play count of each.
    :return: JSON list of challenge set and challenge objects, with their respective count.
    """
    joined = (
        db.session.query(
            UserChallenges.challenge_id,
            func.count(UserChallenges.challenge_id).label("count"),
            Challenge,
            ChallengeSet,
        )
        .join(Challenge, UserChallenges.challenge_id == Challenge.id)
        .join(ChallengeSet, Challenge.parent_id == ChallengeSet.id)
        .group_by(UserChallenges.challenge_id, Challenge, ChallengeSet)
        .order_by(func.count(UserChallenges.challenge_id).desc())
        .limit(5)
        .all()
    )

    def map_joined(x):
        return {
            "challengeSet": map_challenge_set(x["ChallengeSet"]),
            "challenge": map_challenge(x["Challenge"]),
            "playCount": x["count"],
        }

    challenges = map(map_joined, joined)

    return jsonify(list(challenges))
