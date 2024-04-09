const validateEmailData = (formData) =>{
    const errors = []; 
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Invalid email address.');
      }
    
      if (!formData.password || formData.password.length < 8) {
        errors.push('Password must be at least 8 characters long.');
      }
    
      return errors;
}
export default validateEmailData; 