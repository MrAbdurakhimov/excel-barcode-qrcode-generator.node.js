require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const main = async () => {
  app.use('/', require('./routes/'));
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  });
};

main().catch((err) => console.log(err));
