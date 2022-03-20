const express = require('express');
const app = express();
const tasks = require('./routes/tasks_routes.js');
const connectDB = require('./db/db_connection');

require('dotenv').config();

const port = 3000;

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasks);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server running on port ${port}...`)
        });
    }
    catch (error) {
        console.log(error);
    }
}

start()