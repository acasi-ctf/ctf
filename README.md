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
personal Kubernetes clusters.

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
official sponsor demo.
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
