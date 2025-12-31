# WebScrape-BeyondChats

# BeyondChats – Web Scraping & AI Article Rewriting Platform

This project is built as part of the **BeyondChats Assignment**.  
It automatically scrapes blog articles from the BeyondChats website, stores them in a database, and rewrites selected articles using AI while preserving the original intent and improving clarity and structure.

The platform also provides a clean frontend dashboard to view **original articles**, **AI-updated articles**, and manage the rewrite process.

---

## 🔧 Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Puppeteer (for web scraping)
- Axios
- Environment variables (`dotenv`)

### Frontend
- React.js
- Axios
- Plain CSS (lightweight & clean UI)

---

## 📁 Project Structure
beyondchats-assignment/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── scraper/
│ ├── automation/
│ ├── db/
│ ├── app.js
│ ├── server.js
│ └── .env (ignored)
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
└── README.md


---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository

git clone https://github.com/Sumit-sangave/BeyondChats_Assignment.git
cd beyondchats-assignment

### Backend Setup
cd backend
npm install

Create a .env file inside the backend folder:
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

Start the backend server:

node server.js

url : https://beyondchats-assignment-ev5q.onrender.com

### Frontend Setup
cd ../frontend
npm install
npm start

url : https://beyond-chats-assignment-nu-rouge.vercel.app/

### Data Flow / Architecture Diagram
