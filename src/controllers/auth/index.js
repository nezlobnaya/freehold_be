// const admin = require("../../lib/admin");
const firebase = require("../../lib/firebase");

async function createUser(req, res) {
  const { email, password } = req.body;

  try {
    // Create the user
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (!user) {
      return res.status(400).json({ message: "Account not created" });
    }

    // Generate a JWT that can be used for future requests
    const token = await firebase.auth().createCustomToken(user.uid);

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);

    // TODO: Come back and address additional issues from firebase
    res.status(500).json(err);
  }
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
