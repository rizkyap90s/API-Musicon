require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

const { Song } = require("../../models");

const songTitles = require("./song-titles.json");

const updateSongs = async () => {
  songTitles
    // .map((title) => (/\(feat./i.test(title) ? title.split("(feat")[0] : title))
    .forEach(async (title, index) => {
      try {
        const titleClean = /\(feat./i.test(title)
          ? title.split("(feat")[0]
          : title;

        const song = await Song.findOneAndUpdate(
          {
            songTitle: {
              $regex: new RegExp(titleClean.split(" - ")[1]),
              $options: "i",
            },
          },
          {
            audio: `https://musicon-songs.s3.ap-southeast-1.amazonaws.com/${title
              .split(" ")
              .join("+")}.mp3`,
          },
          { new: true }
        );

        console.log(`Done updating ${index + 1} songs.`);
      } catch (error) {
        console.error(error);
      }
    });
};

updateSongs();
