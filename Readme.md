# 🚛 Fleet Manager - Truck Fleet Management System

A full-stack web application designed to manage truck fleets, drivers, and logistical trips. This system allows administrators to manage resources (trucks, trailers) and schedule trips, while drivers can view their assigned trips and update statuses.

Built with the MERN Stack (MongoDB, Express.js, React, Node.js).

## ✨ Features

### 🛡️ Admin
* **Dashboard**: Overview of fleet status and active trips.
* **Truck Management**: Add, update, and remove trucks from the fleet.
* **Trailer Management**: Manage trailer inventory and assignments.
* **Trip Scheduling**: Create new trips and assign them to specific drivers and trucks.
* **User Management**: Manage system access.

### 👤 Driver / User
* **My Trips**: View assigned trip details.
* **Status Updates**: Update the status of current trips (e.g., In Progress, Completed).

## 🛠️ Tech Stack

**Frontend:**
* **React (Vite)**: Fast frontend build tool.
* **TailwindCSS**: Utility-first CSS framework for styling.
* **Redux Toolkit**: State management (handling auth, trucks, trips data).
* **Lucide React**: Modern icons.
* **Axios**: HTTP client for API requests.

**Backend:**
* **Node.js & Express**: RESTful API server.
* **MongoDB & Mongoose**: NoSQL database for flexible data modeling.
* **JWT (JSON Web Tokens)**: Secure authentication and authorization.
* **Bcrypt**: Password hashing for security.
* **Jest**: Testing framework.

---

## 🚀 Getting Started

To run the Truck Fleet Management System, you must set up both the backend and frontend environments. Start by ensuring MongoDB is running, then navigate to the `backend` directory to install dependencies, configure your `.env` file with the database connection and JWT secret, and launch the server on port 3002. Once the API is active, open a new terminal for the `frontend` folder, install the client dependencies, and set up the `.env` file to point to the backend URL. Finally, run the development server to access the application.

### Prerequisites
* Node.js (v16 or higher)
* MongoDB (installed locally or a cloud URI like MongoDB Atlas)

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Abdelilah-Ajjouqa/Truck-Fleet-Management-System-js
cd truck-fleet-management-system-js

##### 2. Install dependencies & run the project
Backend : 
    - cd backend
    - npm install
    - npm run dev
    -create a .env file when you put the variables needed : 
    **MONGO_URL, JWT_EXPIRES_IN, JWT_SECRET** or see .env.example 

Frontend :
    -cd frontend
    -npm install
    -npm run dev
    -create a .env file when you put the variables needed : 
    **VITE_BACKEND_URL** or see .env.example 