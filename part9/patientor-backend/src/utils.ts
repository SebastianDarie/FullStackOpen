import { Gender, Patient } from './types';

const isString = (param: any): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseId = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error('Missing or incorrect id ' + id);
  }
  return id;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Missing or incorrect name ' + name);
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Missing or incorrect date ' + date);
  }
  return date;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Missing or incorrect ssn ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: any): string => {
  if (!gender || !isGender(gender)) {
    throw new Error('Missing or incorrect gender ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Missing or incorrect occupation ' + occupation);
  }
  return occupation;
};

export const toNewPatient = (object: any): Patient => {
  return {
    id: parseId(object.id),
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: object.entries,
  };
};
