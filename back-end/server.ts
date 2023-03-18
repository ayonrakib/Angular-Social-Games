const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
const routerFile = require('./router');
const db = require('./mariadb');
const port = 3000;

app.use('/', routerFile);

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`);
})