# URL Shortener with Express.js and MySQL

This is a simple URL shortener application built using **Express.js**, **MySQL**, and **Docker Compose**. The application allows users to submit a URL, which is then shortened and stored in a MySQL database. When the shortened URL is accessed, the app redirects the user to the original URL.

## Features

- Shorten long URLs into a compact format.
- Store URLs and their shortened versions in a MySQL database.
- Redirect users from the shortened URL to the original URL.
- User-friendly frontend interface to shorten URLs.
- Docker Compose setup for easy configuration of MySQL.

## Technologies Used

- **Express.js**: Backend framework for handling URL shortening and redirect logic.
- **MySQL**: Database for storing URLs and their shortened versions.
- **Docker Compose**: To set up and manage MySQL as a service.
- **HTML/CSS/JavaScript**: Simple frontend form to interact with the backend.

## Project Structure

```plaintext
url-shortener/
├── docker-compose.yml
├── index.js
├── mysql-init/
│   └── init.sql
├── package.json
├── public/
│   └── index.html
├── .gitignore
└── mysql_data/  # Created by Docker for MySQL data persistence
```

### Files and Directories

- **`docker-compose.yml`**: Defines the MySQL service and database initialization using Docker Compose.
- **`index.js`**: The main Express.js application that handles URL shortening and redirection.
- **`mysql-init/`**: Contains the `init.sql` script to initialize the MySQL database and create the `urls` table.
- **`public/`**: Contains the frontend HTML for URL input and interaction.
- **`mysql_data/`**: Directory where Docker stores MySQL database files (ignored in `.gitignore`).

## Prerequisites

Before running this project, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)(optional, can be implemented in new codespace)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (for running the Express app)

## Getting Started

Follow these steps to set up and run the project:

### 1. Clone the repository

```bash
git clone https://github.com/tarunganesh2004/Url-Shortener.git
cd Url-Shortener
```

### 2. Install dependencies

Install the required Node.js dependencies by running:

```bash
npm install
```
### 3. Set up and run MySQL with Docker Compose

Start the MySQL database using Docker Compose. This will create a MySQL container, initialize the database, and create the required `urls` table.

```bash
docker-compose up -d
```

### 4. Start the Express server

Run the Express.js server:

```bash
node index.js
```

This will start the server on [http://localhost:3000](http://localhost:3000).

### 5. Access the Application

Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the URL shortening form.

- Enter a URL and click **"Shorten"**. You will receive a shortened URL.
- Test the shortened URL by pasting it in your browser to be redirected to the original URL.

### MySQL Database Setup

When the MySQL container starts, it runs the script located in `mysql-init/init.sql`, which automatically creates the following table:

```sql
CREATE TABLE IF NOT EXISTS urls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    short_code VARCHAR(10) NOT NULL,
    original_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

