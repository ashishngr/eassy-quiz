const validateFormData = (formData) => {
    const errors = [];
  
    if (!formData.first_name || formData.first_name.trim() === '') {
      errors.push('First name is required.');
    }
  
    if (!formData.last_name || formData.last_name.trim() === '') {
      errors.push('Last name is required.');
    }
  
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Invalid email address.');
    }
  
    if (!formData.password || formData.password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
  
    return errors;
};

export default validateFormData