const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY, JWT_EXPIRES_TIME } = require('../configs');
const { generateRandomString } = require('./random');

const generatePassword = async (password) => {
  const salt = generateSalt(10);
  password = password || generateRandomString(16);
  password = await hashBcrypt(password, salt);
  return password;
};

const comparePassword = async (passwordCompare, password) => {
  const isCorrectPassword = await compareBcrypt(passwordCompare, password);
  return isCorrectPassword;
};

const generateAccessToken = async (userId) => {
  const accessToken = await jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
  return accessToken;
};

const generateSalt = (rounds) => {
  return bcrypt.genSaltSync(rounds);
};

const hashBcrypt = (text, salt) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(text, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

const compareBcrypt = (data, hashed) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(data, hashed, (err, same) => {
      if (err) reject(err);
      resolve(same);
    });
  });
};

module.exports = {
  comparePassword,
  generateAccessToken,
  generatePassword,
};
