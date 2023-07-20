const crypto = require('crypto');

// Generate a random secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Call the function to generate the secret key
const secretKey = generateSecretKey();
console.log('Secret Key:', secretKey);
