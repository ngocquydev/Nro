const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

function encrypt(text) {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('SECRET_KEY is not defined in the environment variables');
  }
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('SECRET_KEY is not defined in the environment variables');
  }
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
module.exports = { encrypt, decrypt };
