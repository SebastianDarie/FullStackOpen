import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry } from '../types';

export const OccupationalHealthcare: React.FC<{ entry: Entry }> = ({
  entry,
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <>
      <Segment>
        <h4>
          <b>{entry.date}</b> <Icon name='stethoscope' size='big' />
        </h4>
        <i>{entry.description}</i>
        <ul>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((code, i) => (
                <li key={i}>
                  {code}{' '}
                  {
                    Object.values(diagnoses).find(
                      (diagnose) => diagnose.code === code
                    )?.name
                  }
                </li>
              ))
            : null}
        </ul>
      </Segment>
    </>
  );
};

export default OccupationalHealthcare;
