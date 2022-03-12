Create backup: `docker exec real-estate-agency-db-1 sh -c 'exec mysqldump -uadmin -pbigsnorlax flats' > ./flats-dump.sql`
Restore backup: `docker exec -i real-estate-agency-db-1 sh -c 'exec mysql -uadmin -pbigsnorlax flats' < ./flats-dump.sql`

TODO:
- react-content-loader for placeholders on property page https://skeletonreact.com/
- add next / prev for pagination
- favicon
- fix big heart
- fix heart animation
- wishlist UI
- property page UI
- home page UI
- add logo
- GA?
- add message field

- (R) refresh token
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
- fix any and ts-ignore
- queries to apollo gql
- configure cors whitelist urls
- not use volumes on prod
- (R) login with wrong password
- remove User is not authenticated when opening wishlist