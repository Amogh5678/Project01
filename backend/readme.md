# /users/register Endpoint Documentation

## Description
Registers a new user. Validates input and returns an authentication token along with the user data.

## Request
- **Method:** POST
- **URL:** `/users/register`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
      "email": "user@example.com",
      "fullname": {
          "firstname": "John",
          "lastname": "Doe"
      },
      "password": "password123"
  }
  ```
  - **Notes:** All fields are required. Validation checks:
    - `email`: must be a valid email.
    - `fullname.firstname`: at least 3 characters.
    - `password`: minimum 6 characters.

## Responses
- **201 Created**
  - Returned when registration is successful.
  - Example response:
    ```json
    {
        "token": "jwt_token_here",
        "user": { /* user data */ }
    }
    ```
- **400 Bad Request**
  - Returned when validation fails.
  - Example response:
    ```json
    {
        "errors": [
            { "msg": "Error message", "param": "field", "location": "body" }
        ]
    }
    ```

## API Endpoints

### POST /users/login

- **Description:** Logs in an existing user.
- **Request Body:**
  - `email`: string (must be a valid email)
  - `password`: string (minimum length of 6)
- **Responses:**
  - **200 OK:** Returns an object with `user` details and an authentication `token`.
  - **400 Bad Request:** Returns validation errors if the request body is invalid.
  - **401 Unauthorized:** Returned when credentials are incorrect or the user does not exist.

**Example:**

_Request:_
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

_Response (200 OK):_
```json
{
  "user": {
    // ...existing user fields...
  },
  "token": "jwt_token_example"
}
```
