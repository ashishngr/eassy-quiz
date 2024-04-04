let CONSTANTS = {}

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080" ; 
const PRIMARY_CUSTOMER_CODE = process.env.PRIMARY_CUSTOMER_CODE || "111"; 

CONSTANTS = {
    ...CONSTANTS, 
    API_BASE_URL, 
    PRIMARY_CUSTOMER_CODE
}

export default CONSTANTS; 
