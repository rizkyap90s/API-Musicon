const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const mongoose = require("mongoose");
const { User, Song, Like, Artist, Album } = require("../models");
const faker = require("faker");

let userToken;
let createSong;

beforeAll(async () => {
  // await Rating.deleteMany();
  // await Playlist.deleteMany();
  // await User.deleteMany();

  const createUser = await User.create({
    username: faker.internet.userName() + Math.floor(Math.random() * 1000),
    fullname: faker.name.findName(),
    email: Math.floor(Math.random() * 1000) + faker.internet.email(),
    password: "Kiki123!",
  });

  const artistTest = await Artist.create({
    name: faker.name.findName() + Math.floor(Math.random() * 1000),
  });

  const albumTest = await Album.create({
    albumTitle: faker.commerce.product(),
    artistId: artistTest._id,
    releaseDate: "2021",
  });

  artistTest.albums.push(albumTest._id);
  await artistTest.save();

  createSong = await Song.create({
    songTitle: faker.lorem.word() + "a",
    artistId: artistTest._id,
    albumId: albumTest._id,
    songDuration: "69",
    tags: "songtest, albumtest, artisttest",
  });

  await Like.create({
    authorId: createUser._id,
    songId: createSong._id,
  });
  userToken = jwt.sign({ user: createUser._id }, process.env.JWT_SECRET);
});

describe("Set Like", () => {
  it("set like success", async () => {
    const response = await request(app)
      .post(`/songs/${createSong._id}/like`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        like: "true",
      });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("set like id not valid", async () => {
    const response = await request(app)
      .post(`/songs/${createSong._id}0/like`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        like: true,
      });
    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("like not authorize", async () => {
    const response = await request(app).post(`/songs/${createSong._id}/like`).send({
      like: true,
    });
    expect(response.statusCode).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("Get Like", () => {
  it("get like success", async () => {
    const response = await request(app)
      .get(`/songs/${createSong._id}/like`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("like id user not valid", async () => {
    const response = await request(app)
      .get(`/songs/${createSong._id}0/like`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("like not authorize", async () => {
    const response = await request(app).get(`/songs/${createSong._id}/like`);

    expect(response.statusCode).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
  });
});
