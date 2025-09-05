const express = require('express');
const cors = require('cors');
const prisma = require('./prisma/prismaClient');

const colorRoutes = require('./routes/colorRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const plantRoutes = require('./routes/plantRoutes');
const dataRoutes = require('./routes/dataRoutes');
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

// Conexión a la base de datos
async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Conexión a la base de datos establecida correctamente');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
}
connectToDatabase();

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
});
