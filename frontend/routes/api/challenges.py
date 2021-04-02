from flask import Blueprint, jsonify

from frontend.model.challenges import ChallengeSet, Challenge

bp = Blueprint("challenges", __name__)


def map_challenge_set(x):
    return {
        "id": x.id,
        "slug": x.slug,
        "name": x.name,
        "description": x.description
    }


def map_challenge(x):
    return {
        "id": x.id,
        "slug": x.slug,
        "name": x.name,
        "description": x.description,
        "documentation": {}
    }


@bp.route("/challenge-sets")
def list_challenge_sets():
    challenge_sets = map(map_challenge_set, ChallengeSet.query.all())

    return jsonify(list(challenge_sets))


@bp.route("/challenge-sets/<challenge_set_slug>")
def get_challenge_set(challenge_set_slug):
    cs = ChallengeSet.query.filter_by(slug=challenge_set_slug).first_or_404()
    challenge_set = map_challenge_set(cs)

    return jsonify(challenge_set)


@bp.route("/challenge-sets/<challenge_set_slug>/challenges")
def get_challenge_set_challenges(challenge_set_slug):
    cs = ChallengeSet.query.filter_by(slug=challenge_set_slug).first_or_404()
    c = map(map_challenge, Challenge.query.filter_by(parent_id=cs.id).all())

    return jsonify(list(c))
