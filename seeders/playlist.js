const { User, Song, Playlist } = require("../models");
const faker = require("faker");
const path = require("path");
const fs = require("fs");

const createPlaylist = async function () {
  try {
    const getSong = await Song.find();
    for (let i = 0; i < 3; i++) {
      const fullname = faker.name.findName();
      const newUser = await User.create({
        fullname: fullname,
        username: fullname.split(" ")[0] + Math.floor(Math.random() * 1000),
        email: faker.internet.email(),
        password: "Kiki123!",
      });
      for (let j = 0; j < 5; j++) {
        const newPlaylist = await Playlist.create({
          playlistTitle: `${newUser.username}'s ${faker.commerce.productAdjective()} Playlist`,
          playlistImage: `/images/playlists/${Math.floor(Math.random() * 12)}.jpeg`,
          description: faker.lorem.words(),
          author: newUser._id,
        });
        for (let k = 0; k < 15; k++) {
          newPlaylist.songs.push(getSong[Math.floor(Math.random() * getSong.length)]._id);
        }
        newPlaylist.save();
      }
    }
  } catch (error) {
    return console.log(error);
  }
};
createPlaylist();
