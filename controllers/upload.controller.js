const handleUpload = async (req, res) => {
  console.log(req.files);
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let excelFile = req.files.excel;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      excelFile.mv('./uploads/' + excelFile.name);

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: excelFile.name,
          mimetype: excelFile.mimetype,
          size: excelFile.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  handleUpload,
};
