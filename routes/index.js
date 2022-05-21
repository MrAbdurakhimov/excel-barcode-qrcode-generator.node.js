const fs = require('fs');
const { handleUpload } = require('../controllers/upload.controller');
const { readXlsx } = require('../utils/read_xlsx');
const { generateBarCode } = require('../utils/generateBarCode');
const { zipDirectory } = require('../utils/archive');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.post('/upload', handleUpload, async (req, res) => {
  const data = await readXlsx(req.fileData.data.name);
  const date = new Date().valueOf().toString();
  for (let id of data) {
    const barcode = await generateBarCode(id);
    const fileName = `${id}.png`;
    fs.mkdirSync(`${__dirname}/../results/` + date, { recursive: true });
    fs.writeFileSync(`${__dirname}/../results/${date}/${fileName}`, barcode); // write file
  }
  await zipDirectory(
    `${__dirname}/../results/` + date,
    `${__dirname}/../public/${date}.zip`
  );
  res.redirect('/' + date + '.zip');
});

module.exports = router;
