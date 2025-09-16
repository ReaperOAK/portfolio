// Modular workbench project data

const projects = [
  {
    title: "Microsoft Rewards Farmer",
    icon: "🤖",
    tech: ["Python", "Selenium", "Docker"],
    type: "Solo",
    status: "Under Development",
    shortDesc: "An automated script to farm Microsoft Rewards points.",
    description: "A Python-based automation tool that uses Selenium to complete daily Microsoft Rewards activities, including PC and mobile searches, quizzes, and daily sets. It supports multiple accounts, can run in headless mode, and is containerized with Docker for easy deployment and scheduling.",
    decisions: [
      "Utilized Selenium for robust, cross-platform browser automation to accurately mimic human interaction.",
      "Designed for multi-account support, with credentials managed in a `config.yaml` to separate configuration from code.",
      "Implemented a modular architecture, breaking down each reward task (searches, quizzes, daily sets) into distinct functions for maintainability.",
      "Containerized the application with Docker, allowing for consistent, isolated, and easily schedulable execution in any environment.",
      "Established a CI/CD pipeline with GitHub Actions to automate the building and publishing of the Docker image."
    ],
    tags: ["Python", "Automation", "Selenium", "Docker", "Scripting"],
    github: "https://github.com/ReaperOAK/ms-rewards",
    live: "",
    screenshots: [],
    devLogs: [
      "Developed the core browser automation logic using Selenium for handling login and navigation.",
      "Built modules for each specific reward-earning activity.",
      "Implemented multi-account support by reading configurations from an external YAML file.",
      "Created a Dockerfile and docker-compose.yml for easy containerized deployment.",
      "Set up a CI/CD pipeline using GitHub Actions to automate Docker image builds."
    ]
  },
  {
    title: "Faceless AI Content Pipeline",
    icon: "🎭",
    tech: ["Python", "Flask", "SQLAlchemy", "OpenAI API", "Celery"],
    type: "Solo",
    status: "Under development",
    shortDesc: "An automated content pipeline for 'faceless' Instagram accounts.",
    description: "A full-stack Python application that automates content creation and scheduling for Instagram. It uses the OpenAI API to generate both images and captions, and Celery for background task management, all managed through a Flask web dashboard. The system is designed to run 'faceless' theme pages with minimal manual intervention.",
    decisions: [
      "Used Flask for a lightweight and flexible web framework.",
      "Integrated OpenAI's DALL-E and GPT models for automated content creation.",
      "Used SQLAlchemy as an ORM for robust database interactions.",
      "Implemented Celery for reliable background job scheduling and execution of posts.",
      "Designed a simple web dashboard for users to manage their content pipeline."
    ],
    tags: ["Python", "Automation", "AI", "Social Media", "Flask", "OpenAI"],
    github: "https://github.com/ReaperOAK/faceless",
    live: "",
    screenshots: [],
    devLogs: [
      "Set up the Flask application with SQLAlchemy for database modeling.",
      "Developed the content_generator module to interface with the OpenAI API.",
      "Built the instagram_publisher and instagram_scheduler utilities.",
      "Designed the frontend dashboard using HTML templates for managing the system.",
      "Documented the project workflow and milestones."
    ]
  },
  {
    title: "Reddit Content Scheduler",
    icon: "🤖",
    tech: ["Python", "PRAW", "schedule"],
    type: "Solo",
    status: "Completed",
    shortDesc: "Automated Python script for scheduling and posting content to Reddit.",
    description: "A Python script designed for content automation on Reddit. It uses the PRAW library to interface with the Reddit API, reading post schedules from a JSON file and publishing them to specified subreddits at configured times. The tool is built for efficiency and simplifies social media management workflows for Reddit.",
    decisions: [
      "Utilized the PRAW library for a high-level, intuitive interface with the Reddit API.",
      "Decoupled post content and scheduling from the core logic by using a `posts.json` file, allowing for easy updates without code changes.",
      "Integrated the `schedule` library for a simple, human-readable syntax to manage posting times.",
      "Stored all API credentials and settings in a `config.ini` file to keep sensitive information separate from the application logic.",
      "Included a `setup.bat` script to streamline the installation process for Windows users."
    ],
    tags: ["Python", "Automation", "Scripting", "Reddit API", "Social Media"],
    github: "https://github.com/ReaperOAK/reddit-post",
    live: "",
    screenshots: [],
    devLogs: [
      "Configured Reddit API credentials and initialized PRAW for authenticated requests.",
      "Designed the JSON schema for `posts.json` to flexibly handle multiple posts, subreddits, and schedules.",
      "Implemented the core posting functionality using `praw.subreddit.submit`.",
      "Integrated the `schedule` library to run the posting task at intervals defined in the config.",
      "Finalized the project with a `requirements.txt` file and a setup script for ease of use."
    ],
  },
  {
    title: "Festify: Event Management Platform",
    icon: "🎉",
    tech: ["React", "Node.js", "MongoDB", "Socket.IO", "Firebase Auth", "Tailwind CSS"],
    type: "Team",
    status: "Under Development",
    shortDesc: "A real-time, full-stack platform for managing college festivals.",
    description: "A comprehensive event management platform built on the MERN stack with Socket.IO for real-time features. It includes role-based access for organizers and attendees, team and task management, financial tracking, and live announcements, designed to streamline the entire lifecycle of a college festival.",
    decisions: [
      "Architected a full-stack solution using the MERN stack for a unified and efficient development workflow.",
      "Integrated Socket.IO to deliver real-time features such as live announcements, which are critical for event management.",
      "Implemented a robust role-based access control (RBAC) system using JWT to provide tailored dashboards and secure functionality for admins, organizers, and attendees.",
      "Designed a comprehensive MongoDB schema to manage all facets of an event, including schedules, finances, teams, and user feedback.",
      "Established a CI/CD pipeline using GitHub Actions to automate testing and ensure consistent, reliable deployments."
    ],
    tags: ["React", "Full-stack", "Events", "Node.js", "MongoDB", "Real-time"],
    github: "https://github.com/ReaperOAK/festify",
    live: "",
    screenshots: [],
    devLogs: [
      "Completed initial planning, defining the database schema, user roles, and core feature set.",
      "Developed the Node.js and Express backend, creating a full REST API with JWT-based authentication.",
      "Built the real-time communication layer using Socket.IO for live announcements and notifications.",
      "Created the React frontend with Vite, implementing separate, feature-rich dashboards for each user role.",
      "Configured a CI/CD pipeline with GitHub Actions to automate the build and testing processes."
    ],
  },
  {
    title: "Skill Swap Platform",
    icon: "🔄",
    tech: ["React", "Node.js", "MongoDB", "Socket.IO", "Tailwind CSS"],
    type: "Team",
    status: "Completed",
    shortDesc: "A P2P platform for users to trade skills and knowledge directly.",
    description: "A full-stack, real-time skill-swapping marketplace built on the MERN stack. The platform enables users to offer skills they possess and find others to learn from in a direct, peer-to-peer exchange. It includes real-time notifications for swap requests via Socket.IO, a user reputation system with reviews, and a dedicated admin dashboard for platform management.",
    decisions: [
      "Chose the MERN stack (MongoDB, Express, React, Node.js) for a cohesive, full-stack JavaScript development experience.",
      "Integrated Socket.IO to provide real-time notifications for swap requests, creating a dynamic and responsive user experience.",
      "Designed a clear, role-based architecture (User, Admin) with JWT authentication to secure the platform and tailor functionality.",
      "Developed a detailed RESTful API with clear documentation to ensure a clean separation between the frontend and backend.",
      "Implemented a user feedback and rating system to build trust and maintain quality within the community."
    ],
    tags: ["React", "Full-stack", "Marketplace", "Node.js", "Socket.IO", "Community"],
    github: "https://github.com/ReaperOAK/odoo2k25",
    live: "",
    screenshots: [],
    devLogs: [
      "Defined the core project plan and assigned team roles for frontend, backend, and database management.",
      "Built the Node.js/Express backend with MongoDB models for users and swap requests.",
      "Integrated Socket.IO for real-time notifications and JWT for secure authentication.",
      "Developed the React frontend, including user profiles, a browsing interface, and a dashboard for managing swap requests.",
      "Created and deployed the admin dashboard for user and platform oversight."
    ],
  },
  {
    title: "Hashfame Influent Scraper",
    icon: "🕵️‍♂️",
    tech: ["Python", "asyncio", "aiohttp", "pandas"],
    type: "Solo",
    status: "Completed",
    shortDesc: "High-performance asynchronous web scraper for extracting influencer data.",
    description: "A Python-based data scraping tool designed to efficiently extract detailed information about Instagram influencers from the Hashfame platform. It uses an asynchronous architecture with `aiohttp` to handle thousands of requests concurrently, collecting profile data, contact information, and performance metrics. The results are processed and consolidated into a clean CSV file for market research and analysis.",
    decisions: [
      "Engineered an asynchronous architecture using `asyncio` and `aiohttp` for a significant performance boost over traditional synchronous requests.",
      "Reverse-engineered the platform's private API to directly access JSON data, ensuring high data quality and bypassing HTML parsing.",
      "Implemented a multi-stage scraping process (listing, details, contacts) to modularize data collection and improve fault tolerance.",
      "Built in robust error handling, session management, and rate-limiting avoidance mechanisms to ensure reliable long-running scrapes.",
      "Utilized pandas for efficient data processing and consolidation of information from multiple API endpoints into a single CSV output."
    ],
    tags: ["Python", "Web Scraping", "Data Engineering", "Automation", "API"],
    github: "https://github.com/ReaperOAK/hashfame",
    live: "",
    screenshots: [],
    devLogs: [
      "Reverse-engineered the Hashfame private API to map out data endpoints and request headers.",
      "Developed the initial synchronous scraper using `requests` to validate the core logic.",
      "Refactored the entire project to an asynchronous model, achieving a ~10x performance increase.",
      "Added a separate script to merge data from different scraping stages into a unified dataset.",
      "Packaged the script with a `setup.py` for easier distribution and dependency management."
    ],
  },
  {
    title: "CSE Farewell 2025",
    icon: "🎓",
    tech: ["React", "TypeScript", "Firebase", "Framer Motion", "Three.js", "Tailwind CSS"],
    type: "Team",
    status: "Deployed",
    shortDesc: "Interactive digital invitation platform for a university farewell event.",
    description: "A fully interactive and personalized digital invitation platform for a university farewell event. It features a themed, animated frontend with music, an RSVP system, and a complete admin dashboard for managing invitees and sending automated email invitations, all built on a serverless Firebase backend.",
    decisions: [
      "Utilized Firebase for a scalable serverless backend, handling real-time database needs with Firestore and backend logic with Functions.",
      "Chose React with TypeScript to ensure a type-safe, maintainable, and robust frontend codebase.",
      "Integrated Framer Motion and Three.js to deliver a highly immersive and engaging user experience with fluid animations and particle effects.",
      "Developed a secure admin panel for event organizers to manage the invitee list, track RSVPs, and send out bulk personalized emails.",
      "Designed a dynamic invitation system where each guest receives a unique, personalized URL and digital invitation card."
    ],
    tags: ["React", "Firebase", "Events", "Invitation", "Full-stack", "TypeScript"],
    github: "https://github.com/ReaperOAK/csefarewell2k25",
    live: "https://oblivion-3c64c.web.app/",
    screenshots: [],
    devLogs: [
      "Configured Firebase for hosting, Firestore, and serverless functions to manage event data.",
      "Built the animated and interactive frontend using React, TypeScript, and Framer Motion.",
      "Implemented the personalized invitation generation logic and unique URLs for each attendee.",
      "Developed the admin dashboard with features for invitee management and bulk email dispatch.",
      "Established a CI/CD pipeline using GitHub Actions for automated builds and deployment to Firebase."
    ],
  },
  {
    title: "Chess Academy Dashboard",
    icon: "♟️",
    tech: ["React", "PHP", "MySQL", "Tailwind CSS", "Chart.js"],
    type: "Team",
    status: "Deployed",
    shortDesc: "A full-stack ERP for chess academies with role-based dashboards.",
    description: "A comprehensive, full-stack management platform for a chess academy, built with a React frontend and a PHP/MySQL backend. It features distinct, role-based dashboards for administrators, teachers, and students, providing tools for attendance tracking, interactive quiz creation, a PGN library, an online chess-playing platform with Stockfish analysis, and detailed performance analytics.",
    decisions: [
      "Architected a full-stack solution with a traditional LAMP (PHP/MySQL) backend and a modern React frontend for a blend of stability and rich user interactivity.",
      "Implemented a detailed, role-based access control (RBAC) system (Admin, Teacher, Student) to provide tailored functionality and secure data access.",
      "Integrated a complete chess ecosystem, including a PGN parser, an interactive board, and a Stockfish engine API for in-depth game analysis.",
      "Developed a comprehensive quiz and assessment module with various question types, including drag-and-drop for interactive tactical training.",
      "Built a modular and well-documented RESTful API to ensure clear separation of concerns between the frontend and backend."
    ],
    tags: ["React", "PHP", "Full-stack", "E-learning", "Chess", "Dashboard"],
    github: "https://github.com/ReaperOAK/kcadashboard",
    live: "https://dashboard.kolkatachessacademy.in/",
    screenshots: [],
    devLogs: [
      "Designed and implemented a normalized MySQL database schema to manage users, classrooms, quizzes, and chess games.",
      "Built the secure, session-based PHP backend with a modular API structure for all core functionalities.",
      "Developed the React frontend, creating distinct, feature-rich dashboards for each user role.",
      "Integrated the `chess.js` library for frontend validation and the Stockfish engine for backend game analysis.",
      "Deployed the application to a live environment, managing both the React build process and the PHP server configuration."
    ],
  },
  {
    title: "Social OS",
    icon: "🧠",
    tech: ["Markdown", "GitHub", "Knowledge Management"],
    type: "Solo",
    status: "Under Development",
    shortDesc: "A personal operating system for managing relationships and social strategy.",
    description: "A private, Git-based system for managing social relationships and personal growth. It uses a structured set of Markdown files to track interactions, analyze social dynamics, and maintain deep context on key individuals. This serves as a strategic second brain for long-term social and reputational development.",
    decisions: [
      "Chose a Git-based Markdown system over traditional CRM software for ultimate privacy, control, and version history.",
      "Created a structured framework with individual profiles (`/people`), a daily interaction log (`/journal`), and strategic goals (`/intel`).",
      "Developed detailed profiles for key individuals to build deep, actionable context on relationships.",
      "Established a journaling practice to enable active recall and pattern recognition in social dynamics."
    ],
    tags: ["Personal OS", "Knowledge Management", "Social Strategy", "CRM"],
    github: "https://github.com/ReaperOAK/social",
    live: "",
    screenshots: [],
    devLogs: [
      "Established the core file structure for people, journaling, and strategic intel.",
      "Authored the 'master_profile.md' to define personal axioms and social goals.",
      "Began creating detailed profiles for key contacts to track relationship history and dynamics.",
      "Initiated a daily journaling practice to capture and analyze social interactions and outcomes."
    ],
  },
  {
    title: "P2P Rental Marketplace",
    icon: "🤝",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Docker", "Tailwind CSS"],
    type: "Team",
    status: "Completed",
    shortDesc: "A full-stack, Airbnb-like P2P rental marketplace with integrated payments.",
    description: "A comprehensive peer-to-peer rental marketplace built with the MERN stack and containerized with Docker. The platform supports three user roles (user, host, admin), features secure payment processing via Stripe, and includes a complete booking and reservation system. It is designed for scalability and real-world deployment.",
    decisions: [
      "Architected a full-stack solution using the MERN stack (MongoDB, Express, React, Node.js) for a robust and scalable application.",
      "Integrated the Stripe API to handle the entire payment lifecycle, including checkouts, order management, and host payouts.",
      "Containerized the backend service with Docker, ensuring consistent, isolated environments for development and deployment.",
      "Implemented a secure, role-based access control (RBAC) system using JWT to manage permissions for users, hosts, and administrators.",
      "Developed a comprehensive REST API with detailed documentation and a Postman collection for streamlined testing and integration."
    ],
    tags: ["React", "Full-stack", "Marketplace", "Node.js", "Stripe", "Docker"],
    github: "https://github.com/ReaperOAK/odoo-final-2025",
    live: "",
    screenshots: [],
    devLogs: [
      "Containerized the Node.js backend using Docker and orchestrated services with Docker Compose.",
      "Designed and implemented the MongoDB database schema for users, listings, and orders.",
      "Built the RESTful API with Express.js, including secure, role-based endpoints.",
      "Integrated Stripe for payment processing and developed the logic for reservations and payouts.",
      "Developed the React frontend with Vite, creating distinct user flows for booking, hosting, and admin management."
    ],
  },
  {
    title: "Eventure",
    icon: "🎟️",
    tech: ["React", "Vite", "Firebase", "Zustand", "Tailwind CSS"],
    type: "Team",
    status: "Completed",
    shortDesc: "A real-time, gamified event management platform using QR codes.",
    description: "A collaborative web application designed to manage and gamify events like treasure hunts. It features a real-time progress tracking system using QR code check-ins, with dedicated dashboards for administrators to manage the event and for participants to track their journey and view leaderboards. The platform is built on a serverless architecture using Firebase for the backend.",
    decisions: [
      "Utilized Firebase for a serverless backend, enabling real-time data synchronization with Firestore and secure authentication.",
      "Built as a team project, with clearly defined roles for UI/UX, database management, and feature development, fostering collaboration.",
      "Integrated a QR code scanner directly into the web app for a seamless check-in experience without needing a separate app.",
      "Used Zustand for lightweight and efficient global state management, particularly for user authentication and event state.",
      "Designed a responsive and intuitive UI with Tailwind CSS, ensuring a good experience for both admins on desktop and participants on mobile."
    ],
    tags: ["React", "Firebase", "Real-time", "Gamification", "Events"],
    github: "https://github.com/ReaperOAK/eventure",
    live: "",
    screenshots: [],
    devLogs: [
      "Defined project scope and assigned team roles for UI/UX, Firebase, and QR validation.",
      "Set up the Firebase backend, including Firestore rules and authentication.",
      "Developed the core QR code scanning and validation logic for real-time check-ins.",
      "Built separate dashboards for participants and administrators using React and Zustand.",
      "Styled the application with Tailwind CSS and deployed it using Firebase Hosting."
    ],
  },
  {
    title: "Real-Time Player Auction",
    icon: "🧑‍⚖️",
    tech: ["React", "Node.js", "MySQL", "Socket.IO", "Tailwind CSS"],
    type: "Solo",
    status: "Deployed",
    shortDesc: "A real-time, multi-user platform for live player auctions.",
    description: "A full-stack web application that facilitates live player auctions with role-based dashboards for admins, teams, and viewers. Built with a Node.js/Express backend, MySQL database, and a React frontend, it uses Socket.IO to deliver real-time updates for bidding, player assignments, and auction status to all participants.",
    decisions: [
      "Chose a full-stack architecture with a decoupled frontend and backend for scalability and maintainability.",
      "Integrated Socket.IO for real-time, low-latency communication, which is critical for a live auction environment.",
      "Implemented role-based access control (Admin, Team, Viewer) to provide tailored experiences and secure auction management.",
      "Used a MySQL database to ensure data integrity and handle relational data like players, teams, and bids.",
      "Designed separate, intuitive dashboards for each user role to streamline the auction process."
    ],
    tags: ["React", "Full-stack", "Real-time", "Socket.IO", "Auction"],
    github: "https://github.com/ReaperOAK/player-auction",
    live: "https://player-auction-eight.vercel.app",
    screenshots: [],
    devLogs: [
      "Set up the backend with Node.js, Express, and MySQL, defining the core database schema.",
      "Integrated Socket.IO on both client and server to establish the real-time data layer.",
      "Built the React frontend with Vite, creating distinct dashboards for Admin, Team, and Viewer roles.",
      "Developed the authentication flow and protected routes to manage user permissions.",
      "Configured and deployed the frontend to Vercel and the backend to Render, establishing a full CI/CD pipeline."
    ],
  },
  {
    title: "Today Egg Rates",
    icon: "🥚",
    tech: ["React", "PHP", "SQL", "Tailwind CSS", "Chart.js"],
    type: "Solo",
    status: "Deployed",
    shortDesc: "SEO-driven platform for tracking daily egg prices in India.",
    description: "A full-stack web application providing real-time and historical egg prices across India. It features an automated data pipeline using PHP scrapers, an interactive data visualization map, a content-rich blog powered by MDX, and a comprehensive admin dashboard for data management. The project is heavily optimized for SEO to attract organic traffic.",
    decisions: [
      "Developed a full-stack architecture with a React frontend and a robust PHP/SQL backend to handle dynamic data effectively.",
      "Created an automated data pipeline with PHP scrapers and cron jobs to ensure daily price updates, minimizing manual entry.",
      "Focused heavily on SEO, implementing sitemaps, structured data, and an MDX-based blog for content marketing.",
      "Integrated Chart.js and a custom India heatmap for intuitive data visualization of market trends.",
      "Built a secure admin panel for complete control over rates, locations, and promotional content."
    ],
    tags: ["React", "Full-stack", "PHP", "SEO", "Data Visualization"],
    github: "https://github.com/ReaperOAK/todayeggrates",
    live: "https://todayeggrates.com/",
    screenshots: [],
    devLogs: [
      "Set up the LAMP stack backend with PHP and SQL for data storage and API endpoints.",
      "Built the frontend with Create React App, using React Router for client-side navigation.",
      "Developed and deployed web scrapers to automate the daily collection of egg prices from official sources.",
      "Implemented advanced SEO features, including dynamic sitemap generation and MDX blog integration.",
      "Launched the platform and scaled content creation to successfully drive organic user growth."
    ],
  },
  {
    title: "ChessCodex",
    icon: "♟️",
    tech: ["React", "Node.js", "SQL", "Tailwind CSS"],
    type: "Solo",
    status: "Deployed",
    shortDesc: "A multi-tenant online platform for chess academies.",
    description: "A comprehensive e-learning website designed to serve multiple chess academies from a single, unified platform. It features distinct portals for different academies (Aspire Chess Academy, KCA), offering course listings, event management, pro memberships, and educational content. The backend is powered by Node.js with a SQL database to manage all data.",
    decisions: [
      "Built with a multi-tenant architecture to support multiple academies efficiently.",
      "Used React and React Router for a dynamic, single-page application experience.",
      "Developed a Node.js backend with a SQL database for robust data management.",
      "Styled with Tailwind CSS for a modern, responsive, and consistent UI across the platform.",
      "Implemented a CI/CD pipeline with GitHub Actions for automated deployment and testing."
    ],
    tags: ["React", "Full-stack", "Chess", "E-learning", "Multi-tenant"],
    github: "https://github.com/ReaperOAK/chesscodex",
    live: "https://kolkatachessacademy.in/",
    screenshots: [],
    devLogs: [
      "Established the full-stack architecture with Create React App and a Node.js server.",
      "Designed and implemented the multi-academy structure, creating separate page routes and components.",
      "Developed core features like course catalogs, event pages, and membership sections.",
      "Applied a consistent, branded theme using Tailwind CSS and custom components.",
      "Set up automated deployment workflows using GitHub Actions to streamline the release process."
    ],
  },
  {
    title: "Portfolio Website",
    icon: "💻",
    tech: ["React", "Vite", "Tailwind", "Three.js", "Framer Motion", "Zustand"],
    type: "Solo",
    status: "Deployed",
    shortDesc: "An interactive, visitor-adaptive portfolio experience.",
    description: "A personal portfolio designed as a modular workbench, showcasing projects, skills, and personal identity. It features a unique visitor-based theming system that tailors the UI for recruiters, clients, or friends, and incorporates 3D elements with React Three Fiber.",
    decisions: [
      "Chose Vite for its superior speed and modern development experience.",
      "Designed a modular grid UI to create a dynamic and engaging 'workbench' feel.",
      "Implemented a visitor-based theming system using React Context for a personalized user journey.",
      "Utilized React Three Fiber and Framer Motion to add interactive 3D skill visualizations.",
      "Managed global state efficiently with Zustand for theme and visitor context."
    ],
    tags: ["React", "Portfolio", "UI/UX", "3D", "Personal Branding"],
    github: "https://github.com/ReaperOAK/portfolio",
    live: "https://reaperoak.web.app/",
    screenshots: [],
    devLogs: [
      "Established core project structure with Vite, React, and Tailwind CSS.",
      "Developed the visitor context system to enable personalized themes and content.",
      "Built the modular workbench grid with Framer Motion for fluid animations.",
      "Integrated React Three Fiber to create the interactive 3D skill sphere.",
      "Deployed the full-stack application using Firebase Hosting and GitHub Actions for CI/CD."
    ],
  },
  {
    title: "Auction Player Assigner",
    icon: "🏆",
    tech: ["React", "Vite", "Tailwind", "jsPDF"],
    type: "Solo",
    status: "Completed",
    shortDesc: "Dynamic dashboard for managing live player auctions.",
    description: "A local-first auction management tool built with React and Vite. It features real-time player assignment, budget tracking for multiple teams, persistent state using localStorage, and data import/export functionalities (CSV, PDF). Designed for offline use in events like college sports tournaments.",
    decisions: [
      "Used Vite for a fast and modern development environment.",
      "Implemented localStorage for simple, effective state persistence without a backend.",
      "Utilized Tailwind CSS for rapid and responsive UI development.",
      "Integrated jsPDF and jspdf-autotable for robust PDF export of auction results.",
      "Built a CSV import feature to allow for bulk player data management."
    ],
    tags: ["React", "Dashboard", "Tool", "Sports", "Events"],
    github: "https://github.com/ReaperOAK/auction-player-assigner",
    live: "",
    screenshots: [],
    devLogs: [
      "Initialized project with Vite and React for optimal performance.",
      "Developed a custom hook `usePersistentState` to handle localStorage.",
      "Implemented full CRUD functionality for both players and teams.",
      "Added modals for adding/editing players and teams to improve UX.",
      "Built a dynamic PDF generation utility to export detailed auction summaries."
    ],
  },
  {
    title: "Simon Says Game",
    icon: "🎮",
    tech: ["HTML", "CSS", "JavaScript"],
    type: "Solo",
    status: "Completed",
    shortDesc: "A classic memory game built with vanilla JavaScript.",
    description: "A web-based implementation of the classic electronic memory game 'Simon Says.' The game generates a sequence of colors that the player must repeat. Each successful round increases the sequence length, testing the player's memory and focus. This project was built using vanilla HTML, CSS, and JavaScript to demonstrate core DOM manipulation and event handling skills.",
    decisions: [
      "Used vanilla JavaScript for all game logic to focus on fundamental programming concepts like state management, loops, and event listeners without external libraries.",
      "Implemented CSS animations and timeouts to create visual feedback for the color sequences, enhancing the user experience.",
      "Designed a clean, intuitive interface with clear visual cues for game state (start, sequence playing, user turn, game over)."
    ],
    tags: ["JavaScript", "HTML", "CSS", "Game", "Frontend"],
    github: "https://github.com/ReaperOAK/simon-says",
    live: "",
    screenshots: [],
    devLogs: [
      "Structured the game layout with HTML and styled the colored buttons using CSS.",
      "Wrote the core game loop logic, including sequence generation and level progression.",
      "Implemented the `flashButton` function to provide visual feedback for the game's sequence.",
      "Added event listeners to the buttons to capture and validate user input against the generated sequence.",
      "Included logic for game-over conditions and a restart mechanism."
    ],
  },
  {
    title: "CRUD Chat Application",
    icon: "💬",
    tech: ["Node.js", "Express", "MongoDB", "EJS", "Mongoose"],
    type: "Solo",
    status: "Completed",
    shortDesc: "A full-stack CRUD app demonstrating core backend principles with a WhatsApp-style UI.",
    description: "This project is a foundational full-stack web application that implements Create, Read, Update, and Delete (CRUD) functionalities for chat messages. Built with Node.js, Express, and MongoDB, it uses EJS for server-side rendering to create a dynamic user interface resembling a chat application.",
    decisions: [
      "Chose a classic RESTful architecture with Node.js and Express to build a scalable and maintainable backend.",
      "Used MongoDB with Mongoose for flexible data modeling and straightforward database operations.",
      "Implemented server-side rendering with EJS to create dynamic views without the complexity of a client-side framework.",
      "Utilized `method-override` to enable proper PUT and DELETE requests from standard HTML forms, ensuring RESTful compliance."
    ],
    tags: ["Node.js", "Express", "MongoDB", "EJS", "Full-Stack", "Web App", "CRUD"],
    github: "https://github.com/ReaperOAK/whatsapp",
    live: "",
    screenshots: [],
    devLogs: [
      "Set up the Express server and connected to the MongoDB database using Mongoose.",
      "Defined the Mongoose schema for chat messages.",
      "Built the core CRUD routes (index, new, create, edit, update, destroy) for managing chats.",
      "Created EJS templates for displaying, creating, and editing chat messages.",
      "Styled the frontend with basic CSS to mimic the look of a chat interface."
    ],
  },
  {
    title: "Spotify UI Clone",
    icon: "🎵",
    tech: ["HTML", "CSS"],
    type: "Solo",
    status: "Completed",
    shortDesc: "A static, pixel-perfect clone of the Spotify web player's UI.",
    description: "A high-fidelity replica of the Spotify web player's user interface, built entirely with HTML and CSS. This project focuses on mastering advanced CSS layout techniques, including Flexbox and Grid, to recreate a complex, responsive, and aesthetically pleasing design without any JavaScript functionality.",
    decisions: [
      "Built exclusively with HTML and CSS to focus on pure styling and layout replication, proving a strong grasp of foundational web technologies.",
      "Utilized CSS Grid for the main page structure (sidebar, main content, player) to ensure a robust and scalable layout.",
      "Employed CSS Flexbox for component-level layouts, such as navigation items and player controls, for fine-tuned alignment and spacing.",
      "Focused on pixel-perfect details, including custom scrollbars, hover effects, and font consistency, to match the original Spotify design."
    ],
    tags: ["HTML", "CSS", "Frontend", "UI/UX", "Clone"],
    github: "https://github.com/ReaperOAK/spotify-clone",
    live: "",
    screenshots: [],
    devLogs: [
      "Structured the entire layout using semantic HTML, dividing the UI into three main sections: sidebar, main content, and music player.",
      "Styled the sidebar, implementing navigation links and the user's library section.",
      "Developed the main content area, creating reusable card components for albums and playlists.",
      "Built the music player bar, including playback controls, progress bar, and volume sliders.",
      "Ensured the layout is responsive and adapts cleanly to different screen sizes."
    ],
  },
  {
    title: "VanillaJS Weather App",
    icon: "🌤️",
    tech: ["HTML", "CSS", "JavaScript", "API"],
    type: "Solo",
    status: "Completed",
    shortDesc: "A simple weather app using the OpenWeatherMap API and vanilla JavaScript.",
    description: "A lightweight, client-side web application built with vanilla HTML, CSS, and JavaScript that fetches and displays real-time weather data for a user-specified city from the OpenWeatherMap API. It provides current temperature, weather conditions, humidity, and wind speed.",
    decisions: [
      "Built entirely with vanilla JavaScript to create a fast, dependency-free application, focusing on core web technologies.",
      "Directly integrated the OpenWeatherMap API for live weather data, demonstrating fundamental API consumption skills.",
      "Designed a minimalist, clean user interface to ensure the clear and immediate presentation of weather information."
    ],
    tags: ["JavaScript", "API", "Web App", "Frontend", "Tool"],
    github: "https://github.com/ReaperOAK/openweatherapi",
    live: "",
    screenshots: [],
    devLogs: [
      "Set up the basic HTML structure for the search input and weather display card.",
      "Wrote the core JavaScript `fetch` logic to retrieve data from the OpenWeatherMap API.",
      "Implemented functions to parse the JSON response and dynamically update the DOM with weather details.",
      "Added error handling to manage invalid city inputs and API request failures gracefully.",
      "Styled the application with clean, simple CSS for a straightforward user experience."
    ],
  },
  {
    title: "TradingView API Integration",
    icon: "📈",
    tech: ["HTML", "CSS", "JavaScript", "API", "TradingView"],
    type: "Solo",
    status: "Completed",
    shortDesc: "A real-time cryptocurrency charting tool using the TradingView API.",
    description: "A client-side web application that provides real-time cryptocurrency charting by integrating the TradingView lightweight charts library. The application fetches data from the CoinGecko API to display key metrics like market cap, price changes, and volume, and allows users to search for and view charts for various cryptocurrencies.",
    decisions: [
      "Built with vanilla JavaScript to create a lightweight, high-performance, and dependency-free application.",
      "Leveraged the TradingView API for its powerful and interactive charting capabilities, avoiding the need to build a complex charting library from scratch.",
      "Integrated the CoinGecko API for a reliable and comprehensive source of cryptocurrency market data.",
      "Designed a clean, single-page interface focused on delivering essential financial data and a seamless user experience."
    ],
    tags: ["JavaScript", "API", "Web App", "TradingView", "Frontend", "Tool"],
    github: "https://github.com/ReaperOAK/tradingviewapi",
    live: "",
    screenshots: [],
    devLogs: [
      "Set up the basic HTML structure and styled it with CSS for a clean layout.",
      "Wrote the core JavaScript logic to fetch data from the CoinGecko API.",
      "Integrated the TradingView charting library and configured it to display financial data.",
      "Implemented a search functionality to allow users to look up different cryptocurrencies.",
      "Connected the search input to both the CoinGecko API calls and the TradingView widget to dynamically update the displayed data."
    ],
  },
  {
    title: "Simple Responsive Navigation Bar",
    icon: "🧭",
    tech: ["HTML", "CSS"],
    type: "Solo",
    status: "Completed",
    shortDesc: "A clean, responsive navigation bar built with pure HTML and CSS.",
    description: "This project is a fundamental frontend exercise focused on creating a responsive navigation bar using only HTML and CSS. It showcases the use of media queries to adapt the layout for different screen sizes, transitioning from a horizontal bar on desktops to a hamburger menu on mobile devices.",
    decisions: [
      "Built with pure HTML and CSS to demonstrate foundational web development skills without relying on frameworks or libraries.",
      "Used CSS Flexbox for layout to create a flexible and easily maintainable structure.",
      "Implemented CSS media queries to ensure the navigation bar is fully responsive and provides a good user experience on both desktop and mobile screens."
    ],
    tags: ["HTML", "CSS", "Frontend", "Component", "Responsive Design"],
    github: "https://github.com/ReaperOAK/simple-nav-bar",
    live: "",
    screenshots: [],
    devLogs: [
      "Created the basic HTML structure for the navigation links and logo.",
      "Styled the desktop version of the navigation bar using CSS Flexbox.",
      "Added a hamburger menu icon for mobile view, initially hidden on larger screens.",
      "Wrote CSS media queries to handle the layout switch at a specific breakpoint.",
      "Ensured smooth transitions and a clean user interface across devices."
    ],
  },
  {
    title: "Full-Stack Airbnb Clone",
    icon: "🏠",
    tech: ["Node.js", "Express", "MongoDB", "EJS", "Passport.js", "Cloudinary", "Mapbox"],
    type: "Solo",
    status: "Completed",
    shortDesc: "A full-featured clone of Airbnb with listings, reviews, and interactive maps.",
    description: "A complete web application built on the MERN stack (minus React, using EJS instead) that replicates the core functionalities of Airbnb. It features user authentication, CRUD for property listings, image uploads to Cloudinary, user reviews and ratings, and interactive maps via Mapbox.",
    decisions: [
      "Chose a classic MVC architecture with Node.js and Express for a robust and scalable backend.",
      "Used EJS for server-side rendering to create a dynamic, multi-page application without the complexity of a full SPA framework.",
      "Integrated MongoDB with Mongoose for a flexible, schema-based NoSQL database.",
      "Implemented Passport.js for secure user authentication and session management.",
      "Utilized Cloudinary for cloud-based image storage and management, and Mapbox for interactive maps."
    ],
    tags: ["Full-Stack", "Node.js", "Express", "MongoDB", "EJS", "Web App", "Clone"],
    github: "https://github.com/ReaperOAK/airbnb",
    live: "",
    screenshots: [],
    devLogs: [
      "Set up the Express server and connected to MongoDB.",
      "Defined Mongoose schemas for Listings, Reviews, and Users.",
      "Built the core CRUD routes and controllers for listings.",
      "Implemented user authentication using Passport.js.",
      "Integrated Multer and Cloudinary for handling image uploads.",
      "Added the review and rating functionality, linking reviews to listings and users.",
      "Integrated the Mapbox API to display interactive maps on listing pages."
    ],
  },
  {
    title: "React Weather App",
    icon: "🌦️",
    tech: ["React", "Material UI", "API"],
    type: "Solo",
    status: "Completed",
    shortDesc: "A simple and clean weather application built with React and Material UI.",
    description: "A client-side web application that fetches and displays real-time weather data from the OpenWeatherMap API. Users can search for a city to get current weather conditions, including temperature, humidity, and a brief description. The interface is built with React and styled using Material UI for a clean and responsive user experience.",
    decisions: [
      "Chose React for its component-based architecture, which is ideal for creating a modular UI.",
      "Utilized Material UI for pre-built components to accelerate development and ensure a consistent, modern design.",
      "Integrated the OpenWeatherMap API for reliable, real-time weather data.",
      "Managed application state with React hooks (`useState`, `useEffect`) for simplicity and efficiency."
    ],
    tags: ["React", "API", "Web App", "Material UI", "Frontend"],
    github: "https://github.com/ReaperOAK/weatherapp",
    live: "",
    screenshots: [],
    devLogs: [
      "Set up a new React project using the Vite build tool.",
      "Created the main `WeatherApp` component to hold the application state.",
      "Built the `SearchBox` component to handle user input and API calls.",
      "Designed the `InfoBox` component with Material UI cards to display the weather information.",
      "Implemented error handling for invalid city searches."
    ],
  },
  {
    title: "LineaRecta: Point-to-Line Distance Calculator",
    icon: "📏",
    tech: ["HTML", "CSS", "JavaScript", "Canvas API"],
    type: "Solo",
    status: "Deployed",
    shortDesc: "A web tool to calculate and visualize the shortest distance from a point to a line.",
    description: "LineaRecta is a client-side web application that solves a classic geometry problem: finding the shortest distance between a point and a straight line. Built with vanilla HTML, CSS, and JavaScript, it provides an interactive experience where users can input the parameters of a line and the coordinates of a point, and see the result both numerically and visually on an HTML canvas.",
    decisions: [
      "Built with vanilla JavaScript to keep the application lightweight and dependency-free.",
      "Used the HTML Canvas API to provide a visual representation of the geometric problem, enhancing user understanding.",
      "Implemented the core mathematical formula for point-to-line distance directly in the client-side script for immediate feedback.",
      "Designed a simple, single-page interface for ease of use and focused functionality."
    ],
    tags: ["JavaScript", "HTML", "Canvas API", "Mathematics", "Tool", "Web App"],
    github: "https://github.com/ReaperOAK/linearecta",
    live: "https://linearectabooks.com/",
    screenshots: [],
    devLogs: [
      "Developed the HTML structure for input fields and the canvas element.",
      "Wrote the core JavaScript function to calculate the distance using the standard formula.",
      "Implemented the canvas drawing logic to plot the line and point based on user input.",
      "Added event listeners to trigger recalculation and redraw on input change.",
      "Styled the application with simple CSS for a clean, user-friendly layout."
    ],
  },
  {
    title: "PalBro: Palworld Companion",
    icon: "🐾",
    tech: ["Node.js", "Express", "EJS"],
    type: "Solo",
    status: "Completed",
    shortDesc: "A web-based Palworld companion app for tracking and managing Pals.",
    description: "A server-side rendered web application built with Node.js and Express. It serves as a utility for the game Palworld, allowing users to view, track, and manage their collection of Pals. The application uses EJS for templating to dynamically generate pages based on game data.",
    decisions: [
      "Chose Node.js and Express for a lightweight and fast backend, ideal for a simple data-driven application.",
      "Used EJS for server-side rendering to keep the frontend simple and directly tied to the backend logic without a complex client-side framework.",
      "Structured the game data in separate JavaScript files for easy management and updates as the game evolves.",
      "Focused on a clean, functional UI to provide a straightforward user experience for gamers."
    ],
    tags: ["Node.js", "Express", "EJS", "Gaming", "Tool", "Web App"],
    github: "https://github.com/ReaperOAK/palbro",
    live: "",
    screenshots: [],
    devLogs: [
      "Set up the initial Express server and view engine configuration.",
      "Structured the routes to handle different views like the main Pal database and deployed Pals.",
      "Populated the `data.js` and `palNames.js` with initial game data.",
      "Created the EJS templates to render the Pal data dynamically.",
      "Styled the frontend for a simple, usable interface."
    ],
  },
  {
    title: "Real-time Sign Language Translator",
    icon: "🤟",
    tech: ["Python", "Flask", "OpenCV", "TensorFlow", "Keras"],
    type: "Solo",
    status: "Completed",
    shortDesc: "A real-time Indian Sign Language (ISL) translator using computer vision.",
    description: "A prototype application that uses a webcam to capture hand gestures in real-time and translates them into text. The system is built with Python, Flask, and OpenCV, and it leverages a pre-trained TensorFlow/Keras model to recognize and interpret Indian Sign Language (ISL) gestures.",
    decisions: [
      "Used Flask to create a lightweight web server for real-time video streaming.",
      "Leveraged OpenCV for efficient webcam access and real-time image processing.",
      "Integrated a pre-trained TensorFlow/Keras model for sign language gesture recognition.",
      "Designed a simple HTML frontend to display the video feed and classification results without the overhead of a complex JavaScript framework."
    ],
    tags: ["Machine Learning", "Computer Vision", "Python", "Flask", "Real-time", "AI"],
    github: "https://github.com/ReaperOAK/isl_prototype_test",
    live: "",
    screenshots: [],
    devLogs: [
      "Set up the Flask application to handle video streaming.",
      "Integrated OpenCV to capture and process webcam frames.",
      "Loaded the pre-trained Keras model (.h5) for predictions.",
      "Developed the logic to preprocess the ROI and feed it to the model.",
      "Designed the simple HTML interface to display the results."
    ],
  },
  {
    title: "University Python Scripts (Sem 3)",
    icon: "🎓",
    tech: ["Python", "Tkinter", "Algorithms", "Data Structures"],
    type: "Solo",
    status: "Completed",
    shortDesc: "A collection of Python scripts from my 3rd semester university coursework.",
    description: "A comprehensive repository of Python scripts developed during my third semester of B.Tech. This collection covers fundamental computer science concepts including algorithms, data structures, mathematical problem-solving, and basic GUI development with tkinter. It represents a core phase of my foundational programming education.",
    decisions: [
      "Focused on mastering core Python syntax and standard libraries.",
      "Solved a wide range of algorithmic problems to build a strong logical foundation.",
      "Explored basic GUI development using Python's native tkinter library.",
      "Organized each problem into a separate, self-contained script for clarity and modularity."
    ],
    tags: ["Python", "University", "Algorithms", "Data Structures", "Tkinter"],
    github: "https://github.com/ReaperOAK/sem3",
    live: "",
    screenshots: [],
    devLogs: [
      "Completed assignments covering fundamental algorithms like bubble and selection sort.",
      "Wrote scripts for various mathematical problems including Fibonacci series, prime numbers, and GCD.",
      "Practiced file I/O operations by reading from and writing to text files.",
      "Developed simple GUI applications using tkinter for tasks like calculators and graph plotting."
    ],
  },
  {
    title: "Autosolve AI",
    icon: "🤖",
    tech: ["Electron", "React", "Node.js", "Python", "OpenAI API", "Tailwind CSS"],
    type: "Solo",
    status: "Completed",
    shortDesc: "Desktop AI assistant to automate problem-solving workflows.",
    description: "A cross-platform desktop application built with Electron and React that leverages the OpenAI API to automate problem-solving. Users can input a problem, and the application uses a Python backend to execute code, run tests, and provide solutions in a terminal-style interface, streamlining development and debugging workflows.",
    decisions: [
      "Chose Electron to create a cross-platform desktop application with web technologies.",
      "Integrated React for a modern, component-based user interface.",
      "Utilized a Python backend for powerful scripting and interaction with the OpenAI API.",
      "Implemented a terminal-like UI to provide a familiar and efficient experience for developers.",
      "Used Electron's IPC (Inter-Process Communication) to bridge the gap between the Node.js frontend process and the Python backend script."
    ],
    tags: ["Electron", "Desktop App", "AI", "Automation", "Python", "React"],
    github: "https://github.com/ReaperOAK/autosolveai",
    live: "",
    screenshots: [],
    devLogs: [
      "Set up the Electron Forge project with a React and Tailwind CSS template.",
      "Developed the main process logic in `index.js` and the renderer process in `renderer.js`.",
      "Built the Python backend script to handle the core problem-solving logic with the OpenAI API.",
      "Implemented the communication bridge between the Electron frontend and the Python script.",
      "Designed and styled the UI components, including the interactive terminal, using React and Tailwind CSS."
    ],
  },
  {
    title: "Bulk Certificate Generator",
    icon: "📜",
    tech: ["Python", "Pillow", "pandas"],
    type: "Solo",
    status: "Completed",
    shortDesc: "A Python utility to generate personalized certificates from a CSV file.",
    description: "A Python script designed to automate the creation of personalized certificates. It reads participant data from a CSV file, uses a template image, and leverages the Pillow library to programmatically place text, generating individual certificates for each participant. The project also includes an interactive designer tool to help users find the precise coordinates for text placement.",
    decisions: [
      "Chose Python for its powerful scripting capabilities and rich ecosystem of libraries.",
      "Utilized the Pillow (PIL) library for robust and precise image manipulation and text rendering.",
      "Used pandas to efficiently parse and handle participant data from a CSV file.",
      "Decoupled the data (CSV) and design (template image) from the core logic, allowing for easy customization without code changes.",
      "Included an interactive `certificate_designer.py` tool to improve the user experience of placing text elements."
    ],
    tags: ["Python", "Automation", "Scripting", "Tool", "Image Processing"],
    github: "https://github.com/ReaperOAK/bulk-certificate-generator",
    live: "",
    screenshots: [],
    devLogs: [
      "Set up the main script to load the certificate template and participant CSV.",
      "Implemented the core logic for rendering text onto the template using Pillow.",
      "Developed the interactive certificate designer to assist with coordinate selection.",
      "Structured the project to clearly separate the main generator, the designer tool, and the input data.",
      "Finalized the script with a `requirements.txt` for straightforward dependency management."
    ],
  },
];

