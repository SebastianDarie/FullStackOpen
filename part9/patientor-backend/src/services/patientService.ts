import patientData from '../../data/patients.json';
import { NonSensitivePatient, Patient } from '../types';
import { toNewPatient } from '../utils';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }): NonSensitivePatient => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addNewPatient = (patient: Omit<Patient, 'id'>): Patient => {
  const newPatient = { ...patient, id: String(patients.length + 1) };
  patients.push(toNewPatient(newPatient));
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addNewPatient,
};
