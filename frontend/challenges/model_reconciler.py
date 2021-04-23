from frontend.extensions import db
from frontend.model.challenges import ChallengeSet, Challenge


class ChallengeSetModelReconciler:
    def __init__(self, template):
        self.template = template

    @staticmethod
    def map_challenge_model(cs_id):
        def inner(c):
            return Challenge(
                id=c.id,
                slug=c.slug,
                parent_id=cs_id,
                name=c.name,
                description=c.description,
                provisioner="{}",
            )

        return inner

    def reconcile(self):
        """
        Reconcile the state of the database according to the challenge set
        template.
        """
        cst = self.template.challenge_set

        # TODO: Reconcile deletes and reinserts existing rows, we need to
        #  upsert instead.
        ChallengeSet.query.filter_by(id=cst.id).delete()

        cs = ChallengeSet(
            id=cst.id,
            slug=cst.slug,
            name=cst.name,
            description=cst.description,
            version=cst.version,
        )
        db.session.add(cs)

        challenges = list(
            map(self.map_challenge_model(cs.id), self.template.challenges)
        )
        for c in challenges:
            db.session.add(c)

        # TODO: Handle commit/rollback, instead of blindly committing.
        db.session.commit()
