## Order of the execution:

1. getSongs.js - Query the MongoDB songs collection and retrieve all song titles.
2. doItYourself.js - Search the song titles on youtube and download the mp3 files, saved in output directory.
3. doItYourself.js - Upload the mp3 files in the output directory to AWS S3 storage.
4. updateSongDB.js - Finally, update the audio field in the song collection database with AWS links.
