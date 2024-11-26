# Food-Order API

This is a **Food Ordering API** built with **Express.js**, **EJS**, **MongoDB**, and **Tailwind CSS**. It provides features for managing food items, user authentication, and cart functionality. The project is designed for learning purposes and showcases the integration of backend technologies with a responsive frontend.

---

## Features

- **Authentication**:
  - Login and session management with **express-session** and **bcryptjs** for secure user handling.
- **Food Management**:
  - Add, edit, and delete food items in the menu.
- **Cart Functionality**:
  - Users can add and manage items in their carts.
- **Responsive UI**:
  - Styled with **Tailwind CSS** for a clean and user-friendly interface.
- **Database Integration**:
  - Food items and user data are stored in **MongoDB**.
- **Logging**:
  - Logs HTTP requests using **morgan** for development insights.

---

## Tech Stack

- **Backend**: Node.js, Express.js, Mongoose
- **Frontend**: EJS, Tailwind CSS
- **Database**: MongoDB
- **Utilities**: dotenv, concurrently, nodemon, bcryptjs, express-session

---

## Project Structure

- **configs/**         - Configuration files for the project (e.g., database connection)
- **controllers/**     - Handles the API logic for authentication, food, and cart
- **middlewares/**     - Custom middleware for handling requests and errors
- **models/**          - Database schemas (e.g., User, Food, Cart)
- **public/**          - Static files and Tailwind CSS output
- **routers/**         - Defines API routes for different features
- **views/**           - EJS templates for rendering the UI
- **.env**             - Environment configuration
- **app.js**           - Main application entry point
- **seed.js**          - Script to seed initial data into the database
- **tailwind.config.js** - Tailwind CSS configuration

---

## Installation and Setup

Follow these steps to set up the project locally:

### Prerequisites

1. **Node.js** (v14 or later)
2. **MongoDB** (Ensure you have a running MongoDB instance)
3. **npm** (Node package manager)

---

### Steps to Run the Project

1. **Clone the Repository**

   ```bash
   git clone https://github.com/YourUsername/food-order-api.git
   cd food-order-api
2. **Install Dependencies**

Run the following command to install the required packages:
  
  
```bash
  npm install
```


3. **Setup Environment Variables**

Create a .env file in the root directory and configure the following variables:

```env
DB_URI=mongodb+srv://tuyentieple:nOHhauk0jQEiNVxe@database.chqmf.mongodb.net/food-order
```
4. **Start the Application**

Use the following command to start the development server:

```bash
npm run dev
```

5. **Access the Application**
- Open your browser and visit [http://localhost:5000](http://localhost:5000) to view the homepage.
- Access [http://localhost:5000/foods/manage](http://localhost:5000/foods/manage) to manage the list of foods in the food collection.


## Author

**Tuyen Tiep Le**

Feel free to connect or raise issues for any questions!

