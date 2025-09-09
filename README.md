# 🎂 Cake Shop

A **Cake Shop Management System** built with **Frontend (ReactJS)** and **Backend (Node.js + Express)**.  
The project follows a clean FE/BE separation for scalability and easy maintenance.

## 📁 Project Structure

```
CAKE_SHOP
│
├── Admin/                  # Frontend - ReactJS
│   ├── src/
│   │   ├── assets/         # Images, styles, etc.
│   │   ├── components/     # Reusable UI components
│   │   ├── layout/         # Main layout for the application
│   │   ├── pages/          # Application pages (Login, etc.)
│   │   ├── services/       # API calls and data handling logic
│   │   ├── App.jsx         # Root component
│   │   └── main.jsx        # React entry point
│   │── index.html          # HTML template
│   │
├── BE/                     # Backend - Node.js + Express
│   ├── src/
│   │   ├── Config/         # System configurations (DB, env, etc.)
│   │   ├── Controllers/    # Business logic for each route
│   │   ├── Models/         # Data models (ORM/Database)
│   │   ├── ResponseObj/    # Standardized API response structure
│   │   ├── Routes/         # API route definitions
│   │   ├── Services/       # Core business logic
│   │   ├── Utils/          # Helper and utility functions
│   │   └── index.js        # Backend entry point
│   │
├── FE/                     # Frontend - ReactJS
│   ├── public/
│   ├── src/
│   │   ├── assets/         # CSS / Styling framework
│   │   ├── components/     # Reusable UI components
│   │   ├── layouts/        # Shared layouts
│   │   ├── pages/          # Main pages (Home, Detail, etc.)
│   │   ├── services/       # Frontend API calls
│   │   ├── App.jsx         # Root component
│   │   └── main.jsx        # React entry point
│   └── index.html          # HTML template
```


## 🚀 Features

- Browse and search for cakes.  
- View detailed product information.  
- Add cakes to the shopping cart.  
- Place orders and track order status.  
- Manage personal profile and order history. 


## 🧑‍💻 Tech Stack

- **Frontend**: ReactJS, Axios, React Router, i18next
- **Backend**: Node.js, Express.js, JWT, Sequelize
- **Database**: Postgres
- **Others**: dotenv, CORS, concurrently


## 🧪 Getting Started

### Clone the Repository

```bash
git clone https://github.com/NoisyBoiz/Cake_Shop
```

### Backend Setup
#### 1. Install dependencies
```bash
cd BE
npm install
```

#### 2. Configure Environment Variables
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=cake_shop
JWT_SECRET=your_jwt_secret
```

#### 3. Start the Backend
```bash
npm start
```

### Frontend Setup
#### 1. Install dependencies
```bash
cd FE
npm install
```

#### 2. Configure Environment Variables
```
REACT_APP_API_URL=http://localhost:5000
```

#### 3. Start the Frontend
```bash
npm start
```