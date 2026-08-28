import "./About.css"

export default function About() {
  return (
      <div className="about-page">
        This project is a simple full-stack library application built with React, SQLite
        and ASP.NET Core. <p>It allows users to browse, search and filter books,
        as well as create an account and log in to interact with the library.
        Book data and user accounts are stored in the SQLite database, while
        ASP.NET Core Identity handles authentication.</p> <p>My goal with this app is to explore
        core full-stack concepts like component-based architecture, state
        management, REST APIs, database integration, authentication/authorization, and
        communication between a React frontend and a .NET backend.</p> <p>I implemented a
        minimal dark interface with vanilla CSS, where each stylesheet lives
        next to its component. A great alternative option would be SCSS but due
        to the small size of the project I found it redundant.</p> <p>The project is
        still a work in progress as I continue learning and revisiting to better my
        development practices.</p> <p>Thanks for stopping by! :)</p>
      </div>
  );
}
