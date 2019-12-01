const JWT = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../configuration");

signToken = user => {
  return JWT.sign(
    {
      iss: "Codeworkr",
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(403).send({ error: "Email is already in use" });
    } else {
      const newUser = new User({ email, password });
      newUser
        .save()
        .then(() => {
          //secret to verify it is our token not encrypted
          const token = signToken(newUser);

          //respond with toekn
          res.status(200).json({ token });
        })
        .catch(next);
    }
  },
  signIn: async (req, res, next) => {
    // generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  secret: async (req, res, next) => {
    res.json({ secret: "resources" });
  }
};
