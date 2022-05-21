const { handleUpload } = require('../controllers/upload.controller');
const { readXlsx } = require('../utils/read_xlsx');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.post('/upload', handleUpload, async (req, res) => {
  const data = await readXlsx(req.fileData.data.name);
  res.json(data);
});

module.exports = router;
