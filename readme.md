# Microblogging Platform API

This is a RESTful API for a microblogging platform like Twitter or LinkedIn.

## Setup Instructions

1. Clone the repository:

```
git clone https://github.com/itshirdeshk/stuneckt
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:

   Create a `.env` file in the root directory and define the following variables:

```
PORT = <PORT>
MONGODB_URI = <MONGODB_URI>
CORS_ORIGIN = <CORS_ORIGIN>
JWT_SECRET = <JWT_SECRET>
```

4. Start the server:
#### In development:
```
npm run dev
```
#### In Production:
```
npm start
```

## API Documentation

### Endpoints

#### 1. User Endpoints:

- `POST /api/v1/user/register`: Create a new user account.
- `POST /api/v1/user/login`: Authenticate user credentials and generate a token.
- `GET /api/v1/user/getuserdetails`: Retrieve user profile information.
- `PUT /api/v1/user/updateUserDetails`: Update user profile information.
- `POST /api/v1/user/logout`: Invalidate token and log out user.

#### 2. Post Endpoints:

- `POST /api/v1/post/createpost`: Create a new post.
- `GET /api/v1/post/myposts`: Retrieve all posts by a specific user.
- `GET /api/v1/post/allposts`: Retrieve all the posts.

#### 3. Follower Endpoints:

- `POST /api/v1/follower/follow/:id`: Follow a user.
- `GET /api/v1/follower/userfollowers/:id`: Retrieve a list of followers for a user.