// Helper: slugify titles for consistent URLs/keys
const slugify = (input = '') =>
  String(input)
    .toLowerCase()
    .trim()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Normalize common tech names to a canonical, human-friendly form
const normalizeTech = (t) => {
  if (!t) return t;
  const raw = String(t).trim();
  const l = raw.toLowerCase();
  if (l.includes('tailwind')) return 'Tailwind';
  if (l.includes('framer')) return 'Framer Motion';
  if (l.includes('react three') || l.includes('react-three') || l.includes('reactthree')) return 'React Three Fiber';
  if (l === 'three.js' || l === 'threejs' || l === 'three') return 'Three.js';
  if (l.includes('socket')) return 'Socket.IO';
  if (l.includes('mysql')) return 'MySQL';
  if (l.includes('postgres')) return 'PostgreSQL';
  if (l.includes('mongo')) return 'MongoDB';
  if (l.includes('node')) return 'Node.js';
  if (l.includes('express')) return 'Express';
  if (l.includes('next')) return 'Next.js';
  if (l.includes('django')) return 'Django';
  if (l.includes('flask')) return 'Flask';
  if (l.includes('vite')) return 'Vite';
  if (l.includes('typescript')) return 'TypeScript';
  if (l.includes('react')) return 'React';
  if (l.includes('python')) return 'Python';
  if (l.includes('php')) return 'PHP';
  if (l.includes('firebase')) return 'Firebase';
  if (l.includes('docker')) return 'Docker';
  // preserve original casing for anything unknown, but trim
  return raw;
};

