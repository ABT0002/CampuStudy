# E1: Account access
Students and instructors can access the Campus Study Group Matcher with an authorized account.

## US1: Create an account
As a student or instructor, I want to create an account so that I can use the study group system.
FR: FR1
Priority: Must
MVP: yes

- [ ] A first-time student or instructor can begin account creation.
- [ ] Required account fields are clearly identified.
- [ ] An incomplete or invalid submission gives an explanation and does not create an account.
- [ ] A successfully created account can subsequently be used to access the system, subject to the university authentication constraint (C2).

## US2: Sign in to an account
As a user, I want to authenticate so that only I can access my account and its study groups.
FR: FR2
Priority: Must
MVP: yes

- [ ] A user with valid authorized credentials can sign in.
- [ ] An unsuccessful authentication attempt does not grant access.
- [ ] A user who is not signed in cannot use functions restricted to authenticated users.
- [ ] Authentication follows the institutional authentication constraint (C2).

# E2: Create and manage study groups
Group administrators can organize study groups and manage their memberships.

## US3: Create a study group
As a student, I want to create a study group so that other students can study with me.
FR: FR3
Priority: Must
MVP: yes

- [ ] A signed-in user can enter subject, meeting time, location, maximum group size, expertise level, and study preference.
- [ ] Submitting complete valid group details creates a group and assigns its creator as administrator.
- [ ] A missing subject or a size that is not an integer greater than one prevents group creation and displays a helpful error.
- [ ] A missing required location prevents group creation and explains the missing field, as illustrated in Sprint 1 Scenario 2.

## US4: Edit a study group
As a group administrator, I want to change group details so that members see the latest meeting information.
FR: FR4
Priority: Must
MVP: no

- [ ] A group administrator can update that group's meeting information and save the changes.
- [ ] Members viewing group details see the saved updated information.
- [ ] A user who is not that group's administrator cannot change its details.

## US5: Invite an existing user
As a group administrator, I want to invite an existing user so that they can join my study group.
FR: FR5
Priority: Must
MVP: yes

- [ ] A group administrator can select an existing user and send them an invitation to that group.
- [ ] The selected user can see the invitation awaiting their decision.
- [ ] A non-administrator cannot send invitations on behalf of the group.

## US6: Remove a group member
As a group administrator, I want to remove a member so that I can manage participation in my study group.
FR: FR6
Priority: Must
MVP: no

- [ ] An administrator can select a current member of their group and remove them.
- [ ] The removed user is no longer shown in the group's membership list.
- [ ] The removed group no longer appears in the removed user's joined-groups list.
- [ ] Users who are not the group administrator cannot remove members.

## US7: Accept a group invitation
As a student, I want to accept an invitation so that I can become a member of that study group.
FR: FR7
Priority: Must
MVP: yes

- [ ] A student can view an invitation they have received.
- [ ] Accepting a valid invitation adds the student as a member of the group.
- [ ] The joined group appears on the student's joined-groups list.
- [ ] A student without an invitation is not enrolled through this invitation-acceptance action.

## US8: Leave a study group
As a group member, I want to leave a study group so that it no longer appears among my joined groups.
FR: FR8
Priority: Must
MVP: no

- [ ] A group member can leave a group that they belong to.
- [ ] After leaving, the user no longer appears in that group's membership list.
- [ ] After leaving, the group no longer appears in that user's joined-groups list.

# E3: Discover and join groups
Students can find compatible study groups, inspect their details, and request membership.

## US9: Search for compatible groups
As a student, I want to filter study groups by my preferences so that I can find a good match.
FR: FR9
Priority: Must
MVP: yes

- [ ] A student can search using subject, meeting time, location, group size, expertise level, and study preference filters.
- [ ] The results list contains groups matching the selected criteria.
- [ ] When no groups match, the system clearly indicates that no matches were found.
- [ ] The student can change the filters and search again.

## US10: View study group details
As a student, I want to inspect a group's details so that I can decide whether to join it.
FR: FR10
Priority: Must
MVP: yes

- [ ] A student can open a group from the search results.
- [ ] The details show subject, meeting time, location, maximum size, expertise level, and study preferences.
- [ ] A student who is not a group member can find the option to request an invitation.

## US11: Request an invitation
As a student, I want to request an invitation to a group so that the administrator can consider my request.
FR: FR11
Priority: Must
MVP: yes

- [ ] A student viewing a group they have not joined can submit an invitation request.
- [ ] The request is delivered to that group's administrator for review.
- [ ] The administrator can see which student requested to join and which group the request concerns.
- [ ] The requesting student is not automatically added solely because a request was submitted.

## US12: View joined groups
As a group member, I want to view all my joined groups so that I can check where and when to study.
FR: FR12
Priority: Must
MVP: yes

- [ ] A signed-in user can open a list of groups they currently belong to.
- [ ] The list includes groups the user has successfully joined.
- [ ] A group the user has left or been removed from no longer appears.
- [ ] The user can open a listed group to read its meeting details.

# E4: Instructor recommendations (future scope)
Instructors can highlight relevant groups for a course after the initial semester release.

## US13: Recommend a study group
As an instructor, I want to recommend an existing group for a course so that students can recognize a suggested option.
FR: FR13
Priority: Could
MVP: no

- [ ] An instructor can select an existing group and associate a recommendation with a specific course.
- [ ] The recommendation is visible in that group's details.
- [ ] Users who are not instructors cannot create instructor recommendations.

