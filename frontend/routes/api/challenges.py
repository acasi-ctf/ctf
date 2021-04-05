from flask import Blueprint, jsonify, Response

from frontend.model.challenges import ChallengeSet, Challenge, Documentation

bp = Blueprint("challenges", __name__)


def map_challenge_set(x):
    return {"id": x.id, "slug": x.slug, "name": x.name, "description": x.description}


def map_challenge(x):
    return {
        "id": x.id,
        "slug": x.slug,
        "name": x.name,
        "description": x.description,
        "documentation": list(map(map_documentation, x.documentation)),
    }


def map_documentation(x):
    return {"path": x.path, "name": x.name, "order": x.order}


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
def list_challenge_set_challenges(challenge_set_slug):
    cs = ChallengeSet.query.filter_by(slug=challenge_set_slug).first_or_404()
    c = map(map_challenge, cs.challenges)

    return jsonify(list(c))


@bp.route("/challenge-sets/<challenge_set_slug>/challenges/<challenge_slug>")
def get_challenge(challenge_set_slug, challenge_slug):
    cs = ChallengeSet.query.filter_by(slug=challenge_set_slug).first_or_404()
    c = Challenge.query.filter_by(parent_id=cs.id, slug=challenge_slug).first_or_404()

    return jsonify(map_challenge(c))


@bp.route(
    "/challenge-sets/<challenge_set_slug>/challenges/<challenge_slug>/docs/<doc_path>"
)
def get_challenge_doc(challenge_set_slug, challenge_slug, doc_path):
    cs = ChallengeSet.query.filter_by(slug=challenge_set_slug).first_or_404()
    c = Challenge.query.filter_by(parent_id=cs.id, slug=challenge_slug).first_or_404()
    d = Documentation.query.filter_by(parent_id=c.id, path=doc_path).first_or_404()

    return Response(d.content, mimetype="text/markdown")
