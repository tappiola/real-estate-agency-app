# Real estate agency website

Live URL: https://real-estate.tappiola.com/

## Core features

### Frontend
- React Hooks (including custom hooks )
- React Router v6
- Redux (i.e. `@reduxjs/toolkit`)
- `clsx` for setting classes dynamically
- Skeleton loaders (own implementation)
- Slider (own implementation, with support of touch devices and endless scroll)
- 2 types of picture galleries (own implementation, including, fullscreen gallery)
- Parallax effect for banners (usage of 3rd party library)
- `react-transition-group` for animations
- GraphQL (including Apollo GraphQL client in few areas)
- Typescript
- Dynamic search results loading
- Pagination
- Inputs validation
- Custom Toast notifications
- Storing previous search results and page position on navigate back (no refetching from the server) 
- User authentication
- Dynamic map custom implementation based on Mapbox
- ESLint
- Font awesome icons
- SCSS
- Responsive layout
- Lazy loading and split into chunks

### Backend
- `express` server
- MariaDB
- Sequelize ORM
- Auth middleware
- JWT tokens
- GraphQL
- ESLint
- dotenv files for secrets

### Architecture
- 3 Docker containers for Frontend, Backend and Database
- `docker-compose` for simplifying containers startup
- Using docker multi-stage build for production frontend image
- DigitalOcean VM used for hosting
- Custom domain name and HTTPS
- Amazon S3 bucket for images hosting

### DB backup/restore
Create backup: `docker exec real-estate-agency-db-1 sh -c 'exec mysqldump -uadmin -pbigsnorlax flats' > ./flats-dump.sql`

Restore backup: `docker exec -i real-estate-agency-db-1 sh -c 'exec mysql -uadmin -pbigsnorlax flats' < ./flats-dump.sql`

### How to run locally
Using docker-compose: `docker-compose up --build`

Usage without docker is not so easy, because you need to have MySQL running locally. 

### Deployment
1. Login to server via SSH
2. Navigate to app directory: `cd ~/real-estate-agency-app`
3. Stop running containers: `docker-compose -f docker-compose.prod.yml down`
4. Pull the latest code: `git pull`
5. Rebuild images and run containers again: `docker-compose -f docker-compose.prod.yml up --build -d`
6. Check output to be sure that there are no unexpected errors: `docker-compose -f docker-compose.prod.yml logs -f`
