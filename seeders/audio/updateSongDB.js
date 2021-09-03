require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

const mongoose = require("mongoose");
const { Song } = require("../../models");

const songTitles = require("./song-titles.json");

const main = async () => {
  await songTitles
    // .map((title) => (/\(feat./i.test(title) ? title.split("(feat")[0] : title))
    .forEach(async (title, index) => {
      try {
        titleClean = /\(feat./i.test(title) ? title.split("(feat") : title;

        console.log(titleClean.split(" - ")[1]);

        const song = await Song.findOneAndUpdate(
          {
            tags: {
              $regex: new RegExp(titleClean.split(" - ")[1]),
              $options: "i",
            },
          },
          {
            audio: `https://musicon-song-dumps.s3.ap-southeast-1.amazonaws.com/${title
              .split(" ")
              .join("+")}.mp3`,
          },
          { new: true }
        );

        console.log(song);

        // console.log(`Done updating ${index + 1} songs.`);
      } catch (error) {
        console.error(error);
      }
    });
  mongoose.disconnect();
};

main();
