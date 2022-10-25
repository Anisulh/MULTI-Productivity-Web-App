const mongoose = require("mongoose");
const request = require("supertest");
const generateToken = require("../utils/generateJWT");
const createServer = require("../utils/server");
const User = require("../models/userModel");

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();

const userRegisterInput = {
  firstName: "jason",
  lastName: "Doe",
  email: "jason.doe@email.com",
  password: "password",
};

const userLoginInput = {
  email: "john.doe@email.com",
  password: "password",
};

const userPayload = {
  _id: userId,
  firstName: "jason",
  lastName: "Doe",
  email: "jason.doe@email.com",
  token: generateToken(userId),
};

const loggedInUserPayload = {
  _id: userId,
  firstName: "jason",
  lastName: "Doe",
  email: "jason.doe@email.com",
  token: generateToken(userId),
}

const unregisteredUser = {
  email: 'something@email.com',
  password: 'password'
}
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
});

afterEach(async () => {
  await User.deleteMany({email: 'jason.doe@email.com'})
  await mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close();
  });
});

describe("user", () => {
  describe("user registration", () => {
    describe("given userinput is valid", () => {
      it("should return user payload with status of 200", async () => {
        const { statusCode, body } = await request(app)
          .post("/api/users/register")
          .send(userRegisterInput);

        expect(statusCode).toBe(201);
        expect(body["password"]).not.toEqual(userRegisterInput["password"]);
        delete body["password"];
        expect(body).toEqual({
          ...userPayload,
          token: expect.anything(),
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          _v: expect.anything(),
        });
      });
    });

    describe("given userinput is invalid", () => {
      it("should return with status of 400", async () => {
        const invalidInput = { ...userRegisterInput, firstName: null };
        const { statusCode } = await request(app)
          .post("/api/users/register")
          .send(invalidInput);

        expect(statusCode).toBe(400);
      });
    });

    describe("given user already exists", () => {
      it("should return with a status of 401", async () => {
        const existingUserInput = {
          firstName: "john",
          lastName: "doe",
          email: "john.doe@email.com",
          password: "password",
        };

        const { statusCode } = request(app)
          .post("/api/users/register")
          .send(existingUserInput);
        expect(statusCode).toBe(401);
      });
    });
  });

  describe("user login", () => {
    describe("given userinput is valid", () => {
      it("should return user payload with status of 200", async () => {

        const { statusCode, body } = await supertest(app)
          .post("/api/users/login")
          .send(userLoginInput);

        expect(statusCode).toBe(200);
        expect(body["password"]).toNotEqual(userLoginInput["password"]);
        delete body["password"];
        expect(body).toEqual({
          ...userPayload,
          token: expect.anything(),
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          _v: expect.anything(),
        });
      });
    });

    describe("given userinput is invalid", () => {
      it("should return with status of 400", async () => {
        const invalidInput = { ...userLoginInput, email: null };

        const { statusCode } = await request(app)
          .post("/api/users/login")
          .send(invalidInput);

        expect(statusCode).toBe(400);
      });
    });

    describe("given input of user with no account", () => {
      it("should return with status of 400", async () => {
        const { statusCode } = await request(app).post("/api/users/login").send(unregisteredUser);
        expect(statusCode).toBe(404);
      })
    })
  });
});
