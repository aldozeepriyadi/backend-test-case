import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { swaggerDocs } from './swagger'; // Import Swagger documentation
import bookRoutes from './routes/bookRoutes'; // Import bookRoutes
import memberRoutes from './routes/memberRoutes'; // Import memberRoutes

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/library')
  .then(() => console.log('Koneksi ke MongoDB berhasil'))
  .catch((error) => console.error('Koneksi ke MongoDB gagal:', error));

// Menggunakan Routes
app.use('/api', bookRoutes); // Menghubungkan bookRoutes ke '/api' prefix
app.use('/api', memberRoutes); // Menghubungkan memberRoutes ke '/api' prefix

// Integrasi Swagger
swaggerDocs(app);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
  console.log(`Swagger Docs tersedia di http://localhost:${port}/api-docs`);
});
