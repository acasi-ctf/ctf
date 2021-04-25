from frontend.extensions import db
from frontend.model.challenges import ChallengeSet, Challenge, Documentation


class ChallengeSetModelReconciler:
    def __init__(self, template):
        self.template = template
        self.order_map = {}

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

    def map_challenge_doc_model(self, c_id, c_slug):
        def inner(d):
            name = d["name"]
            path = d["path"]

            if c_id not in self.order_map:
                self.order_map[c_id] = 0
            order = self.order_map[c_id]
            self.order_map[c_id] = order + 1
            return Documentation(
                parent_id=c_id,
                path=path,
                order=order,
                name=name,
                content=self.template.read_file(f"challenges/{c_slug}/{path}"),
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

        for c in self.template.challenges:
            documentation = list(
                map(self.map_challenge_doc_model(c.id, c.slug), c.documentation)
            )
            for d in documentation:
                db.session.add(d)

        # TODO: Handle commit/rollback, instead of blindly committing.
        db.session.commit()
