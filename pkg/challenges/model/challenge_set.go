package model

type ChallengeSet struct {
	Id          string
	Slug        string
	Name        string
	Description string
	Version     string
	Challenges  []string
}
