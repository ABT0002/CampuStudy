# CampuStudy

## Collaborators Involved in the Project
1. Abel Sebhatu
2. Joseph Maslanka
3. Hannah Kuklinski
4. Jon Chernus
5. Tim Burda
6. Muhammad Sayyad

## Purpose
CampuStudy helps students connect with study groups based on subject, schedule, and study preferences.

## Technology Stack

CampuStudy uses a three-tier client-server architecture consisting of a React frontend, a Node.js/Express backend, and a SQLite database.

| Layer | Technology |
|---|---|
| Language | JavaScript |
| Frontend | React |
| Backend | Node.js + Express |
| Database | SQLite |
| Deployment | Local development |
| Authentication | University authentication (planned, not yet implemented) |

### Technology Justifications

- **React:** Provides reusable components for creating study groups, searching for groups, and managing memberships. Supports our usability design goal (NFR1).
- **Node.js + Express:** Separates application logic from the user interface and allows authorization checks to be enforced on the server, supporting our security design goal (NFR4).
- **SQLite:** Provides lightweight relational storage for users, groups, memberships, and invitations without requiring a separate database server during development.
- **Local development:** Allows team members to run and test the system before setting up production hosting.

## Uncertainties
+ University authentication is an uncertainty. We discussed in our group and thought it would be a good idea to introduce. However, we are unsure how feasible it will be to implement.

## Subsystem Decomposition

![Subsystem Decomposition](docs/subsystem-decomp.png)

## Deployment Diagram

![Deployment Diagram](docs/deployment-diagram.png)


## How to run frontend
```
# In repo root
cd frontend
npm install
npm run dev
```
