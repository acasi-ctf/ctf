from frontend.challenges.challenge import Challenge
from frontend.challenges.challenge_set import ChallengeSet


class ChallengeTemplate:
    def __init__(self, zip_file):
        self.zip_file = zip_file
        self.challenge_set = self.read_challenge_set()
        self.challenges = self.read_challenges(self.challenge_set.challenges)

    def read_file(self, path):
        return self.zip_file.read(path)

    def read_challenge_set(self):
        cs_data = self.read_file("challenge-set.json")
        return ChallengeSet(cs_data)

    def read_challenges(self, slugs):
        def read_challenge(slug):
            c_data = self.read_file(f"challenges/{slug}/challenge.json")
            return Challenge(c_data)

        return list(map(read_challenge, slugs))
