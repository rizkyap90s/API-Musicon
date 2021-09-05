const { Song } = require("../../models");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const getSongTitles = async () => {
  songs = await Song.find();
  songTitles = songs.map(
    (song) => song.tags.split(", ")[2] + " - " + song.tags.split(", ")[0]
  );
  fs.writeFileSync(
    `${path.join(__dirname)}/song-titles.json`,
    JSON.stringify(songTitles)
  );
  mongoose.disconnect();
};

getSongTitles();
