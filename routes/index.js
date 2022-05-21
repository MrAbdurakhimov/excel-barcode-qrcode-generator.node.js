const { handleUpload } = require('../controllers/upload.controller');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.post('/upload', handleUpload);

module.exports = router;
