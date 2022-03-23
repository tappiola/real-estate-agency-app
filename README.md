Create backup: `docker exec real-estate-agency-db-1 sh -c 'exec mysqldump -uadmin -pbigsnorlax flats' > ./flats-dump.sql`
Restore backup: `docker exec -i real-estate-agency-db-1 sh -c 'exec mysql -uadmin -pbigsnorlax flats' < ./flats-dump.sql`

Run on server: `docker-compose -f docker-compose.prod.yml up`

# Core features:

### Frontend
- React Hooks (including custom hooks )
- React Router v6
- Redux (i.e. `@reduxjs/toolkit`)
- `clsx` for setting classes dynamically
- Skeleton loaders (own implementation)
- Slider (own implementation, with support of touch devices and endless scroll)
- 2 types of picture galleries (own implementation, including, fullscreen gallery)
- parallax effect for banners (usage of 3rd party library)
- GraphQL (including Apollo client, queries compression)
- Typescript
- Dynamic search results loading
- Pagination
- Inputs validation
- Custom Toast notifications
- Storing previous search results and page position on navigate back (no refetching from the server) 
- user authentication
- Dynamic map custom implementation based on Mapbox
- ESLint
- Custom fonts
- Font awesome icons
- SCSS
- Responsive layout

### Backend
- MariaDB
- express server
- Sequelize
- Auth middleware
- JWT tokens
- GraphQL
- ESLint



### Architecture
- 3 Docker containers for Frontend, Backend and Database
- `docker-compose` for simplifying containers startup
- DigitalOcean used for hosting
- HTTPS
- Amazon S3 bucket for images hosting

TODO:
- GA?
- remove properties without pics
- color variables

- (R) where: {'$type.id$': 'rent'} doesn't work
- (R) replace croissant
- fix any and ts-ignore
- not use volumes on prod
- handle issue with ugly undefined
