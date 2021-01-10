import patientData from '../../data/patients';
import { Entry, Patient, PublicPatient } from '../types';
import { toNewEntry, toNewPatient } from '../utils';

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

const addNewPatientEntry = (
  id: string,
  entry: Entry
): Array<Entry> | undefined => {
  const patient = patients.find((el) => el.id === id);
  if (patient) {
    if (!patient.entries) {
      patient.entries = [];
    }

    if (!entry.id) {
      entry.id = String(patient.entries.length + 1);
    }

    patient.entries.push(toNewEntry(entry));
    return patient.entries;
  }
  return undefined;
};

export default {
  getPatients,
  getPatient,
  getPublicPatients,
  addNewPatient,
  addNewPatientEntry,
};
