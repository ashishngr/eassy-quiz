const PasswordUtils = module.exports; 

PasswordUtils.isValidPassword = (password) =>{
    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_@#$%^&+=]).{8,}$/; 
    if (!password) {
        return false;
    }; 
    return password_regex.test(password);
}