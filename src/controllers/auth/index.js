const admin = require("../../lib/admin");
const firebase = require("../../lib/firebase");

async function createUser(req, res) {
  const { email, password } = req.body;

  const user = await admin.auth().createUser({
    email,
    password
  });

  res.status(201).send(user);
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    /*
     * Firebase auth does some magical stuff here.
     * If the users login info is correct, it sets the current user on the
     * global firebase application instance that can be retrieved with
     * firebase.auth().currentUser
     * */
    await firebase.auth().signInWithEmailAndPassword(email, password);

    const token = await firebase.auth().currentUser.getIdToken();

    const blah = await admin.auth().verifyIdToken(token);
    console.log(blah);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);

    res.send(401).json({
      error: "Invalid credentials"
    });
  }
}

module.exports = {
  createUser,
  login
};
