require('dotenv').config();
const app = require('./app');
const connectDB = require('./utils/db');

const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
