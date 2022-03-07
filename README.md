Create backup: `docker exec real-estate-agency-db-1 sh -c 'exec mysqldump -uadmin -pbigsnorlax flats' > ./flats-dump.sql`
Restore backup: `docker exec -i real-estate-agency-db-1 sh -c 'exec mysql -uadmin -pbigsnorlax flats' < ./flats-dump.sql`

TODO:
- not use volumes on prod
- configure cors whitelist urls
- inputs validation trim.niy.isempty
- error handling middleware
- eslint
- react-content-loader for placeholders on property page https://skeletonreact.com/
- add next / prev for pagination
- favicon
- add price to map
- responsive layout
- fix big heart
- fix heart animation
- cities and property types to redux
- wishlist UI
- rename navigation reducet

- (R) refresh token
- (R) imports without ../../
- (R) rewrite login with await + parse error message from response in case of 500 error
- (R) search returns empty list for not logged in user
- (R) token expiration
  - when user logs out, remove token from local storage
  - when token expires, return 401 (?) and frontend should remove token from local storage + redirect to home page
- (R) error handling for not authorized + wishlist (super ugly now)
- (R) use library to construct gql requests
- (R) where: {'$type.id$': 'rent'} doesn't work
- (R) replace croissant
- (R) move mixins to one file
- (R) ts-ignore inView