export interface DiagnoseEntry {
	code: string;
	name: string;
	latin?: string;
}

export interface PatientEntry {
	id: string;
	name: string;
	dateOfBirth: string;
	gender: string;
	occupation: string;
}

export type NonSsnPatientEntry = Omit<PatientEntry, 'ssn'>;