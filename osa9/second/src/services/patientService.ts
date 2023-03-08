import patientData from '../../data/patients';

import { NonSsnPatientEntry, PatientEntry } from '../../types';

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

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose,
  getNonSsnEntries
};