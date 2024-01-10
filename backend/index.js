import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Formrouter from './routes/formRoute.js';
import PlansRouter from './routes/yourPlansRoute.js';


const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const db_uri = 'mongodb+srv://Neural_Nexus:neuralnexus123@tripplannercluster.hooqmf4.mongodb.net/TripPlanner?retryWrites=true&w=majority';

mongoose.connect(db_uri)
    .then(() => {
        console.log("Mongo db connected.");
    })
    .catch((err) => console.log(err));

app.use('/form', Formrouter);
app.use('/yourPlans',PlansRouter);

app.listen(port, ()=> {
    console.log(`Server listening on port ${port}.`);
})
