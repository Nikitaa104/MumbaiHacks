export const validateEmail = async (email: string) => {
  const isValidFormat = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  return {
    email,
    isValidFormat,
    riskScore: isValidFormat ? 0.1 : 0.9,
    reason: isValidFormat
      ? 'Format looks correct. Further AI validation pending.'
      : 'Email format is invalid.',
    placeholder: true
  };
};

