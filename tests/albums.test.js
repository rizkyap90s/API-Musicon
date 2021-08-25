// Adib's Code
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const mongoose = require("mongoose");
const { Album, Artist, User } = require("../models");
let userToken = "";
let albumId = "";

beforeAll(async () => {
  await Artist.deleteMany();
  await Album.deleteMany();
  await User.deleteMany();

  const userTest = await User.create({
    username: "usertestalbum",
    fullname: "User Test Album",
    email: "usertestalbum@dummy.com",
    password: "Str0ngp@ssword",
  });

  const artistTest = await Artist.create({
    name: "artisttestOne",
  });

  const albumTest = await Album.create({
    albumTitle: "albumtest",
    artistId: artistTest._id,
    releaseDate: "2021",
  });

  albumId = albumTest._id;

  userToken = jwt.sign({ user: userTest._id }, process.env.JWT_SECRET);
});

afterAll(() => {
  mongoose.disconnect();
});

describe("Get New Albums", () => {
  it("Success", async () => {
    const response = await request(app)
      .get(`/albums/new`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("albums");
  });

  it("Missing authorization header", async () => {
    const response = await request(app).get(`/albums/new`);

    expect(response.statusCode).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors");
  });
});

describe("Get Albums By Title", () => {
  it("Success", async () => {
    const response = await request(app)
      .get(`/albums/search`)
      .set("Authorization", `Bearer ${userToken}`)
      .query({ title: "test", limit: 3 });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("albums");
  });

  it("Missing authorization header", async () => {
    const response = await request(app)
      .get(`/albums/search`)
      .query({ title: "test", limit: 3 });

    expect(response.statusCode).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors");
  });

  it("Album not found", async () => {
    const response = await request(app)
      .get(`/albums/search`)
      .set("Authorization", `Bearer ${userToken}`)
      .query({ title: "monkeywrench", limit: 3 });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors");
  });
});
