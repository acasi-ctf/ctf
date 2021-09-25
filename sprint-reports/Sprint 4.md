# Sprint 4 Report (8/26/21 - 9/24/2021)

## What's New (User Facing)
* New landing page
* Page Routing is almost completely dynamic
* More work on challenges
  * Cipher
  * Kali Linux

## Work Summary (Developer Facing)
> Provide a one paragraph synposis of what your team accomplished this sprint. Don't repeat the "What's New" list of features. Instead, help the instructor understand how you went about the work described there, any barriers you overcame, and any significant learnings for your team.

The backend changes consisted of a pretty large refactoring and rewrite of the relevant components to provisioning in
the Kubernetes Operator. The [before and after video](https://www.youtube.com/watch?v=_wIl-tk9EAM) goes into this in
more depth. The work is not complete for the intended goal of these backend changes yet, but it lays down a solid
foundation for going into the next sprint, by allowing us to replace the old implementation.

There has also been work done towards making the UI dynamic using API calls based on challenge sets rather than having
static menu. Additionally, we started styling the site and added a landing page, but had to stop style work because of
new scope of project explained below.4

## Unfinished Work
> If applicable, explain the work you did not finish in this sprint. For issues/user stories in the current sprint that
> have not been closed, (a) any progress toward completion of the issues has been clearly tracked (by checking the checkboxes
> of acceptance criteria), (b) a comment has been added to the issue to explain why the issue could not be completed
> (e.g., "we ran out of time" or "we did not anticipate it would be so much work"), and (c) the issue is added to a subsequent
> sprint, so that it can be addressed later.

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
|[Issue #101](https://github.com/acasi-ctf/ctf/issues/101) | [Video](https://www.youtube.com/watch?v=_wIl-tk9EAM)
|[Issue #y](https://github.com/your_repo/file_extension)   | [Video](https://youtube.com/file_extension)
|[Issue #z](https://github.com/your_repo/file_extension)   | [Video](https://youtube.com/file_extension)

> Reminders (Remove this section when you save the file):
> * Each issue should be assigned to a milestone
> * Each completed issue should be assigned to a pull request
> * Each completed pull request should include a link to a "Before and After" video
> * All team members who contributed to the issue should be assigned to it on GitHub
> * Each issue should be assigned story points using a label
> * Story points contribution of each team member should be indicated in a comment

## Incomplete Issues / User Stories
* URL of issue 1 <<One sentence explanation of why issue was not completed>>
* URL of issue 2 <<One sentence explanation of why issue was not completed>>
* URL of issue n <<One sentence explanation of why issue was not completed>>

Examples of explanations (Remove this section when you save the file):
* "We ran into a complication we did not anticipate (explain briefly)."
* "We decided that the feature did not add sufficient value for us to work on it in this sprint (explain briefly)."
* "We could not reproduce the bug" (explain briefly).
* "We did not get to this issue because..." (explain briefly)

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
* [EnvListener.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/main/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/EnvListener.kt)
* [EnvCreator.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/main/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/creator/EnvCreator.kt)
* [StatefulSetCreator.kt](https://github.com/acasi-ctf/ctf/blob/main/operator/src/main/kotlin/org/acasictf/ctf/operator/provisioner/kubernetes/creator/StatefulSetCreator.kt)

## Retrospective Summary
Here's what went well:
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

Here's what we'd like to improve:
* Item 1
* Item 2
* Item x
  
Here are changes we plan to implement in the next sprint:
* Item 1
* Item 2
* Item x
