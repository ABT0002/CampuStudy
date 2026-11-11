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

## Project Structure

CampuStudy follows the three-tier client-server architecture established in Sprint 3.

- `frontend/` — React user interface subsystem, using Vite for local development.
- `frontend/src/` — Application components, styling, and frontend entry point.
- `backend/` — Initial structure for the Node.js and Express backend. Implementation is not yet complete.
- `backend/src/subsystems/study-group-management/` — Planned study group management functionality.
- `backend/src/subsystems/data-management/` — Planned data management and SQLite integration.
- `backend/src/middleware/` — Planned authentication and error-handling middleware.
- `backend/src/tests/` — Placeholder for backend tests.
- `docs/` — Sprint 3 subsystem decomposition and Sprint 4 deployment diagrams.
- `user-stories.md` — User stories and acceptance criteria.
- `product-backlog.md` — Prioritized product backlog and MVP planning.

Account management, group search, and membership/invitation functionality are planned for future development.

## Prerequisites

To run the frontend locally, you need:

- Git
- Node.js and npm
- A modern web browser

**Tested Node.js version:** [Add tested version]

**Tested npm version:** [Add tested version]

## How to run frontend
```
# In repo root
cd frontend
npm install
npm run dev
```
## How to install database
```
# In repo root
cd backend
npm install
(+ another step in the future when I get to creating the schema)
```

## How to Verify the Application

After running `npm run dev` inside the `frontend/` folder, the terminal should display a local development URL, typically:

`http://localhost:5173/`

Opening that address in a browser should display:

**Welcome to CampuStudy**

*Find and connect with study groups at Pitt.*

This confirms the frontend skeleton is working locally.

## Current Implementation Status

### Working

- React application initialized using Vite.
- Basic CampuStudy homepage implemented.
- Frontend runs locally in a browser.
- Initial repository structure and architecture diagrams added.

### Not Yet Implemented

- Backend API functionality
- SQLite database integration
- University authentication
- Account management
- Study group creation and editing
- Group searching and filtering
- Invitation and membership management

The remaining features will be developed during future sprints.
