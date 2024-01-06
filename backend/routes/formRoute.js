import formController from '../controllers/formController.js';
import { Router } from 'express';

const Formrouter = Router();
// Formrouter.get('/', (req, res) => {
//     res.send('<h1>Form</h1>');
// }
// )
// Formrouter.get('/');
Formrouter.post('/', formController.submitForm);

export default Formrouter;


