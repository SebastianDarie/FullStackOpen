import patientData from '../../data/patients';
import { Patient, PublicPatient } from '../types';
import { toNewPatient } from '../utils';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const getPublicPatients = (): Array<PublicPatient> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }): PublicPatient => ({
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
  getPatient,
  getPublicPatients,
  addNewPatient,
};
