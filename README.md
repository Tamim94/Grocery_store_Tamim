## Before you read it , the admin side of the website is the functionnal (CRUD ) part of the website. The user side is just a basic layout with no functionnalities YET (incoming soon).

## The admin part of the app will be on localhost:3000/admin login are root@root.com and the password is root
install all dependancies with npm run install after cloning the project 

# Grocery Store Web Application Documentation

This document provides an overview of a grocery store web application built using Next.js, React, and Supabase. The application allows users to browse products and provides an admin dashboard for managing products, users, and stock.

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Frontend](#frontend)
   4.1. [Components](#frontend-components)
   4.2. [Pages](#frontend-pages)
5. [Backend (API)](#backend)
   5.1. [Authentication API](#auth-api)
   5.2. [Products API](#products-api)
6. [Database (Supabase)](#database)
7. [Dependencies](#dependencies)
8. [Deployment](#deployment)  (If applicable)
9. [Future Improvements](#future-improvements)

## 1. Introduction

This web application simulates a basic online grocery store.  Administrators can manage products (CRUD operations), user accounts, and stock levels.  The user side currently focuses on product browsing and provides a foundation for future e-commerce features.

## 2. Technologies Used

* **Next.js:**  A React framework for server-side rendering, static site generation, and more.
* **React:**  A JavaScript library for building user interfaces.
* **Supabase:**  A backend-as-a-service platform that provides a PostgreSQL database, authentication, and other services.
* **Tailwind CSS:**  A utility-first CSS framework.
* **NextAuth.js (Optional):**  If used, for authentication with providers like Google. ( i tried but its complicated so i may do it later if i set up GCP)


## 3. Project Structure ( only the files that are important)

```
grocery-store-app/
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── Footer.tsx
│ │ ├── Navbar.tsx
│ │ ├── ProductCard.tsx
│ │ ├── ProductManagement.tsx
│ │ ├── UserManagement.tsx
│ │ └── UserProfile.tsx
│ ├── pages/ # Page components for routing
│ │ ├── _app.tsx
│ │ ├── About.tsx
│ │ ├── account.tsx
│ │ ├── admin/
│ │ │ ├── index.tsx
│ │ │ ├── login.tsx
│ │ │ └── users.tsx
│ │ ├── api/
│ │ │ ├── auth/
│ │ │ │ ├── login.ts
│ │ │ │ ├── logout.ts
│ │ │ │ ├── signup.ts
│ │ │ │ └── [...nextauth].ts
│ │ │ └── products/
│ │ │ ├── index.ts
│ │ │ └── [id].ts
│ │ ├── auth/ # Frontend authentication pages
│ │ │ └── signup.tsx
│ │ ├── contact.tsx
│ │ ├── index.tsx (Home Page)
│ │ ├── login.tsx
│ │ ├── products/ # Frontend product pages
│ │ │ └── index.tsx (Products List)
│ │ └── signup.tsx
│ ├── styles/ # CSS files
│ │ └── globals.css
│ └── utils/ # Utility functions
│ └── supabaseClient.ts
├── .env.local # Environment variables
├── package.json

```
## 4. Frontend

### 4.1 Components

* **Footer.tsx:**  Displays the website footer with copyright and social media links.
* **Navbar.tsx:**  The main navigation bar with links to different pages and user profile information.
* **ProductCard.tsx:** Displays a single product with its image, name, description, and other details.
* **ProductManagement.tsx:**  Admin component for managing products (add, edit, delete, search, filter).
* **UserManagement.tsx:** Admin component for managing user accounts (edit, delete, search).
* **UserProfile.tsx:** Displays user profile information and login/logout buttons.


### 4.2 Pages

* **_app.tsx:**  The root component that wraps all pages.  Provides the Supabase context.
* **About.tsx:**  Static page with information about the project.
* **account.tsx:** Allows users to manage their account details (username, password, delete account).
* **admin/index.tsx:**  The main admin dashboard with tabs for product and user management.
* **admin/login.tsx:**  Login page for administrators.
* **admin/users.tsx:** Page for managing users with delete functionality.  (Different from UserManagement component?)
* **api/*:**  API routes (covered in the Backend section).
* **auth/signup.tsx:**  User signup page.
* **contact.tsx:**  Static contact page.
* **index.tsx:**  The home page with featured products.
* **login.tsx:** User login page.
* **products/index.tsx:**  Displays a list of all products with search and category filtering.
* **[...nextauth].ts:** Likely handles authentication using NextAuth.js.

## 5. Backend (API)

The backend uses API routes provided by Next.js.

### 5.1 Authentication API (`api/auth`)

* **login.ts:** Handles user login with email and password.
* **logout.ts:** Handles user logout.
* **signup.ts:** Handles user signup, adding user data to the Supabase `users` table.
* **[...nextauth].ts:**  Implements NextAuth.js for authentication, potentially with Google.


### 5.2 Products API (`api/products`)

* **index.ts:** Handles GET requests to retrieve all products and POST requests to create new products.
* **[id].ts:** Handles PATCH requests to update a product and DELETE requests to delete a product by ID.




## 6. Database (Supabase)

The application uses a Supabase PostgreSQL database with the following tables:

* **products:**  Stores product information (name, description, price, stock, image_url, category).
* **users:** Stores user information (id, created_at, first_name, last_name, email, gender, username).



## 7. Dependencies

The project uses standard Next.js dependencies, along with:

* `@supabase/supabase-js`: The Supabase JavaScript client library.
* `@supabase/auth-helpers-react`: Supabase authentication helpers for React.
* `@next-auth/supabase-adapter`:  If used, integrates NextAuth.js with Supabase.
* `next-auth`: If used, for authentication.
* `next-auth/providers/google`:  If used, for Google authentication( i didnt do it yet in such little time).

## 8. Deployment INCOMING I CANT DO IT IN SUCH LITTLE TIME




## 9. Future Improvements

* **User Side Enhancement:** Implement add-to-cart functionality, order management, payment integration.
* **Admin Features:**  More detailed reporting, inventory management, user role management.
* **Improved Search and Filtering:**  More advanced search options, faceted filtering.
* **UI/UX Enhancements:** Improve the overall design and user experience.

Please if you have any questions or need more information, feel free to ask me. Mail me at: golam.tamim94@gmail.com.




























This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
