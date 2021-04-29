# CTF
[![codecov](https://codecov.io/gh/acasi-ctf/ctf/branch/main/graph/badge.svg?token=LHDORJRILA)](https://codecov.io/gh/acasi-ctf/ctf)

Capture the Flag is usually a competition between highly skilled individuals to
see who can breach a computer system first. With our CTF platform, we want to
make it easy for beginners (ideally high school or early college) to get started
learning in the computer security field.

## Documentation
Our documentation is currently under construction as of writing, but you can
view our progress by visiting [our docs](https://acasi-ctf.github.io/docs/).

## Sprint summaries
### Sprint 1
During our first sprint, the primary task we were working on was to bootstrap
the environment in which we will be working within. This includes a prototype
UI, which was built in JavaScript/TypeScript/React. Also, our backend
requirements are very involved. Because we're running isolated environments in
Kubernetes, we have to be able to both provision those on the fly, as well as
connect to them with a terminal. Finally, we had to tie it together to deploy
into a cloud-like environment for the demo, which is one of our teammate's
personal Kubernetes clusters. This will be migrated to a cloud service in the
near future.

Additionally, we have some GitHub Actions workflows set up, but they're still
in progress. Go tests run currently, and there are a large number of linters
provided by the Superlinter Action that GitHub themselves create, but it can be
pretty picky and I have to manually adjust rules for it at times. Also, we have
branch protection set up, so that only the owners of this repository can push to
the main branch.

#### Demo Meeting
Our demo meeting recording is provided below, we were the first to go and were
approximately 10-15 minutes. The rest of the time is with our sister team,
Anatomy of Attack. It should be noted that this was just a rehersal demo and that
we had originally been planning on meeting with them Friday 3/19 to do our demo,
but Renuka and Mudit wanted to do a rehersal before our in class presentation and
official sponsor demo which is still scheduled for 3/19.

[Demo Meeting Recording](https://emailwsu.sharepoint.com/teams/2021.PULLM.CptS.421.423-F5CTF/Shared%20Documents/F5%20CTF/Meeting%20Notes/Demo%20Recordings/2021-03-15%2015-58-36.mkv)

#### Tests
There are some minor unit tests for our persistence layer for the operator
microservice. These can be found in the `pkg/ctfoperator/model` directory. All
Go test files end with `_test.go`.

#### File Quality
I'm providing a list of files below that I would like to submit for review by
the instructor. They are documented and also provide tests.
```text
pkg/ctfoperator/model/environment.go
pkg/ctfoperator/model/environment_test.go
pkg/ctfoperator/ctfoperator.go
```

### Sprint 2
During our second sprint, we started to implement our first challenges. We started
implementing various attack strategies with the DVWA (Damn Vulnerable Web Application),
as well as basic cryptographic challenges that deal with ciphers. Additionally, we
started to work on out database persistence layer and bootstrap our Frontend API,
which we will continue to refine and integrate with the user interface during
sprint 3 and further down the road.

We continued to work on our user interface, which now has routing capabilities
and is starting to look more refined and ready for actual use for navigation
between challenges. As mentioned, in future sprints we will integrating this with
our frontend API for it to dynamically display challenges from the database instead
of hardcoded values.

#### Demo Meeting
Our second demo meeting recording is provided below. The first portion of the video
is our demo, and the rest is questions or discussions regarding cloud providers, etc.

[Demo Meeting Recording](https://emailwsu.sharepoint.com/teams/2021.PULLM.CptS.421.423-F5CTF/Shared%20Documents/F5%20CTF/Meeting%20Notes/Demo%20Recordings/2021-04-09%2014-08-54.mp4)

#### Tests
We have added unit tests for our challenge set and challenge schema validator,
which takes JSON in and ensures that they conform to the JSON Schema files that
we have written. In addition to the first sprint's tests, you can see the new
ones in the `pkg/challenges/validators` directory. All Go test files end with
`_test.go`.

#### File Quality
I'm providing a list of files below that I would like to submit for review by the
instructor.
```bash
frontend/model/challenges.py
frontend/routes/api/challenges.py
frontend/api.yaml # This is a specification of the challenges API (file above) using OpenAPI.
```
### Sprint 3
During our third sprint, we put all the components of our project together and got them functioning. Our challenge team
made further progress on their challenge sets. We had enough cipher challenges to convert it to a challenge set of its
own and make the remaining challenges a second challenge set which we named web-based as all the challenges there are
targeted towards teaching the user how a directory traversal or similar web-based attack works.

For the UI, we utilized the third-party react-markdown library to render Markdown text as HTML, which we can then insert
into the page and style it accordingly. Additionally, we implemented a special useFetch
call in React that creates isolated environments based on the user token, challenge-set and challenge slugs. Finally,
to ensure that the user was unable to generate an environment without being logged in, we prevented anything from being
accessible until the user is logged in.

For the backend, we created the REST APIs that the UI talks with. Currently, the UI does not fully utilize these APIs
yet, but does use some of them, such as the creation of the user-isolated environments. The user tokens are created and
issued by auth0 to protect sensitive information. We have started working on a branch of the project
to utilize these APIs to dynamically create the challenges, including
the documentation required for each.

#### Team Communication
We chose to use the MS Teams chat functionality more than the message board. Because of this it makes it seem like we do
not communicate very frequently, but in reality this is not the case. The team leader is messaging individual members
via direct message in teams frequently as well as GitHub issues to communicate with team members. Below is a link to the
chat log of our team chat during the sprint 3 period.

[Chat Log](https://emailwsu.sharepoint.com/:x:/r/teams/2021.PULLM.CptS.421.423-F5CTF/Shared%20Documents/F5%20CTF/ChatLogs/sprint3_Teams_Chat_log.csv?d=w8be7b9899e974d668b65b2f93ebd782f&csf=1&web=1&e=tpwg9E)

#### Demo Meeting
Our third demo meeting recording is provided below. We discussed summer milestones with our sponsor after this but
not all team members are able to contribute, so we are unsure how to proceed at this point.

[Demo Meeting Recording](https://emailwsu.sharepoint.com/:v:/r/teams/2021.PULLM.CptS.421.423-F5CTF/Shared%20Documents/F5%20CTF/Meeting%20Notes/Demo%20Recordings/Sponsor_Demo_Sprint_3.mp4?csf=1&web=1&e=bgDNeF)

