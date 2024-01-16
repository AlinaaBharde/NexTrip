import  express  from "express";
import bodyParser from "body-parser";
import  { dirname, join } from 'path';
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const db_url = 'mongodb://127.0.0.1:27017/mongo_test' ;

try {
    await mongoose.connect(db_url);
  } catch (error) {
    handleError(error);
}


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static(join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port,() => {
    console.log(`Server on port ${port}`);
});