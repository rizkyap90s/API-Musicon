const req = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const { User, Playlist, Artist, Album, Song } = require("../models");
const faker = require("faker");

let userToken;
let createUser;
let createPlaylist;
let createPlaylistAgain;
let createSong;

beforeAll(async () => {
  // Playlist.deleteMany();
  createUser = await User.create({
    username: faker.internet.userName() + Math.floor(Math.random() * 1000),
    fullname: faker.name.findName(),
    email: Math.floor(Math.random() * 1000) + faker.internet.email(),
    password: "Kiki123!",
  });
  userToken = jwt.sign({ user: createUser._id }, process.env.JWT_SECRET);
  createPlaylist = await Playlist.create({
    playlistTitle: "new playlist",
    playlistImage: "img.jpg",
    author: `${createUser._id}`,
    description: "LOVE IT!!",
  });
  createPlaylistAgain = await Playlist.create({
    playlistTitle: "new playlist again",
    playlistImage: "img.jpg",
    author: `${createUser._id}`,
    description: "LOVE IT!!",
  });
  const artistTest = await Artist.create({
    name: faker.name.findName() + Math.floor(Math.random() * 1000),
  });

  const albumTest = await Album.create({
    albumTitle: faker.commerce.product(),
    artistId: artistTest._id,
  });

  artistTest.albums.push(albumTest._id);
  await artistTest.save();

  createSong = await Song.create({
    songTitle: faker.lorem.word(),
    artistId: artistTest._id,
    albumId: albumTest._id,
    songDuration: "69",
    tags: "songtest, albumtest, artisttest",
  });
});

describe("Add playlist", () => {
  it("add playlist success", async () => {
    const res = await req(app)
      .post("/playlists")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        playlistTitle: "new playlist",
        playlistImage: "img.jpg",
        author: `${createUser._id}`,
        description: "LOVE IT!!",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("add playlist not authorize", async () => {
    const res = await req(app)
      .post("/playlists")
      .send({
        playlistTitle: "new playlist",
        playlistImage: "img.jpg",
        author: `${createUser._id}`,
        description: "LOVE IT!!",
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("get all playlist", () => {
  it("get all playlist success", async () => {
    const res = await req(app).get("/playlists").set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("get all playlist not authorize", async () => {
    const res = await req(app).get("/playlists");
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("get playlist by id", () => {
  it("get playlist by id success", async () => {
    const res = await req(app)
      .get(`/playlists/${createPlaylist._id}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("get playlist by id not authorize", async () => {
    const res = await req(app).get(`/playlists/${createPlaylist._id}`);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("get playlist by id id is not valid", async () => {
    const res = await req(app)
      .get(`/playlists/${createPlaylist._id}0`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("get playlist by title", () => {
  it("get playlist by title success", async () => {
    const res = await req(app)
      .get(`/playlists/search`)
      .set("Authorization", `Bearer ${userToken}`)
      .query({ title: "a", limit: 3 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("get playlist by title not authorize", async () => {
    const res = await req(app).get(`/playlists/search`).query({ title: "new", limit: 3 });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("get playlist by title not found", async () => {
    const res = await req(app)
      .get(`/playlists/search`)
      .set("Authorization", `Bearer ${userToken}`)
      .query({ title: "anu", limit: 3 });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toBeInstanceOf(Object);
  });
});
describe("update playlist", () => {
  it("update playlist success", async () => {
    const res = await req(app)
      .put(`/playlists/update/${createPlaylist._id}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        playlistTitle: "new playlist 2",
        playlistImage: "img.jpg",
        description: "LOVE IT!!",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("update playlist not authorize", async () => {
    const res = await req(app).put(`/playlists/update/${createPlaylist._id}`).send({
      playlistTitle: "new playlist 2",
      playlistImage: "img.jpg",
      description: "LOVE IT!!",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("update playlist id not valid", async () => {
    const res = await req(app)
      .put(`/playlists/update/${createPlaylist._id}0`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        playlistTitle: "new playlist 2",
        playlistImage: "img.jpg",
        description: "LOVE IT!!",
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toBeInstanceOf(Object);
  });
});
describe("delete playlist", () => {
  it("delete playlist success", async () => {
    const res = await req(app)
      .delete(`/playlists/${createPlaylistAgain._id}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("delete playlist id not valid", async () => {
    const res = await req(app)
      .delete(`/playlists/${createPlaylistAgain._id}0`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });
});
describe("add song", () => {
  it("add song success", async () => {
    const res = await req(app)
      .post(`/playlists/${createPlaylist._id}/${createSong._id}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("add song not authorize", async () => {
    const res = await req(app).post(`/playlists/${createPlaylist._id}/${createSong._id}`);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("add song not valid", async () => {
    const res = await req(app)
      .post(`/playlists/${createPlaylist._id}/${createSong._id}0`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });
});
describe("remove song", () => {
  it("remove song success", async () => {
    const res = await req(app)
      .delete(`/playlists/${createPlaylist._id}/${createSong._id}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("remove song not authorize", async () => {
    const res = await req(app).delete(`/playlists/${createPlaylist._id}/${createSong._id}`);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });
  it("remove song not valid", async () => {
    const res = await req(app)
      .delete(`/playlists/${createPlaylist._id}/${createSong._id}0`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });
});
