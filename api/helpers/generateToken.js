const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const { TOKEN_LIFE, REFRESH_TOKEN_LIFE } = process.env;

  const token = jwt.sign({ id: payload.id }, process.env.TOKEN_SECRET, {
    expiresIn: TOKEN_LIFE
  });
  const refreshToken = jwt.sign(
    { id: payload.id },
    process.env.TOKEN_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_LIFE }
  );

  return {
    token,
    refreshToken
  }
}

module.exports = generateToken;
