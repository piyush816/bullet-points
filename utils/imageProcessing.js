const sharp = require("sharp");

module.exports = async (req, id) => {
  const filename = `${id}.png`;
  // resizing file and saving it
  await sharp(req.file.buffer)
    .resize({ width: 180, height: 250 })
    .toFile("./uploads/posters/" + filename);

  return filename;
};
