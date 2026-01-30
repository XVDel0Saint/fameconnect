# FameConnect Registration Platform

FameConnect is a multi-step registration web application built with **Vue 3 + Pinia** on the frontend and **Laravel 10** on the backend. The application allows users to register their account and company information, upload company brochures, and review their information before submission.  

The backend exposes RESTful APIs for registration and fetching countries dynamically.

---

## Table of Contents

- [Features](#features)  
- [Project Structure](#project-structure)  
- [Setup & Installation](#setup--installation)  
  - [Backend (Laravel)](#backend-laravel)  
  - [Frontend (Vue 3 + Vite)](#frontend-vue-3--vite)  
- [Environment Variables](#environment-variables)  
- [Running the Project](#running-the-project)  
- [Usage](#usage)  
- [Notes](#notes)  

---

## Features

- Multi-step registration form (Step 1: Account, Step 2: Company, Step 3: Review & Submit)  
- File upload support for company brochures (PDF, Word)  
- Dynamic country dropdown from backend API (`/api/countries`)  
- Frontend validation with proper error messages  
- Stores form data in **Pinia store**  
- Review page preserves user input and warns if page is reloaded  
- Laravel backend handles registration with proper API structure  

---

## Project Structure
```
backend/ # Laravel backend
├─ app/
│ └─ Http/Controllers/Api/RegistrationController.php
├─ routes/
│ └─ api.php
frontend/ # Vue 3 + Pinia frontend
├─ src/
│ ├─ stores/registrationStore.ts
│ ├─ views/RegisterStep1.vue
│ ├─ views/RegisterStep2.vue
│ └─ views/RegisterStep3.vue
```
---

## Setup & Installation

### Backend (Laravel)

1. **Install dependencies**:

```
bash
cd backend
composer install
```

Create .env file (copy from .env.example) and set database and app details:
```
bash
Copy code
cp .env.example .env
php artisan key:generate
```
Run migrations:
```
bash
Copy code
php artisan migrate
```
Start the backend server:
```
bash
Copy code
php artisan serve
```
Default URL: http://127.0.0.1:8000

### Frontend (Vue 3 + Vite)

##Install dependencies:

```
bash
Copy code
cd frontend
npm install
```
Create .env file with your API URL:
```
env
Copy code
VITE_API_URL=http://127.0.0.1:8000
```
Run the frontend:
```
bash
Copy code
npm run dev
```
Default URL: http://localhost:5173

## Environment Variables

Backend (.env)

DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD

APP_URL – e.g., http://127.0.0.1:8000

Frontend (.env)

VITE_API_URL – points to your backend server URL

Running the Project
Start Laravel backend:
```
bash
Copy code
cd backend
php artisan serve
```

Start Vue frontend:
```
bash
Copy code
cd frontend
npm run dev
```
Visit the frontend URL (http://localhost:5173) to test the multi-step registration form.

Usage
Step 1: Account Information – Fill in personal account details (first name, last name, email, username, password, account type).

Step 2: Company Information – Fill in company details including name, address, city, region, country (loaded from API), year established, website, and brochure upload.

Step 3: Review & Submit – Review all information before submission. Submission sends a POST request to /api/register.

## API endpoints:

Endpoint	Method	Description
/api/countries	GET	Fetch list of countries
/api/register	POST	Submit registration form

### Notes
- Pinia store preserves data across steps but data is lost if the page is reloaded. Consider adding localStorage persistence if needed.

- File uploads support .pdf, .doc, .docx only.

- Country dropdown dynamically loads from backend API (/api/countries).

- Error handling is implemented on both frontend validation and API response.
