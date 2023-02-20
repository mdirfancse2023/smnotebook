const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;
app.use(cors())
app.use(express.json());

app.use('/auth',require('./routes/auth'));
app.use('/note',require('./routes/note'))

app.listen(port, () => {
  console.log(`iNoteBook listening on port ${port}`)
})