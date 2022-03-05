TODO:

- not use volumes on prod
- configure cors whitelist urls
- inputs validation trim.niy.isempty
- error handling middleware
- eslint
- move gql requests somewhere
- add search form
- add search params: price, beds
- add position storing on navigate back
- don't rerequest on navigate back (check if query params match prev currency params)
- page number into redux
- react-content-loader for placeholders https://skeletonreact.com/
- adjust Map and PropertiesList
- adjust carousel
- add next / prev for pagination
- longer gql for property page
- add labels

- (R) refresh token
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
- (R) where: {'$type.id$': 'rent'} doesn't work

How auth should work:
- Tokens are generated during login for 24 hours and stored in localstorage
- No token refresh flow
- There are mix of private and public endpoints
- If token expired, FRONTEND should detect it before making request, remove token from local storage and redirect user to Home Page
- /logout endpoint removes token from local storage and redirects to home page
- Any occurrence of 401 for graphql request should trigger logout process
- App has query to return current user data. It shouldn't return 401 even if user is not authenticated
- User data is stored in the redux
