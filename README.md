TODO:

- not use volumes on prod
- configure cors whitelist urls
- inputs validation trim.niy.isempty
- error handling middleware
- eslint
- move gql requests somewhere
- add search form
- add search params
- add position storing on navigate back
- add redux
- replace cities and client requests with gql
- add images table
- add carousel
- script to fill in properties data
- page number into redux


- (R) refresh token
- (R) error when importing './WishlistCard' (export 'default' (imported as 'WishlistCard') was not found in './WishlistCard' (module has no exports)
  )
- (R) imports without ../../
- (R) rewrite login with await + parse error message from response in case of 500 error
- (R) search returns empty list for not logged in user
+ (R) query isInWishlist only for authorized users
+ (R) 500 error when loading /search unauthorized
- (R) token expiration
  - when user logs out, remove token from local storage
  - when token expires, return 401 (?) and frontend should remove token from local storage + redirect to home page
- (R) add protected route /wishlist. If not authorized (expired token), return 401 and redirect to home page
- (R) error handling for not authorized + wishlist (super ugly now)
- (R) use library to construct gql requests