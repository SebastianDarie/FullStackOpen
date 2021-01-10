import React from 'react';
import HealthCheck from '../components/HealthCheck';
import Hospital from '../components/Hospital';
import OccupationalHealthcare from '../components/OccupationalHealthcare';
import { Entry } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;

    case 'Hospital':
      return <Hospital entry={entry} />;

    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;

    default:
      assertNever(entry);
  }

  return null;
};

export default EntryDetails;
