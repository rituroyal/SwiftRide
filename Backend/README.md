# User API Documentation

## User Registration

Register a new user in the system.

**Endpoint:** `PUT /users/register`

### Request Body

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

### Required Fields

- `fullname.firstname`: First name of the user (minimum 3 characters)
- `email`: Valid email address
- `password`: Password (minimum 8 characters)

### Validation Rules

- First name must be at least 3 characters long
- Email must be a valid email format
- Password must be at least 8 characters long

### Response

#### Success Response (201 Created)

```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
  },
  "token": "string"
}
```

##### Example Success Response
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "65f2a1b3c4d5e6f7g8h9i0j1"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYyYTFiM2M0ZDVlNmY3ZzhpOWkwajEiLCJpYXQiOjE3MDk4NzY1MjMsImV4cCI6MTcwOTg4MDEyM30.example-token"
}
```

#### Error Response (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

##### Example Error Responses

1. Invalid Email Format:
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

2. Password Too Short:
```json
{
  "errors": [
    {
      "msg": "Password must be at least 8 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

3. First Name Too Short:
```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

### Status Codes

- `201`: User successfully registered
- `400`: Validation error or missing required fields
- `500`: Server error

### Notes

- The password is automatically hashed before storage
- A JWT token is generated upon successful registration
- The token expires in 1 hour

## User Login

Authenticate a user and get access token.

**Endpoint:** `POST /users/login`

### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

### Required Fields

- `email`: Valid email address
- `password`: User's password

### Validation Rules

- Email must be a valid email format
- Password must be at least 6 characters long

### Response

#### Success Response (200 OK)

```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
  },
  "token": "string"
}
```

##### Example Success Response
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "65f2a1b3c4d5e6f7g8h9i0j1"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYyYTFiM2M0ZDVlNmY3ZzhpOWkwajEiLCJpYXQiOjE3MDk4NzY1MjMsImV4cCI6MTcwOTg4MDEyM30.example-token"
}
```

#### Error Response (401 Unauthorized)

```json
{
  "error": "Invalid email or password"
}
```

#### Validation Error Response (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

##### Example Error Responses

1. Invalid Email Format:
```json
{
  "errors": [
    {
      "msg": "invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

2. Password Too Short:
```json
{
  "errors": [
    {
      "msg": "Password is invalid",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Status Codes

- `200`: Login successful
- `400`: Validation error
- `401`: Invalid credentials
- `500`: Server error

### Notes

- The password is compared with the hashed password stored in the database
- A new JWT token is generated upon successful login
- The token expires in 1 hour
