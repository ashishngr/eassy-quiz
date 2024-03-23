const EmailUtils = module.exports; 

EmailUtils.isValidEmail = (email) => {
    const email_regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/; 
    if (!email) {
        return "No email found";
    }; 
    return email_regex.test(email);
}