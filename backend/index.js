import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Formrouter from './routes/formRoute.js';


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const db_uri = 'mongodb+srv://Neural_Nexus:neuralnexus123@tripplannercluster.hooqmf4.mongodb.net/TripPlanner?retryWrites=true&w=majority';

mongoose.connect(db_uri)
    .then(() => {
        app.listen(port, ()=> {
            console.log(`Server listening on port ${port}.`);
        })
    })
    .catch((err) => console.log(err));

app.use('/api/form', Formrouter);


