# CTF
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
To be filled in, once it occurs.

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
