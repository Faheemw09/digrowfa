# Form Management App

This is a simple form management application with a backend built using Node.js and MongoDB, and a frontend built with React.

## Overview

The application allows users to create forms with a name, description, and a set of frequently asked questions (FAQ). Each FAQ can have a question and multiple answers.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MongoDB

## Clone Repository

Use the following command to clone the repository:

```bash
git clone https://github.com/Faheemw09/digrowfa.git


# Backend Installation and Setup
Navigate to the backend directory:


cd digrowfa/backend
Install dependencies:


npm install
#Start the backend server:


npm start
The backend server will be accessible at http://localhost:8080.

# Frontend Installation and Setup
Navigate to the frontend directory:


cd digrowfa/frontend
Install dependencies:


npm install
Start the frontend development server:


npm start
The frontend development server will be accessible at http://localhost:3000.

Usage
Open your browser and go to http://localhost:3000 to access the frontend.
Create forms by filling out the provided fields and submitting the form.
View the list of forms with their details and FAQs.
The backend API endpoints are documented in the Endpoints section below.
Endpoints
POST http://localhost:8080/form/create: Create a new form.
GET http://localhost:8080/form/: Get a list of all forms.

