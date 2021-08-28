const req = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { User } = require("../models");
const faker = require("faker");

beforeAll(async () => {
  // await User.deleteMany();
  // await User.create({
  //   username: faker.internet.userName() + Math.floor(Math.random() * 1000),
  //   fullname: faker.name.findName(),
  //   email: Math.floor(Math.random() * 1000) + faker.internet.email(),
  //   password: "Kiki123!",
  // });
});

describe("No Endpoint detected", () => {
  it("No", async () => {
    const res = await req(app).get("");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("Sign Up", () => {
  it("Sign Up success", async () => {
    const res = await req(app).post("/auth/signup").send({
      username: "rizkyap90s",
      fullname: "rizky ade pratama putra",
      email: "rizkyap90s@gmail.com",
      password: "Kiki123!",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("Sign Up empty field", async () => {
    const res = await req(app).post("/auth/signup").send({
      username: "",
      fullname: "rizky ade pratama putra",
      email: "rizkyap90s@gmail.com",
      password: "Kiki123!",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("Sign Up duplicate user", async () => {
    const res = await req(app).post("/auth/signup").send({
      username: "rizkyap90s",
      fullname: "rizky ade pratama putra",
      email: "rizkyap90s@gmail.com",
      password: "Kiki123!",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("Login", () => {
  it("Login username success", async () => {
    const res = await req(app).post("/auth/login").send({
      username: "rizkyap90s",
      password: "Kiki123!",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("Login email success", async () => {
    const res = await req(app).post("/auth/login").send({
      username: "rizkyap90s@gmail.com",
      password: "Kiki123!",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("Login user not found", async () => {
    const res = await req(app).post("/auth/login").send({
      username: "rizkyap90shaha",
      password: "Kiki123!",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("Login password not valid", async () => {
    const res = await req(app).post("/auth/login").send({
      username: "rizkyap90s",
      password: "",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("Login email/user not valid", async () => {
    const res = await req(app).post("/auth/login").send({
      username: "",
      password: "Kiki123!",
    });
    expect(res.statusCode).toEqual(401); //cek
    expect(res.body).toBeInstanceOf(Object);
  });
  it("Login wrong password", async () => {
    const res = await req(app).post("/auth/login").send({
      username: "rizkyap90s",
      password: "Kiki1234!",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });
});
