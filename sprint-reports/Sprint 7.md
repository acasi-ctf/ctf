# Sprint 7 Report (11/16/2021 - 12/12/2021)
**TODO: add link**
[Sprint 7 Summary Video](https://youtube.com)

## What's New
### Work Summary
#### User Facing
* Applicable challenges now have flag submission that is tracked on the backend
* Fix bug with the terminal buffer not being correctly sized
  * There was a bug with the terminal that certain applications would output
    the incorrect sizing, like vim or nano. This has been fixed in this sprint.
* Create upload challenge page for administrators
  * For administrators, the user interface will show a button that will go to a
    page that has an upload form to create or update existing challenge sets.
    This was manually done via the command line prior to now.
* Clean up of existing challenge sets experience and documentation
  * Much of the documentation was hard to read or not specific enough on how
    to play the challenge.
  * Challenges documentation has been updated to show how to start each one via command line input.
  * Some challenge sets that used code given to us by our sponsor were
    not working, this was resolved.
* Leaderboard page
  * Shows a table that compares the top players on the platform and their
    scores.
* Improve site summary
  * Our homepage had lorem ipsum text up until now, but has been changed to
    add a description of what the CTF platform is.
* Challenge selection now displays a list of cards for each challenge set. Clicking on one of these cards will take you
  to a list of cards, each one representing a challenge in the set. Clicking one of these will take you to the 
  challenge.
* Home Page now displays cards for most popular, trending and games to take you directly to challenges that people find
  more engaging.

#### Developer Facing
* Challenge schema now includes fields for enabling specific challenge features
  * Only current feature is a static challenge flag, future work could include
    the ability to generate a flag and pass it back into the environment at
    runtime to prevent cheating.
* Flag submission API and tracking
  * Flag submission is performed through a specific API endpoint, which will
    insert records into the database for leaderboard and other metric purposes.
* Leaderboard API
  * Utilizes records of completed challenges and returns a sorted list of users
    in descending order by the number of challenges they have completed.
* Kubernetes environment purging
  * Prior to this, any challenge environments that were started needed to be
    manually pruned by a member on our team. Now, all environments only live
    for an hour after start-up time.
* Trending challenge API
  * As an extension to last sprint's work, we implemented an alternative API
    route for a future page to show the trending challenges, which is a list
    of the challenges that have been started the most over the past two weeks.

## Unfinished Work
The unfinished work for our project is in no way part of the MVP. These are merely suggestions for future groups if
any were to take up this project.
* Create more challenges.
* Show user which challenges have been completed in the UI.
* Content for the rest of the cyber literacy site.
* Create administrative dashboard to display all sorts of metrics coming in from the platform.
  * View number of users.
  * Stop or start a session manually.
  * Check for abusive use of the system resources.
* Add the ability to save a session as a snapshot that can be loaded back up into an environment.
* Add a forum section to the CTF so that users can get help from other users.

## Completed Issues / User Stories
**TODO: added most, but any newly closed issues need to be added**
|Issue URL |
|----------|
|[Issue #55](https://github.com/acasi-ctf/ctf/issues/55) |
|[Issue #180](https://github.com/acasi-ctf/ctf/issues/180) |
|[Issue #5](https://github.com/acasi-ctf/ctf/issues/5) |
|[Issue #199](https://github.com/acasi-ctf/ctf/issues/199) |
|[Issue #181](https://github.com/acasi-ctf/ctf/issues/181) |
|[Issue #103](https://github.com/acasi-ctf/ctf/issues/103) |
|[Issue #186](https://github.com/acasi-ctf/ctf/issues/186) |
|[Issue #191](https://github.com/acasi-ctf/ctf/issues/191) |
|[Issue #193](https://github.com/acasi-ctf/ctf/issues/193) |
|[Issue #204](https://github.com/acasi-ctf/ctf/issues/204) |
|[Issue #206](https://github.com/acasi-ctf/ctf/issues/206) |
|[Issue #183](https://github.com/acasi-ctf/ctf/issues/183) |
|[Issue #126](https://github.com/acasi-ctf/ctf/issues/126) |
|[Issue #89](https://github.com/acasi-ctf/ctf/issues/89) |
|[Issue #200](https://github.com/acasi-ctf/ctf/issues/200) |
|[Issue #194](https://github.com/acasi-ctf/ctf/issues/194) |
|[Issue #198](https://github.com/acasi-ctf/ctf/issues/198) |
|[Issue #197](https://github.com/acasi-ctf/ctf/issues/197) |
|[Issue #195](https://github.com/acasi-ctf/ctf/issues/195) |
|[Issue #142](https://github.com/acasi-ctf/ctf/issues/142) |
|[Issue #10](https://github.com/acasi-ctf/ctf/issues/10) |
|[Issue #122](https://github.com/acasi-ctf/ctf/issues/122) |
|[Issue #189](https://github.com/acasi-ctf/ctf/issues/189) |
|[Issue #179](https://github.com/acasi-ctf/ctf/issues/179) |
|[Issue #184](https://github.com/acasi-ctf/ctf/issues/184) |
|[Issue #185](https://github.com/acasi-ctf/ctf/issues/185) |
|[Issue #93](https://github.com/acasi-ctf/ctf/issues/93) |
|[Issue #173](https://github.com/acasi-ctf/ctf/issues/173) |
|[Issue #174](https://github.com/acasi-ctf/ctf/issues/174) |
|[Issue #175](https://github.com/acasi-ctf/ctf/issues/175) |

## Incomplete Issues / User Stories
|Issue | Blocker|
|------|-----------------------------------------------------------------------|
|[Issue #44](https://github.com/acasi-ctf/ctf/issues/44) | We do not have time to implement the challenge being marked as completed in the UI. |

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
* [KubernetesPurger.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/main/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/KubernetesPurger.kt)
* [KubernetesPurgerTest.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/test/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/KubernetesPurgerTest.kt)
* [api/challenges.py](https://github.com/acasi-ctf/ctf/blob/main/frontend/routes/api/challenges.py)
* [models/challenges.py](https://github.com/acasi-ctf/ctf/blob/main/frontend/model/challenges.py)

## Retrospective Summary
### Here's what went well
**TODO**
* Git usage was better.
* People working together and planning really well for the most part.
* Much better use of GitHub Issues and linking issues in GitHub.
* Less time crunch overall.

### Here's what we could improve
**TODO**
* Splitting GitHub issues into smaller pieces.
* Hard to know what team members' goals are.

### Here are changes we would plan to implement in a future sprint
**TODO**
* Implement a pre-sprint meeting to figure out as a group what everyone will be working on.
* Create GitHub issues as soon as possible in a sprint.
* Create atomic issues in GitHub issues to build up larger issues.
* Users working on issues should create sub-issues if necessary.
