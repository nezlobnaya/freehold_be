function validateAuthInput(req, res, next) {
  const { email, password } = req.body;

  let errors = {};

  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      errors
    });
  }

  next();
}

module.exports = validateAuthInput;
