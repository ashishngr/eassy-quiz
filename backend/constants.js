exports.ERRORS = {
    ADMIN_USER_ALREADY_EXIST: {
        status_code: 400,
        message: "Admin user already exist"
    }, 
    GENERIC_BAD_REQUEST: {
        status_code: 400, 
        message: "Invalid request or query data"
    }, 
    USER_CREDENTIALS_INVALID: {
        status_code: 401, 
        message: "User credentials invalid"
    }, 
    NO_USER_FOUND: {
        status_code: 404, 
        message: "No user found with this email"
    }, 
    BOTH_FASSWORD_MATCH: {
        status_code: 400,
        message: "Both password match"
    }, 
    MISSING_REQUIRED_QUIZ_FIELDS : {
        status_code: 400,
        message: "Missing required quiz field"
    }, 
    QUESTIONS_LIMIT_EXCEED: {
        status_code: 400, 
        message: "Questions can not be greater than 10 in a particular quiz"
    }, 
    SHARED_EMAIL_WRONG: {
        status_code: 400, 
        message: "Shared email array contaon wrong email"
    }, 
    NO_QUIZ_FOUND: {
        status_code: 404, 
        message: "No quiz found"
    }
}