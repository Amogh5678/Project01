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
