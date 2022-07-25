require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3065;

app.listen(PORT, () => {
  console.log('서버 시작');
});
