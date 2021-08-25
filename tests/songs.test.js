// Adib's Code
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const mongoose = require("mongoose");
const { Song, Album, Artist, User } = require("../models");
let userToken = "";
let songId = "";

beforeAll(async () => {
  await Song.deleteMany();
  await Album.deleteMany();
  await Artist.deleteMany();
  await User.deleteMany();

  const userTest = await User.create({
    username: "usertestsongs",
    fullname: "User Test Songs",
    email: "usertestsongs@dummy.com",
    password: "Str0ngp@ssword",
  });

  const artistTest = await Artist.create({
    name: "artisttest",
  });

  const albumTest = await Album.create({
    albumTitle: "albumtest",
    artistId: artistTest._id,
  });

  artistTest.albums.push(albumTest._id);
  await artistTest.save();

  const songTest = await Song.create({
    songTitle: "songtest",
    artistId: artistTest._id,
    albumId: albumTest._id,
    songDuration: "69",
    tags: "songtest, albumtest, artisttest",
  });

  songId = songTest._id;
  userToken = jwt.sign({ user: userTest._id }, process.env.JWT_SECRET);
});

afterAll(() => {
  mongoose.disconnect();
});

describe("Get Songs by Title", () => {
  it("Success", async () => {
    const response = await request(app)
      .get("/songs/search")
      .query({ title: "test", limit: 3 })
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("songs");
  });

  it("Missing authorization header", async () => {
    const response = await request(app)
      .get("/songs/search")
      .query({ title: "the", limit: 3 });

    expect(response.statusCode).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors");
  });

  it("Song not found", async () => {
    const response = await request(app)
      .get("/songs/search")
      .query({ title: "monkeywrench", limit: 3 })
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors");
  });
});

describe("Get Song Details", () => {
  it("Success", async () => {
    const response = await request(app)
      .get(`/songs/${songId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("data");
  });

  it("Missing authorization header", async () => {
    const response = await request(app).get(`/songs/${songId}`);

    expect(response.statusCode).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors");
  });

  it("Song not found", async () => {
    const response = await request(app)
      .get(`/songs/${songId}69`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors");
  });
});

describe("Get Songs by Tag", () => {
  it("Success", async () => {
    const response = await request(app)
      .get("/songs/search_tags")
      .query({ tag: "test", limit: 3 })
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("songs");
  });

  it("Missing authorization header", async () => {
    const response = await request(app)
      .get("/songs/search_tags")
      .query({ tag: "test", limit: 3 });

    expect(response.statusCode).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors");
  });

  it("Song not found", async () => {
    const response = await request(app)
      .get("/songs/search_tags")
      .query({ tag: "monkeywrench", limit: 3 })
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors");
  });
});

describe("Get New Releases Songs", () => {
  it("Success", async () => {
    const response = await request(app)
      .get("/songs/new")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("songs");
  });

  it("Missing authorization header", async () => {
    const response = await request(app).get("/songs/new");

    expect(response.statusCode).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors");
  });
});

describe("Get Recommended Songs", () => {
  it("Success", async () => {
    const response = await request(app)
      .get("/songs/recommended")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("songs");
  });

  it("Missing authorization header", async () => {
    const response = await request(app).get("/songs/recommended");

    expect(response.statusCode).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors");
  });
});
