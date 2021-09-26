# Sprint 4 Report (8/26/21 - 9/24/2021)

## What's New (User Facing)
* Page Routing is almost completely dynamic
* More work on challenges
  * Cipher
  * Kali Linux

One very large change that I would like to mention is that the overall scope of our project is changing.
Our sponsor wants to take what we have completed for them and use it as approximately 1/3rd of the new project concept.
Due to this, we suddenly had a large blocker on many issues because we not only had to wait for F5 to hire contractors,
but we also then had to wait for that contracting firm to select people to work with F5 based on the desired roles F5
needs. Additionally, one of the roles is a designer so that F5 can make sure the theme and color pallet of all 3
subdomains of the new project look like they belong together. Due to this chain of delaying events, not as much as able
to be completed on the UI as expected.

We switched from using MS Teams to Discord as a primary means of communication. Our sponsor has stated that they find
communication via discord sufficient communication for the most part and would only like to have meetings at the start
of each sprint unless otherwise directed. This is also where we will be communicating with the contractors outside of
meetings.

Neither the template nor the rubric asked us to include our transcripts anywhere. Since there was no direction on this,
we are prepared to share them if requested, but would rather not for the same reason we are no longer sharing the
retrospective videos.

## Work Summary (Developer Facing)
The backend changes consisted of a pretty large refactoring and rewrite of the relevant components to provisioning in
the Kubernetes Operator. The [respective before and after video](https://www.youtube.com/watch?v=_wIl-tk9EAM) goes into
this in more depth. The work is not complete for the intended goal of these backend changes yet, but it lays down a solid
foundation for going into the next sprint, by allowing us to replace the old implementation.

There has also been work done towards making the UI dynamic using API calls based on challenge sets rather than having
static menu. Additionally, we started styling the site and added a landing page, but had to stop style work because of
new scope of project explained below.4

## Unfinished Work
As stated in the previous section, the work towards getting our Kubernetes Operator to be a more traditional
implementation (while also being much cleaner and easier to maintain), is a multi-sprint goal to achieve.
Next sprint, we will continue working on this and hope to have it completed by then. These subtasks are
being tracked in [issue #100](https://github.com/acasi-ctf/ctf/issues/100).

Due to our sponsor changing the scope of the project, the UI theme and color schema are being blocked. The scope of the
new project requires that our theme and color scheme match that of the overall site that is being branded Cyber Literacy
for All. Our original project is 1/3 of the new scope, but we are waiting on contractors hired by our sponsor to be
selected and to give us a design document to work with.

## Completed Issues / User Stories
|Issue URL | Before/After Video URL|
|----------|-----------------------|
|[Issue #101](https://github.com/acasi-ctf/ctf/issues/101) | [Video](https://www.youtube.com/watch?v=_wIl-tk9EAM)|
|[Issue #121](https://github.com/acasi-ctf/ctf/issues/121) | [Video](https://www.youtube.com/watch?v=FOuDwQRuFCQ)|
|[Issue #107](https://github.com/acasi-ctf/ctf/issues/107) | [Video](https://www.youtube.com/watch?v=Be2aLsa0dB8)|
|[Issue #104](https://github.com/acasi-ctf/ctf/issues/104) | [Video](https://www.youtube.com/watch?v=hg7XCsO3LI4)|



## Incomplete Issues / User Stories
|Issue | Blocker|
|------|-----------------------------------------------------------------------|
|[Issue 105](https://github.com/acasi-ctf/ctf/issues/105) | Waiting on contractors being hired by F5 to continue with agreed upon theme and color pallet.|
|[Issue 106](https://github.com/acasi-ctf/ctf/issues/106) | Have been waiting to talk with contractors, but meeting scheduled for 9:00PM PST on Sunday 9/26.|
|[Issue 110](https://github.com/acasi-ctf/ctf/issues/110) | Ethan unable to get Docker images running on cluster due to lack of experience with Kubernetes, but Logan can assist in next sprint.|

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
* [EnvListener.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/main/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/EnvListener.kt)
* [EnvCreator.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/main/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/creator/EnvCreator.kt)
* [StatefulSetCreator.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/main/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/creator/StatefulSetCreator.kt)

## Retrospective Summary
### Here's what went well:
* Reacted well to scope change due to the flexibility of the team and original project design which allowed us to
  incorporate our original project into th overall design very easily.
* Team members weren't starting from ground zero with the tools that they had to use. Some students picked up new skill
  sets during the summer that were able to help contribute to the project.
* Richard felt he was able to get much more familiar using APIs to create the dynamic UI because of help from Colby and
  Logan.
* The switch to discord for team communication was a massive boon to the team's communication.
* Team finally started using git more actively towards the end of the sprint making it easier to view overall team
  progress and help teammates with their code due to the ability to quickly swap branches and look directly at the code
  in our own personal dev environment.

### Here's what we'd like to improve:
* Some team members took a while to get back on track and had to relearn some stuff before they could get back to work
  on the project.
* Some team members were not addressing GitHub issues reliably. This meant that there is no way to QC any work being
  until the end of the sprint which is not an effective way to do things. Leads to big bang situations like we have now
  where we have a lot of merge conflicts keeping us from putting our combined work together. They can be resolved, but
  it will be more time-consuming than if people were actively using git.
* The overall use of git for the sprint was very bad. This is the most important thing that we did wrong because the use
  of git to track team member progress and to be able to help one another quickly and efficiently. Allows for no
  no overseeing of the project from any standpoint.
  
### Here are changes we plan to implement in the next sprint:
* We essentially decided that the key to solving our problems was a team was to make the use of git and committing
  habitual.
  * From this it would be easy to see how team members are progressing on work in case they need a reminder that
    there is work to be done or to give them a hand if they need assistance.
  * We can try and attempt to regularly avoid merge conflicts by ensuring that we are checking out the most recent
    branch on main when working on our feature branches.
  * Allows for overall better communication of the team. Especially when using GitHub issues to track progress because
    it provides important information to teammates of what is going on. These are especially important when you and a
    team member may be working on the same portion of the project at different times.
  * It allows for easier grading because it is easier to see what work has been done by whom, which in a work
    environment, translates to how well team members are pulling their weight. It's not an infallible tool, but a good
    gauge of effort.
