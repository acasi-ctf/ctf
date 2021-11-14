# Sprint 6 Report (10/22/2021 - 11/15/2021)
[Sprint 6 Summary Video](#)

## What's New
### Frontend (User Facing)
* Created API to allow for the calling of the most popular challenges.
* Added Java Game images. These images are not meant ot be challenging but to show what can be down with very little
  code. These games are not our design but were created by a group of high school students who have become open source
  contributors on the project.
  * Noughts and Crosses (Tic Tac Toe)
  * Prize Game (Door Game from )
  * Rock Paper Scissors
  * Seven up
* Flag turn in button implemented on UI. Currently, non-functional as backend has not been implemented.
* Creation of XSS challenges.
* Integrated Evon-Tech teams CSS into our web application to help with beautification. This was the sponsors decision
  to hire contractors as the scope of our project expanded by a multiple of 3. 

## Work Summary (Developer Facing)
* Finalize operator refactoring and merged it into main.
  * Add ability to expose terminal and web server through EnvironmentTemplate CRDs.
  * Removed legacy code and the respective tests which were no longer applicable to the new implementation.
  * As those tests were removed, our code coverage dropped by a few percent, implemented a number of other test
    that filled this void, but also raised the coverage by around 9%.
  * As this code modification significantly changed how environments are created, Logan had to rewrite all the JSON and
    YAML that are part of the environment templates to fit the new schemas.
* User interface route changes
  * To combat some bugs with environment creation, he reworked how the user interface handles creating and then logging
    into an environment.
  * When clicking on the sidebar, no longer handles the creation and active "session" of the user's
    environment. But rather, the sidebar takes you to /play/{csSlug}/{cSlug} which will call to the backend and create
    an environment which returns the ID, then the UI will redirect to /env/{csSlug}/{cSlug}/{envId} which logs into the
    environment.
  * This change also allows the user to refresh the page and get back into the same environment. Previously, every time
    the page was refreshed, a new environment was spun up on the backend in our Kubernetes cluster. Both taking time
    away from the user and using more resources.
* Logan and Colby collaborated to implement a new route that would query our database to determine the top 5
    challenges which were started the most, as a suggestion to the user which challenge they may want to try first or
    do next.
* Logan started working on documentation that covers how a developer would create and define new challenge sets and
  children challenges with their provisioning information.

## Unfinished Work
* The user interface does not yet expose a button that allows a user to navigate to a webpage that is created as a part
  of a challenge environment. This is supported on the backend and through the API, however.

## Completed Issues / User Stories
|Issue URL |
|----------|
|[Issue #164](https://github.com/acasi-ctf/ctf/issues/164) |
|[Issue #158](https://github.com/acasi-ctf/ctf/issues/158) |
|[Issue #151](https://github.com/acasi-ctf/ctf/issues/151) |
|[Issue #137](https://github.com/acasi-ctf/ctf/issues/137) |
|[Issue #117](https://github.com/acasi-ctf/ctf/issues/117) |
|[Issue #102](https://github.com/acasi-ctf/ctf/issues/102) |
|[Issue #101](https://github.com/acasi-ctf/ctf/issues/101) |
|[Issue #100](https://github.com/acasi-ctf/ctf/issues/100) |

## Incomplete Issues / User Stories
|Issue | Blocker|
|------|-----------------------------------------------------------------------|
|[Issue #103](https://github.com/acasi-ctf/ctf/issues/103) | Not enough time to complete this task, and was not necessary for this sprint either. |
|[Issue #93](https://github.com/acasi-ctf/ctf/issues/93) | Backend API does not yet exist to accept a flag. |

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
* [ProvisioningService.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/main/kotlin/org/acasictf/ctf/operator/service/ProvisioningService.kt)
* [LookupService.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/main/kotlin/org/acasictf/ctf/operator/service/LookupService.kt)
* [IngressCreatorTest.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/test/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/creator/IngressCreatorTest.kt)
* [ServiceCreatorTest.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/test/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/creator/ServiceCreatorTest.kt)
* [StatefulSetCreatorTest.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/test/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/creator/StatefulSetCreatorTest.kt)
* [LookupServiceTest.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/test/kotlin/org/acasictf/ctf/operator/service/LookupServiceTest.kt)
* [ProvisioningServiceTest.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/test/kotlin/org/acasictf/ctf/operator/service/ProvisioningServiceTest.kt)

## Retrospective Summary
### Here's what went well


### Here's what we'd like to improve


### Here are changes we plan to implement in the next sprint

