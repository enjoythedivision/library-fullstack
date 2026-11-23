This project is a full-stack library application built with React and ASP.NET Core Web API, which allows users to browse/borrow a collection of books, search for titles/authors, view information, and manage book availability. If a user is authorized as an Admin, they can also add, edit and delete books from the library. The React frontend communicates with a backend API that handles data access and app logic. The app uses roles ASP.NET Core Identity for authentication and authorization.

### Features

- User login
- Admin roles
- Browse available books
- Search books by title or author
- View book details
- Borrow books and return your own loans
- Consume data from a REST API
- Store and manage data through a SQL database

### Technologies

Frontend:
- React
- Vite
- JavaScript
- CSS

### Backend:
- ASP.NET Core Web API & ASP.NET Core Identity
- C#
- Entity Framework Core
- SQLite

### Project structure
Monorepo with separate frontend and backend directories.

Within `frontend/src`:
- `components/books/`: book cards, book grid, and search controls.
- `components/`: the shared header and its styles.
- `pages/books/`: book details and add, edit, and delete pages.
- `pages/auth/`: login, registration, and logout pages.
- `pages/`: the home page.
- `services/`: API requests and the shared API URL.
- `routes/`: route definitions.
- `App.jsx`: shared state and application layout.

Styles remain beside their components and pages. The backend keeps its
existing `Controllers`, `Data`, `Models`, and `Migrations` folders.

### Local development

Install Node.js and the .NET SDK required by `backend/LibraryApi.csproj`, then run these commands from the repository root:

```sh
npm install
npm --prefix frontend install
npm run dev
```

This starts the Vite frontend and the ASP.NET Core backend with automatic reload. The frontend normally runs at http://localhost:5173 and the backend at http://localhost:5038. Press Ctrl+C to stop both processes.

To run either service separately, use `npm run dev:frontend` or `npm run dev:backend`.

### Local test accounts

With the app running, open [Register](http://localhost:5173/register) and create
accounts using these sample credentials:

| Account | Email | Password |
| --- | --- | --- |
| Reader 1 | reader1@example.com | LibraryTest1! |
| Reader 2 | reader2@example.com | LibraryTest2! |

These accounts are not created automatically. Register each account once in your
local database, then use [Login](http://localhost:5173/login) on later visits.
Successful registration stores the user in the `AspNetUsers` table in
`backend/library.db` when running with the development commands above. ASP.NET
Core Identity stores a password hash, rather than the plaintext password.
New registrations are regular users, without the Admin role.

To test behavior between two users, sign in as Reader 1 in a normal browser
window and Reader 2 in a private/incognito window. Each developer's local
database is independent; registering on one machine does not create accounts
on another. These public credentials are intended only for local testing.

#### Local Admin account

The following account has already been created and assigned the `Admin` role
in the current `backend/library.db`:

| Email | Password |
| --- | --- |
| localadmin@example.com | LibraryAdmin2026! |

Open [Login](http://localhost:5173/login) and use these credentials to test
adding, editing, and deleting books. The previous `testadmin@example.com`
account has been deleted.

This account exists in the supplied database; it is not created automatically
at startup. A fresh or replacement database needs its own Admin account and
role assignment. Registering this email alone does not grant Admin privileges.
Use these public credentials only for local testing.
