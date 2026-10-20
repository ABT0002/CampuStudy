# Sprint 2 — Prioritized Product Backlog (draft for team review)

Project: Campus Study Group Matcher

**Proposed MVP:** Account access; group creation; searching and viewing groups; invitations initiated by admins or requested by students; accepting invitations; and viewing joined groups. These are all tied to requirements marked in scope this semester in Sprint 1. The exact joining flow must be clarified before implementation (see below).

| Rank | Story | Short title | FR | Priority | MVP |
|---:|---|---|---|---|---|
| 1 | US2 | Sign in to an account | FR2 | Must | Yes |
| 2 | US1 | Create an account | FR1 | Must | Yes |
| 3 | US3 | Create a study group | FR3 | Must | Yes |
| 4 | US9 | Search for compatible groups | FR9 | Must | Yes |
| 5 | US10 | View study group details | FR10 | Must | Yes |
| 6 | US11 | Request an invitation | FR11 | Must | Yes |
| 7 | US7 | Accept a group invitation | FR7 | Must | Yes |
| 8 | US12 | View joined groups | FR12 | Must | Yes |
| 9 | US5 | Invite an existing user | FR5 | Must | Yes |
| 10 | US4 | Edit a study group | FR4 | Must | No |
| 11 | US8 | Leave a study group | FR8 | Must | No |
| 12 | US6 | Remove a group member | FR6 | Must | No |
| 13 | US13 | Recommend a study group | FR13 | Could | No |

All FR1–FR13 are covered by a user story. A lower MVP position does not change the existing requirement's Must priority or its semester scope.

## Customer check — to complete after actual outreach

Customer contact/date: [Team member to fill in]
Reaction to proposed MVP: [Summarize what the customer actually said]
Changes made because of feedback: [Describe actual changes, or say none]

## Clarifications to resolve with the team

1. **Joining workflow:** Sprint 1 FR7 says the *student accepts an invitation*, but UC1 describes the *administrator accepting a student's request* and automatically adding them. Decide whether admin approval creates an invitation that the student must accept, or whether admin approval immediately joins the student. Update the requirements and stories as needed without renumbering existing FRs.
2. **Authentication:** C2 requires the university authentication service, while FR1 describes creating a user account and FR2 using valid credentials. Clarify whether FR1 means creation of an application profile after institutional login rather than creation of a separate password.
3. **MVP dependencies:** US11 requires an administrator to handle the request. The current acceptance criteria only say the admin can view the request; implementable approval/denial criteria need to be explicitly agreed and reflected in an FR or a documented clarification of FR11/FR7.
4. **FR3 validation:** NFR5 explicitly checks missing subject and invalid size; Sprint 1 Scenario 2 additionally requires location. The story tests both; confirm that location is a mandatory field.
5. **Semester scope versus MVP:** FR4, FR6, and FR8 are still marked Must and in-scope this semester in Sprint 1; they are not MVP, but they should remain in the semester backlog.

## Nonfunctional and constraints verification

NFR1–NFR8 and C1–C2 remain applicable across stories. Include tests or implementation tasks for group-creation usability (NFR1), search latency (NFR2), keyboard access (NFR3), admin authorization (NFR4), input validation (NFR5), browser compatibility (NFR6), account-creation usability (NFR7), navigation (NFR8), data privacy (C1), and university authentication (C2).
