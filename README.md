Create backup: `docker exec real-estate-agency-db-1 sh -c 'exec mysqldump -uadmin -pbigsnorlax flats' > ./flats-dump.sql`
Restore backup: `docker exec -i real-estate-agency-db-1 sh -c 'exec mysql -uadmin -pbigsnorlax flats' < ./flats-dump.sql`

TODO:
- react-content-loader for placeholders on property page https://skeletonreact.com/
- favicon
- fix heart animation
- wishlist UI
- property page UI
- home page UI
- GA?
- remove properties without pics
- forms validation client form
- change useMobile hook to smth
- color variables


- (R) token expiration
  - when user logs out, remove token from local storage
  - when token expires, return 401 (?) and frontend should remove token from local storage + redirect to home page
- (R) error handling for not authorized + wishlist (super ugly now)
- (R) use library to construct gql requests
- (R) where: {'$type.id$': 'rent'} doesn't work
- (R) replace croissant
- (R) move mixins to one file
- fix any and ts-ignore
- queries to apollo gql
- configure cors whitelist urls
- not use volumes on prod
- IMAGE_PLACEHOLDER to amazon s3
- remove __typename from response
