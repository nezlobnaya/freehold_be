const admin = require("./admin");

const bearerAuth = async (req, res, next) => {
  // We get the authorization header and default to an empty string
  const credentials = req.headers.authorization || "";

  const [type, payload] = credentials.split(" ");

  /*
   * To make our middleware graceful, we want to make sure that the authorzation
   * type is Bearer before proceeding as we may implement other authorization
   * methods in the future.
   * */
  if (type === "Bearer") {
    try {
      const user = await admin.auth().verifyIdToken(payload);
      console.log(user);

      res.status(200).json({
        token: user
      });
    } catch (err) {
      console.error(err);
      return res.status(401).send({ error: "You are not authorized" });
    }
  } else {
    next();
  }
};

module.exports = bearerAuth;
