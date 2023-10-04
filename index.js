require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

app.listen(PORT, () => {
console.log(`Our server is listening on ${BASE_URL}:${PORT}`);
});