// Ensure screenshot paths are normalized (prefix with "/" when they look like local assets)
const normalizeScreenshot = (s) => {
  if (!s) return s;
  const str = String(s).trim();
  if (str.startsWith('http') || str.startsWith('/')) return str;
  return str.startsWith('.') ? str.replace(/^\./, '/') : `/${str}`;
};

// Normalize tags (trim and remove duplicates)
const normalizeTags = (arr) => {
  if (!Array.isArray(arr)) return [];
  const out = arr.map(t => String(t).trim());
  return Array.from(new Set(out));
};

// Build a normalized export so components receive a consistent shape
const normalizedProjects = projects.map((p) => {
  const tech = Array.isArray(p.tech) ? p.tech.map(normalizeTech) : [];
  const tags = normalizeTags(p.tags || []);
  const screenshots = Array.isArray(p.screenshots) ? p.screenshots.map(normalizeScreenshot) : [];
  const description = p.description || p.desc || '';
  return {
    ...p,
    title: p.title || '',
    shortDesc: p.shortDesc || p.summary || '',
    description,
    tech,
    tags,
    screenshots,
    devLogs: Array.isArray(p.devLogs) ? p.devLogs : [],
    decisions: Array.isArray(p.decisions) ? p.decisions : [],
    slug: p.slug || slugify(p.title || ''),
  };
});

export default normalizedProjects;

