// Email validation
exports.validateEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// Password validation
exports.validatePassword = (password) => {
  const minLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return minLength && hasUpperCase && hasLowerCase && hasNumber;
};

// Get password strength
exports.getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  const strengths = ['weak', 'fair', 'good', 'strong', 'very-strong'];
  return strengths[strength] || 'weak';
};

// Phone validation
exports.validatePhoneNumber = (phone) => {
  const phoneRegex = /^[\d\-\+\s\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// Date validation
exports.validateDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

// Attendance form validation
exports.validateAttendanceForm = (data) => {
  const errors = {};

  if (!data.userId) errors.userId = 'User ID is required';
  if (!data.classId) errors.classId = 'Class ID is required';
  if (!data.className) errors.className = 'Class name is required';
  if (!data.date) errors.date = 'Date is required';
  else if (!this.validateDate(data.date)) errors.date = 'Invalid date';

  if (!data.status) errors.status = 'Status is required';
  else if (!['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'].includes(data.status)) {
    errors.status = 'Invalid status';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
