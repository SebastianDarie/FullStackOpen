import { Entry, Gender, HealthCheckRating, Patient } from './types';

const isString = (param: any): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
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

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Missing or incorrect description ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Missing or incorrect specialist ' + specialist);
  }
  return specialist;
};

const parseDiagnosis = (diagnoses: Array<any>): Array<string> => {
  if (!(diagnoses.length > 0) && !diagnoses.every((el) => isString(el))) {
    throw new Error('Incorrect codes ' + diagnoses);
  }
  return diagnoses;
};

const parseDischarge = (discharge: any): { date: string; criteria: string } => {
  if (
    !discharge ||
    !isDate(discharge.date) ||
    !isString(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    throw new Error(
      'Missing or incorrect properities for discharge ' +
        discharge.date +
        '' +
        discharge.criteria
    );
  }
  return discharge;
};

const parseRating = (rating: any): HealthCheckRating => {
  if ((!rating && rating !== 0) || !isRating(rating)) {
    throw new Error('Missing or incorrect rating ' + rating);
  }
  return rating;
};

const parseSickLeave = (
  sickLeave: any
): { startDate: string; endDate: string } => {
  if (
    !sickLeave ||
    !isDate(sickLeave.startDate) ||
    !isString(sickLeave.startDate) ||
    !isDate(sickLeave.endDate) ||
    !isString(sickLeave.endDate)
  ) {
    throw new Error(
      'Missing or incorrect properties for sickleave ' +
        sickLeave.startDate +
        '' +
        sickLeave.endDate
    );
  }
  return sickLeave;
};

export const toNewPatient = (object: any): Patient => {
  return {
    id: parseId(object.id),
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
};

export const toNewEntry = (object: any): Entry => {
  const newEntry = {
    type: object.type,
    id: parseId(object.id),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: object.diagnosisCodes
      ? parseDiagnosis(object.diagnosisCodes)
      : undefined,
  };

  switch (object.type) {
    case 'HealthCheck':
      const healthCheckEntry = {
        ...newEntry,
        healthCheckRating: parseRating(object.healthCheckRating),
      };
      return healthCheckEntry;

    case 'Hospital':
      const hospitalEntry = {
        ...newEntry,
        discharge: parseDischarge(object.discharge),
      };
      return hospitalEntry;

    case 'OccupationalHealthcare':
      const occupationalHealthcareEntry = {
        ...newEntry,
        employerName: parseName(object.employerName),
        sickLeave: object.sickLeave
          ? parseSickLeave(object.sickLeave)
          : undefined,
      };
      return occupationalHealthcareEntry;

    default:
      throw new Error('Incorrect Entry Type');
  }
};
