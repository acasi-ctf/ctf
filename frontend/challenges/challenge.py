import json


class Challenge:
    def __init__(self, j):
        self.__dict__ = json.loads(j)
