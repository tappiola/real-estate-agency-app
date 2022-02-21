TODO:

- not use volumes on prod
- configure cors whitelist urls
- inputs validation trim.niy.isempty
- error handling middleware
- eslint
- (R) use library to construct gql requests
- move gql requests somewhere
- pretty loader
- pretty 404
- add search form
- add search params
- add position storing on navigate back
- add redux

- replace cities and client requests with gql
+ (R) query isInWishlist only for authorized users
+ (R) 500 error when loading /search unauthorized
- (R) token expiration
   - when user logs out, remove token from local storage
   - when token expires, return 401 (?) and frontend should remove token from local storage + redirect to home page
- (R) add protected route /wishlist. If not authorized (expired token), return 401 and redirect to home page
- add images table
- add carousel
- add wishlist route returning properties in user's wishlist
- notifications
- script to fill in properties data
- (R) refresh token
- page number into redux
- (R) error when importing './WishlistCard' (export 'default' (imported as 'WishlistCard') was not found in './WishlistCard' (module has no exports)
  )
- (R) imports without ../../