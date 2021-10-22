# Sprint 5 Report (9/25/2021 - 10/21/2021)
[Sprint Summary Video](https://www.youtube.com/watch?v=KLDDMQUEllQ)

## What's New (User Facing)
* Dynamic content loading
* Additional challenges available
  * Kali Linux
  * Games

**TODO!**

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

## Completed Issues / User Stories
|Issue URL |
|----------|
|[Issue #]() |
|[Issue #]() |
|[Issue #]() |
|[Issue #]() |

## Incomplete Issues / User Stories
|Issue | Blocker|
|------|-----------------------------------------------------------------------|
|[Issue #]() | |
|[Issue #]() | |
|[Issue #]() | |

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
* GitHub use was much better. More consistent commits across the team. Made it easier to see whats being worked on.

### Here's what we'd like to improve
* Continue increasing the frequency with which we commit. 
* Finishing up sprint work a couple days before sprint demo. Avoid working late the night before deadline to finish demo video and final work.

### Here are changes we plan to implement in the next sprint
* Establish deadlines as a team, to avoid rushing.
