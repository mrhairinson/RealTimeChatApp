export const ERR = {
    PASSWORD_LENGTH_MIN_6: {
        statusCode: 400,
        errorCode: "e001",
        message: "Password must be at least 6 characters"
    },
    EMAIL_SIGNUP_EXISTED: {
        statusCode: 400,
        errorCode: "e002",
        message: "Email alerady existed"
    },
    INVALID_USER_DATA: {
        statusCode: 400,
        errorCode: "e003",
        message: "Invalid user data"
    },
    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        errorCode: "e004",
        message: "Internal Server Error"
    },
    INVALID_EMAIL: {
        statusCode: 400,
        errorCode: "e005",
        message: "Invalid Email"
    },
    FULLNAME_REQUIRED: {
        statusCode: 400,
        errorCode: "e006",
        message: "fullName is require"
    },
    PASSWORD_REQUIRED: {
        statusCode: 400,
        errorCode: "e007",
        message: "password is require"
    },
    EMAIL_REQUIRED: {
        statusCode: 400,
        errorCode: "e008",
        message: "email is require"
    },
    EMAIL_NOT_FOUND: {
        statusCode: 400,
        errorCode: "e009",
        message: "Email not found"
    },
    WRONG_PASSWORD: {
        statusCode: 400,
        errorCode: "e010",
        message: "Wrong password"
    },
    UNAUTHORIZED_NO_TOKEN_PROVIDED: {
        statusCode: 401,
        errorCode: "e011",
        message: "Unauthorized - No Token Provided"
    },
    UNAUTHORIZED_TOKEN_INVALID: {
        statusCode: 401,
        errorCode: "e012",
        message: "Unauthorized - Token is invalid"
    },
    USER_NOT_FOUND: {
        statusCode: 404,
        errorCode: "e013",
        message: "User not found"
    },
}