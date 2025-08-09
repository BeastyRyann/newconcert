const tokens = {};

function addToken(token, expiresAt) {
  tokens[token] = { expiresAt };
}

function validateToken(token) {
  if (!tokens[token]) return "Token not found";
  
  const tokenData = tokens[token];
  const now = Date.now();
  
  if (tokenData.expiresAt < now) {
    delete tokens[token];
    return "Token expired";
  }
  
  return "valid";
}

// Clean expired tokens every 30 seconds
setInterval(() => {
  const now = Date.now();
  Object.keys(tokens).forEach(token => {
    if (tokens[token].expiresAt < now) {
      delete tokens[token];
    }
  });
}, 30000);

module.exports = {
  addToken,
  validateToken,
  tokens
};