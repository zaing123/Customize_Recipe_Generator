# 🍽️ Customize Recipe Maker

Customize Recipe Maker is a full-stack web application that allows users to create personalized recipes by selecting ingredients of their choice. The backend is built using ASP.NET Core MVC with MySQL for data management, while the frontend is developed using React.js. The system integrates a third-party recipe API to dynamically generate recipes based on selected ingredients.

---

## 🚀 Features

### User Features
- Select ingredients to generate custom recipes
- Dynamic recipe generation using external API
- View recipe details
- Rate and review recipes
- User authentication (Login / Logout)

### Admin Features
- Manage recipes (Add, Edit, Delete)
- Manage users
- Manage ratings and reviews
- Admin dashboard for system control

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- JavaScript (ES6+)
- CSS / Bootstrap

**Backend**
- ASP.NET Core MVC
- RESTful APIs

**Database**
- MySQL

**External API**
- Recipe Generation API

---

## 🏗️ Project Architecture

- React frontend handles UI and ingredient selection
- ASP.NET Core MVC manages business logic and API endpoints
- MySQL stores application data including users, recipes, ratings, and reviews

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- .NET SDK
- MySQL Server

---

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/customize-recipe-maker.git
   ```
2. Open the backend project in Visual Studio
3. Configure MySQL connection string in `appsettings.json`
4. Run database migrations
5. Start the backend server

---

### Frontend Setup

1. Navigate to the frontend folder
   ```bash
   cd frontend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the React app
   ```bash
   npm start
   ```

---

## 🔐 Authentication

- Users must log in to access recipe customization
- Admin users have additional management privileges

---

## 📂 Database Entities

- Users
- Recipes
- Ingredients
- Ratings
- Reviews

---

## 🎯 Future Enhancements

- Favorite recipes feature
- Advanced search and filters
- Nutrition information
- AI-based recommendations

---

## 👨‍💻 Author

**Muhammad Zain Farooq**  
Software Engineering Student  

---

## 📄 License

This project is for educational purposes only.
