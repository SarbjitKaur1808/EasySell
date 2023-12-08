import userRoutes from './server/routes/user.routes.js'
import config from './config/config.js'
import app from './server/express.js'
import authRoutes from './server/routes/auth.routes.js'
import mongoose from 'mongoose'
import shopRoutes from './server/routes/shop.routes.js'
import productRoutes from './server/routes/product.routes.js'
import orderRoutes from './server/routes/order.routes.js'
import path from 'path'
import { dirname } from 'path'
import express from 'express'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)
    .then(() => {
        console.log("Connected to the database!");
    }).catch((error) => {
        console.log("Error in connecting to the database", error);
    })
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

// const app = express();
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://js.stripe.com");
    next();
  });
  
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', shopRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  });
  
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to User application." });
// });
app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})
