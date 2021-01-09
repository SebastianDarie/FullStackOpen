import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  patient ? res.send(patient) : res.sendStatus(404);
});

router.post('/', (req, res) => {
  try {
    const newPatient = patientService.addNewPatient(req.body);
    res.json(newPatient);
  } catch (err) {
    res.status(400).send('error' + err.message);
  }
});

export default router;
