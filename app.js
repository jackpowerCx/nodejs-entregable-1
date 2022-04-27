const express = require('express');

const { repairsRouter } = require('./routers/repairsRouter');
const { usersRouter } = require('./routers/usersRouter');

//utils
const { db } = require('./utils/dataBase');

const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/users/:id', usersRouter);

app.use('/api/v1/repairs', repairsRouter);
app.use('/api/v1/repairs/:id', repairsRouter);


const PORT = 4500;
//connect in the db
db.authenticate().then(() => console.log('connect db ok')).catch(err => console.log(err));
db.sync().then(() => console.log('sync db ok')).catch(err => console.log(err));

//connect in the port 
app.listen(PORT, () => {
    console.log(`connect in the port ${PORT} express runnig ok `);
});