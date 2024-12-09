import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../models/posts_model";
import { Express } from "express";
import userModel from "../models/user_model";

let app: Express;

beforeAll(async () => {
  app = await initApp();
  await userModel.deleteMany();
  await postModel.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

const baseUrl = "/auth";

type User = {
  email: string;
  password: string;
  token?: string;
  _id?: string;
}
const testUser: User = {
  email: "user1@test.com",
  password: "123456",
}

describe("Auth test suite", () => {
  test("Auth test registration", async () => {
    const response = await request(app).post(baseUrl + "/register").send(testUser);
    expect(response.statusCode).toBe(200);
  });

  test("Auth test registration no password", async () => {
    const response = await request(app).post(baseUrl + "/register").send({
      email: "sdfsadaf",
    });
    expect(response.statusCode).not.toBe(200);
  });

  test("Auth test registration email already exist", async () => {
    const response = await request(app).post(baseUrl + "/register").send(testUser);
    expect(response.statusCode).not.toBe(200);
  });

  test("Auth test login", async () => {
    const response = await request(app).post(baseUrl + "/login").send(testUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    const token = response.body.token;
    testUser.token = token;
    testUser._id = response.body._id;
  });

  test("Test token access", async () => {
    const response = await request(app).post("/posts").send({
      title: "Test title",
      content: "Test content",
      owner: "Eliav",
    });

    expect(response.statusCode).not.toBe(201);
    const response2 = await request(app).post("/posts").set({
      authorization: "JWT " + testUser.token,
    }).send({
      title: "Test title",
      content: "Test content",
      owner: "Eliav",
    });
    expect(response2.statusCode).toBe(201);
  });

  test("Test token access fail", async () => {
    const response2 = await request(app).post("/posts").set({
      authorization: "JWT " + testUser.token + "f",
    }).send({
      title: "Test title",
      content: "Test content",
      owner: "Eliav",
    });
    expect(response2.statusCode).not.toBe(201);
  })
});
