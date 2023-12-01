import userRoutes from './server/routes/user.routes.js'
import config from './config/config.js'
import app from './server/express.js'
import authRoutes from './server/routes/auth.routes.js'
import shoproutes from './server/routes/shop.routes.js'

import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)
.then(() => {
    console.log("Connected to the database!");
}).catch((error)=>{
    console.log("Error in connecting to the database",error);
})
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', shoproutes);


app.get("/", (req, res) => {
    res.json({ message: "Welcome to User application." });
});
app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})
