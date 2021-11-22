from sqlalchemy.dialects.postgresql import insert

from frontend.extensions import db
from frontend.model.challenges import ChallengeSet, Challenge, Documentation


class ChallengeSetModelReconciler:
    def __init__(self, template):
        self.template = template
        self.order_map = {}

    @staticmethod
    def map_challenge_model(cs_id):
        def inner(chl):
            features_default = []
            flag_default = {
                "type": "none"
            }

            return insert(Challenge).values(
                id=chl.id,
                slug=chl.slug,
                parent_id=cs_id,
                name=chl.name,
                description=chl.description,
                provisioner={},
                features=getattr(chl, "features", features_default),
                flag=getattr(chl, "flag", flag_default),
            ).on_conflict_do_update(
                index_elements=['id'],
                set_=dict(
                    slug=chl.slug,
                    parent_id=cs_id,
                    name=chl.name,
                    description=chl.description,
                    features=getattr(chl, "features", features_default),
                    flag=getattr(chl, "flag", flag_default),
                )
            )

        return inner

    def map_challenge_doc_model(self, chl_id, chl_slug):
        def inner(doc):
            name = doc["name"]
            path = doc["path"]

            if chl_id not in self.order_map:
                self.order_map[chl_id] = 0
            order = self.order_map[chl_id]
            self.order_map[chl_id] = order + 1

            return insert(Documentation).values(
                parent_id=chl_id,
                path=path,
                order=order,
                name=name,
                content=self.template.read_file(f"challenges/{chl_slug}/{path}"),
            ).on_conflict_do_update(
                index_elements=['parent_id', 'path'],
                set_=dict(
                    path=path,
                    order=order,
                    name=name,
                    content=self.template.read_file(f"challenges/{chl_slug}/{path}"),
                )
            )

        return inner

    def reconcile(self):
        """
        Reconcile the state of the database according to the challenge set
        template.
        """
        challenge_set_template = self.template.challenge_set

        challenge_set = insert(ChallengeSet).values(
            id=challenge_set_template.id,
            slug=challenge_set_template.slug,
            name=challenge_set_template.name,
            description=challenge_set_template.description,
            version=challenge_set_template.version,
        ).on_conflict_do_update(
            index_elements=['id'],
            set_=dict(
                slug=challenge_set_template.slug,
                name=challenge_set_template.name,
                description=challenge_set_template.description,
                version=challenge_set_template.version,
            )
        )
        db.session.execute(challenge_set)

        challenges = list(
            map(self.map_challenge_model(challenge_set_template.id), self.template.challenges)
        )
        for challenge in challenges:
            db.session.execute(challenge)

        for challenge in self.template.challenges:
            docs = list(
                map(self.map_challenge_doc_model(challenge.id, challenge.slug), challenge.documentation)
            )
            for doc in docs:
                db.session.execute(doc)

        db.session.commit()
