const express = require('express');
const cors = require('cors');
const prisma = require('./prisma/prismaClient');

const colorRoutes = require('./routes/colorRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const plantRoutes = require('./routes/plantRoutes');
const dataRoutes = require('./routes/dataRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const insulatorRoutes = require('./routes/insulatorRoutes');
const gaugeRoutes = require('./routes/gaugeRoutes');
const app = express();
const PORT = process.env.PORT || 5024;

app.use(cors());

//Middleware to parse JSON
app.use(express.json());

//Register routes
app.use('/colors', colorRoutes);
app.use('/sections', sectionRoutes);
app.use('/plants', plantRoutes);
app.use('/data', dataRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/insulators', insulatorRoutes);
app.use('/gauge', gaugeRoutes);

// Database connection
async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully');
  } catch (err) {
    console.error('Error in trying to connect to the database:', err);
  }
}
connectToDatabase();

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
});
