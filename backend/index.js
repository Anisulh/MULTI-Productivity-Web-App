const connection = require('./config/db');
const colors = require('colors');
const createServer = require('./utils/server')
const port = process.env.PORT || 9090;

const app = createServer();

//listen to port
app.listen(port, async() => {
  console.log(`Server has started on port: ${port}`);
  console.log(`Go to http://127.0.0.1:${port}/ to view your site.`);
  await connection()
});


