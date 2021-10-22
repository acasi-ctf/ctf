# Sprint 5 Report (9/25/2021 - 10/21/2021)
[Sprint Summary Video](https://www.youtube.com/watch?v=KLDDMQUEllQ)

## What's New (User Facing)
* Dynamic content loading
* Additional challenges available
  * Kali Linux
  * Games

As far as using facing improvements, this sprint we took our UI had some dynamic elements to it
and made it completely dynamic so that at this point the only static content being loaded do our page
is the homepage and the leaderboard. F5 has recently hired a contractor to assist in
further developing the page, but their role is to simply add the static html content that the
project sponsor would like and to edit the css to make our application and the main website page
match more closely in style.

## Work Summary (Developer Facing)
Work is ongoing with the Kubernetes operator rework. A large amount of work is being done
(and continuing to be done) to rework the JSON that describes an individual challenge,
whether it be metadata or how to provision it in the Kubernetes cluster.

The user interface now properly pulls in challenge sets, challenges, and documentation
from the frontend API which is backed by PostgreSQL. A number of these routes are publicly
available, and some are protected by Auth0 authentication/authorization.

## Unfinished Work
Due to both time commitments in other classes and at work, the Kubernetes rework is taking
long than originally planned out. There are subtasks that need to be taken care of as part
of issue #100. These subtasks are being tracked [here](https://github.com/acasi-ctf/ctf/issues/100).
A lot of the later time that Logan spent in this sprint was to help unblock others as
part of their tasks, particularly with Ethan and Colby with learning how to use Dockerfiles.

A large portion of Colby's time has been thrown into meetings with the F5 sponsors aad Evon Contractors
whom are located out of India. The time zone difference has been fun to deal with and because we now have
a 3rd party involved in the project, it means more management work and task delegation as Renuka and Mudit
(our project sponsors) have been very explicit in the fact that the website is our project and that the
contractors are supposed to be taking direction from us, but they seem to want to deal with Renuka and Mudit
when they can.

## Completed Issues / User Stories
|Issue URL |
|----------|
|[Issue #121](https://github.com/acasi-ctf/ctf/issues/121) |
|[Issue #110](https://github.com/acasi-ctf/ctf/issues/110) |
|[Issue #111](https://github.com/acasi-ctf/ctf/issues/111) |
|[Issue #109](https://github.com/acasi-ctf/ctf/issues/109) |
|[Issue #114](https://github.com/acasi-ctf/ctf/issues/114) |
|[Issue #127](https://github.com/acasi-ctf/ctf/issues/127) |
|[Issue #128](https://github.com/acasi-ctf/ctf/issues/128) |
|[Issue #130](https://github.com/acasi-ctf/ctf/issues/130) |
|[Issue #135](https://github.com/acasi-ctf/ctf/issues/135) |

## Incomplete Issues / User Stories
|Issue | Blocker|
|------|-----------------------------------------------------------------------|
|[Issue #100](https://github.com/acasi-ctf/ctf/issues/100) | Requiring more time to work on this, need to rework a large number of JSON files and continue work to allow for flags, SSH authentication, etc. |
|[Issue #105](https://github.com/acasi-ctf/ctf/issues/105) | Issue now being handled by Evon Tech at the request of Renuka. |
|[Issue #106](https://github.com/acasi-ctf/ctf/issues/106) | Issue now being handled by Evon Tech at the request of Renuka. |

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
* [KubernetesProvisioner.kt](https://github.com/acasi-ctf/ctf/blob/sprint5-refactor-operator/operator/src/main/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/KubernetesProvisioner.kt)
* [KubernetesProvisionerTest.kt](https://github.com/acasi-ctf/ctf/blob/sprint5-refactor-operator/operator/src/test/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/KubernetesProvisionerTest.kt)
* [EnvListenerTest.kt](https://github.com/acasi-ctf/ctf/blob/sprint5-refactor-operator/operator/src/test/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/EnvListenerTest.kt)
* [ProvisioningService.kt](https://github.com/acasi-ctf/ctf/blob/sprint5-refactor-operator/operator/src/main/kotlin/org/acasictf/ctf/operator/service/ProvisioningService.kt)
* [builder.go](https://github.com/acasi-ctf/ctf/blob/sprint5-refactor-operator/pkg/challenges/builder/builder.go)
* [validator_kubernetes_provisioner_test.go](https://github.com/acasi-ctf/ctf/blob/sprint5-refactor-operator/pkg/challenges/validator/validator_kubernetes_provisioner_test.go)

## Retrospective Summary
### Here's what went well
* GitHub use was much better. More consistent commits across the team. Made it easier to see what's being worked on.
* Team members who were stuck asked for help and were able to get assistance from team members.

### Here's what we'd like to improve
* Continue increasing the frequency with which we commit. 
* Finishing up sprint work a couple of days before sprint demo. 
* Avoid working late the night before deadline to finish demo video and final work to increase quality of work.

### Here are changes we plan to implement in the next sprint
* Establish earlier deadlines as a team, to avoid rushing. This looks like having deadlines for video clips due more than the day before the entire video is due to allow the editor more time to compile a higher quality video.
