This project is a full-stack library application built with React and ASP.NET Core Web API, which allows users to browse/borrow a collection of books, search for titles/authors, view information, and manage book availability. If a user is authorized as an Admin, they can also add, edit and delete books from the library. The React frontend communicates with a backend API that handles data access and app logic. The app uses roles ASP.NET Core Identity for authentication and authorization.

### Features

- User login
- Admin roles
- Browse available books
- Search books by title or author
- View book details
- Toggle book availability
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
- SQL Server

### Project structure
Monorepo structure with separate directories for the frontend and the backend

### Local development

Install Node.js and the .NET SDK required by `backend/LibraryApi.csproj`, then run these commands from the repository root:

```sh
npm install
npm --prefix frontend install
npm run dev
```

This starts the Vite frontend and the ASP.NET Core backend with automatic reload. The frontend normally runs at http://localhost:5173 and the backend at http://localhost:5038. Press Ctrl+C to stop both processes.

To run either service separately, use `npm run dev:frontend` or `npm run dev:backend`.
