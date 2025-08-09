# Real Estate Agency App

A full-stack real estate application built with React, Node.js, GraphQL, and MariaDB. This platform allows users to search, view, and manage property listings with features like user authentication, wishlist functionality, and interactive maps.

**Live URL**: https://real-estate.tappiola.co.uk

## 🏗️ Tech Stack

### Frontend
- **React 17** with TypeScript and Hooks
- **Redux Toolkit** for state management
- **React Router v6** for navigation
- **Apollo Client** for GraphQL integration
- **Mapbox GL** for interactive maps
- **SCSS** for styling with responsive design
- **Cypress** for end-to-end testing

### Backend
- **Node.js** with Express server
- **GraphQL** with express-graphql
- **Sequelize ORM** with MariaDB
- **JWT** authentication with middleware
- **bcryptjs** for password hashing
- **ESLint** for code quality

### Infrastructure & Deployment
- **Docker** containers for Frontend, Backend, and Database
- **Docker Compose** for development environment
- **AWS ECS** and **Terraform** for production deployment
- **Amazon S3** for image storage

GitHub actions are used to deploy changes automatically after every PR is merged.

## 🚀 Key Features

### User Experience
- Advanced property search with filters
- Dynamic search results with pagination
- Interactive maps with property locations
- User authentication and registration
- Wishlist functionality for saved properties
- Responsive mobile-first design
- Custom image galleries with fullscreen view
- Parallax effects and smooth animations
- Toast notifications for user feedback
- Skeleton loaders for better UX

### Technical Features
- Custom slider implementation with touch support
- State persistence for search results and navigation
- Lazy loading and code splitting
- Input validation and sanitization
- Custom hooks for reusable logic
- Dynamic class management with clsx

### DB backup/restore

DB backup could be restored from `flats-dump-prod.sql.zip`.

### How to run locally

Using docker-compose: `docker compose up --build`
