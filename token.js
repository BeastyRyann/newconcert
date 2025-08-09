const { v4: uuidv4 } = require('uuid');
const tokenManager = require('./token-manager');

exports.handler = async (event) => {
  const token = uuidv4().replace(/-/g, '');
  const expiresAt = Date.now() + 60000;
  
  tokenManager.addToken(token, expiresAt);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      token,
      expiresAt,
      validateUrl: `${process.env.SITE_URL}/.netlify/functions/validate?token=${token}`
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
};