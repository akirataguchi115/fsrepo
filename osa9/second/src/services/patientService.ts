import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatientEntry, NonSsnPatientEntry, PatientEntry } from '../../types';

const patients: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
	return patients;
};

const getNonSsnEntries = (): NonSsnPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSsnEntries
};