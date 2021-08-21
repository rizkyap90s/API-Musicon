const { User, Song, Playlist } = require("../models");
const faker = require("faker");
const { find } = require("../models/album");
// require("mongoose");

const createPlaylist = async function () {
  try {
    const getSong = await Song.find();
    for (let i = 0; i < 3; i++) {
      const newUser = await User.create({
        username: faker.internet.userName(),
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        password: "Kiki123!",
      });
      for (let j = 0; j < 5; j++) {
        const newPlaylist = await Playlist.create({
          playlistTitle: `${newUser.fullname}'s ${faker.commerce.productAdjective()} Playlist`,
          playlistImage: faker.image.imageUrl(),
          description: faker.lorem.words(),
          author: newUser._id,
        });
        for (let k = 0; k < 15; k++) {
          newPlaylist.songs.push(getSong[Math.floor(Math.random() * getSong.length)]._id);
          newPlaylist.save();
        }
      }
    }
  } catch (error) {
    return console.log(error);
  }
};
createPlaylist();
