# Product Listing API

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Authentication](#authentication)
- [Database](#database)
- [Error Handling](#error-handling)
- [Contributions](#contributions)
- [License](#license)

## Description

The Product Listing API is a Node.js-based backend service that allows users to manage product listings. It includes features for user registration, email verification through OTP (One-Time Password), and token-based authentication.

## Features

- **User Registration:** Users can sign up with their email, and a verification OTP is sent to their email address.

- **Email Verification:** Users verify their email by entering the OTP received in their email.

- **Token-Based Authentication:** Users receive an access token upon successful login, which is required for authenticating and accessing protected routes.

- **Product Management:** Authenticated users can add, delete, and update product listings.

## Technology Stack

- **Node.js:** Server-side JavaScript runtime environment.

- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.

- **MongoDB:** A NoSQL database for storing user and product data.

- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB, providing a schema-based solution to model your application data.

- **Nodemailer:** For sending email notifications.

- **JSON Web Tokens (JWT):** For secure authentication and authorization.

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/thejaved/node-product-listing-api.git
   cd product-listing-api