const express = require('express');
const cors = require('cors');
const prisma = require('./prisma/prismaClient');
const path = require('path');

const colorRoutes = require('./routes/colorRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const plantRoutes = require('./routes/plantRoutes');
const dataRoutes = require('./routes/dataRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const insulatorRoutes = require('./routes/insulatorRoutes');
const gaugeRoutes = require('./routes/gaugeRoutes');
const playerRoutes = require('./routes/playerRoutes');
const responseRoutes = require('./routes/responsesRoutes');
const gameRoutes = require('./routes/gameRoutes');
const grpRoutes = require('./routes/grpRoutes');
const app = express();
const PORT = process.env.PORT || 5024;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5025',
  'http://127.0.0.1:5173',
  'http://172.30.121.136:5173',
  'http://172.30.58.136:5173',
  'http://172.30.58.136:5025',
  'http://172.30.190.47:5025',
  'http://172.30.121.136:5025',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // permitir herramientas como Postman
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Origin not allowed'));
  },
  credentials: true
}));

// Servir archivos estáticos (uploads)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

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
app.use('/players', playerRoutes);
app.use('/responses', responseRoutes);
app.use('/games', gameRoutes);
app.use('/grps', grpRoutes);

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
