const express = require("express");
const connection = require('./config/db');
const colors = require('colors');
const createServer = require('./utils/server')
const path = require('path');

const port = process.env.PORT || 9090;

const app = createServer();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

//listen to port
app.listen(port, async () => {
  console.log(`Server has started on port: ${port}`);
  console.log(`Go to http://127.0.0.1:${port}/ to view your site.`);
  await connection()
});


