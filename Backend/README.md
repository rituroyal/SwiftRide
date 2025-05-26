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
## User Profile

Get the authenticated user's profile information.

**Endpoint:** `GET /users/profile`

### Headers

- `Authorization: Bearer <token>` (or use the `token` cookie)

### Response

#### Success Response (200 OK)

```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "socketId": "string"
}
```

#### Error Response (401 Unauthorized)

```json
{
  "error": "Unauthorized"
}
```

### Status Codes

- `200`: Profile fetched successfully
- `401`: Invalid or missing token

### Notes

- Requires a valid JWT token in the `Authorization` header or as a cookie.
- Returns the user's profile data.

## User Logout

Logout the authenticated user and blacklist the JWT token.

**Endpoint:** `GET /users/logout`

### Headers

- `Authorization: Bearer <token>` (or use the `token` cookie)

### Response

#### Success Response (200 OK)

```json
{
  "message": "Logged out successfully"
}
```

#### Error Response (401 Unauthorized)

```json
{
  "error": "Unauthorized"
}
```

### Status Codes

- `200`: Logout successful
- `401`: Invalid or missing token

### Notes

- Requires a valid JWT token in the `Authorization` header or as a cookie.
- The token is blacklisted for 24 hours and cannot be used again.
- The `token` cookie is cleared on logout.
## Captain API Documentation

### Captain Registration

Register a new captain in the system.

**Endpoint:** `POST /captains/register`

#### Request Body

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": 1,
    "vehicleType": "car",
    "location": {
      "latitude": 28.6139,
      "longitude": 77.2090
    }
  }
}
```

#### Example Request

```json
{
  "fullname": {
    "firstname": "Ravi",
    "lastname": "Kumar"
  },
  "email": "ravi123@example.com",
  "password": "mypassword",
  "vehicle": {
    "color": "Red",
    "plate": "DL01AB1234",
    "capacity": 4,
    "vehicleType": "car",
    "location": {
      "latitude": 28.6139,
      "longitude": 77.2090
    }
  }
}
```

#### Required Fields

- `fullname.firstname`: First name of the captain (minimum 3 characters)
- `fullname.lastname`: Last name of the captain (minimum 3 characters)
- `email`: Valid email address
- `password`: Password (minimum 6 characters)
- `vehicle.color`: Color of the vehicle (minimum 3 characters)
- `vehicle.plate`: Vehicle plate number (minimum 3 characters)
- `vehicle.capacity`: Capacity of the vehicle (minimum 1)
- `vehicle.vehicleType`: Type of vehicle (`car`, `motorcycle`, or `auto`)
- `vehicle.location.latitude`: Latitude (number)
- `vehicle.location.longitude`: Longitude (number, required)

#### Validation Rules

- First name and last name must be at least 3 characters long
- Email must be a valid email format
- Password must be at least 6 characters long
- Vehicle color and plate must be at least 3 characters long
- Vehicle capacity must be at least 1
- Vehicle type must be one of: `car`, `motorcycle`, `auto`
- Vehicle location must include both latitude and longitude

#### Response

##### Success Response (201 Created)

```json
{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": 1,
      "vehicleType": "car",
      "location": {
        "latitude": 28.6139,
        "longitude": 77.2090
      }
    }
  },
  "token": "string"
}
```

##### Example Success Response

```json
{
  "captain": {
    "_id": "65f2a1b3c4d5e6f7g8h9i0j1",
    "fullname": {
      "firstname": "Ravi",
      "lastname": "Kumar"
    },
    "email": "ravi123@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "DL01AB1234",
      "capacity": 4,
      "vehicleType": "car",
      "location": {
        "latitude": 28.6139,
        "longitude": 77.2090
      }
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

##### Error Response (400 Bad Request)

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

##### Example Error Responses

1. Missing Required Field:
```json
{
  "errors": [
    {
      "msg": "Path `vehicle.location.longitude` is required.",
      "param": "vehicle.location.longitude",
      "location": "body"
    }
  ]
}
```

2. Invalid Vehicle Type:
```json
{
  "errors": [
    {
      "msg": "Vehicle type must be car, motorcycle, or auto",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

#### Status Codes

- `201`: Captain successfully registered
- `400`: Validation error or missing required fields
- `500`: Server error

#### Notes

- The password is automatically hashed before storage
- A JWT token is generated upon successful registration
- The token expires in 7 days
## Captain API Documentation

### Captain Registration

Register a new captain in the system.

**Endpoint:** `POST /captains/register`

#### Request Body

```jsonc
{
  "fullname": {
    "firstname": "string", // required, min 3 chars
    "lastname": "string"   // required, min 3 chars
  },
  "email": "string",        // required, valid email
  "password": "string",     // required, min 6 chars
  "vehicle": {
    "color": "string",      // required, min 3 chars
    "plate": "string",      // required, min 3 chars
    "capacity": 1,          // required, integer >= 1
    "vehicleType": "car",   // required, one of: "car", "motorcycle", "auto"
    "location": {
      "latitude": 28.6139,  // required, number
      "longitude": 77.2090  // required, number
    }
  }
}
```

#### Success Response (201 Created)

```jsonc
{
  "token": "string", // JWT token, expires in 7 days
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": 1,
      "vehicleType": "car",
      "location": {
        "latitude": 28.6139,
        "longitude": 77.2090
      }
    }
  }
}
```

#### Error Response (400 Bad Request)

```jsonc
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long", // example error message
      "param": "fullname.firstname",
      "location": "body"
    }
    // ...other validation errors
  ]
}
```

#### Error Response (Duplicate Email)

```jsonc
{
  "error": "Captain with this email already exists"
}
```

---

### Captain Login

Authenticate a captain and get access token.

**Endpoint:** `POST /captains/login`

#### Request Body

```jsonc
{
  "email": "string",    // required, valid email
  "password": "string"  // required, min 6 chars
}
```

#### Success Response (200 OK)

```jsonc
{
  "token": "string", // JWT token, expires in 7 days
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": 1,
      "vehicleType": "car",
      "location": {
        "latitude": 28.6139,
        "longitude": 77.2090
      }
    }
  }
}
```

#### Error Response (401 Unauthorized)

```jsonc
{
  "error": "Invalid email or password"
}
```

#### Error Response (400 Bad Request)

```jsonc
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
    // ...other validation errors
  ]
}
```

---

### Captain Profile

Get the authenticated captain's profile.

**Endpoint:** `GET /captains/profile`

#### Headers

- `Authorization: Bearer <token>` // required

#### Success Response (200 OK)

```jsonc
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": 1,
    "vehicleType": "car",
    "location": {
      "latitude": 28.6139,
      "longitude": 77.2090
    }
  }
}
```

#### Error Response (401 Unauthorized)

```jsonc
{
  "error": "Unauthorized"
}
```

---

### Captain Logout

Logout the authenticated captain and blacklist the JWT token.

**Endpoint:** `GET /captains/logout`

#### Headers

- `Authorization: Bearer <token>` // required

#### Success Response (200 OK)

```jsonc
{
  "message": "Logged out successfully"
}
```

#### Error Response (401 Unauthorized)

```jsonc
{
  "error": "Unauthorized"
}
```

---

**Notes:**
- All endpoints require proper validation as per the comments in the JSON.
- JWT token is required for profile and logout routes.
- On logout, the token is blacklisted for 24 hours and cannot be reused.
