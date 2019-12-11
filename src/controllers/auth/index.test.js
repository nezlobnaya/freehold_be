const { createUser, login } = require("./");
const { Express } = require("../../test-utils");
const firebase = require("../../lib/firebase");

const mockRequest = () =>
  Express.mockRequest({
    body: {
      email: "test@gmail.com",
      password: "123"
    }
  });

const mockExpress = () => ({
  req: mockRequest(),
  res: Express.mockResponse()
});

describe("createUser", () => {
  it("should return a 201 on success", async () => {
    const { req, res } = mockExpress();

    firebase.createUserWithEmailAndPassword.mockResolvedValue({
      user: firebase.user
    });

    firebase.user.getIdToken.mockResolvedValue("1234");

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should send a token on success", async () => {
    const { req, res } = mockExpress();

    firebase.createUserWithEmailAndPassword.mockResolvedValue({
      user: firebase.user
    });

    firebase.user.getIdToken.mockResolvedValue("1234");

    await createUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ token: "1234" });
  });

  it("should send 400 if email is already taken", async () => {
    const { req, res } = mockExpress();

    firebase.createUserWithEmailAndPassword.mockRejectedValue({
      code: "auth/email-already-in-use"
    });

    firebase.user.getIdToken.mockResolvedValue("1234");

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Email is already used" });
  });
});

describe("login", () => {
  it("should return a 200 when successful", async () => {
    const { req, res } = mockExpress();

    firebase.signInWithEmailAndPassword.mockResolvedValue();
    firebase.currentUser.getIdToken.mockResolvedValue("1234");
    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "1234" });
  });

  it("should return a 401 when bad credentials are given", async () => {
    const { req, res } = mockExpress();

    firebase.signInWithEmailAndPassword.mockRejectedValue();
    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
  });
});
