import { State } from './state';
import { Diagnosis, Entry, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'SET_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | { type: 'SET_DIAGNOSIS_LIST'; payload: Array<Diagnosis> }
  | { type: 'ADD_ENTRY'; payload: Array<Entry> };

export const setPatientList = (patientList: Array<Patient>): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList,
  };
};

export const setPatient = (currPatient: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: currPatient,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: newPatient,
  };
};

export const setDiagnosisList = (list: Array<Diagnosis>): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: list,
  };
};

export const addEntry = (newEntries: Array<Entry>): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: newEntries,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'SET_PATIENT':
      return {
        ...state,
        patient: action.payload,
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
        },
        ...state.diagnoses,
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        patient: {
          ...state.patient,
          entries: action.payload,
        },
      };
    default:
      return state;
  }
};
