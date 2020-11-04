const SECRET = process.env.JWT_SECRET;

module.exports = {
  TokenSECRET: SECRET,
  TokenOptions: {
    expiresIn: "1d",
  },
};
