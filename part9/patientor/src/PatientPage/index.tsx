import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Icon } from 'semantic-ui-react';
import { setPatient, useStateValue } from '../state';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

export const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      if (patient.id !== id) {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          dispatch(setPatient(patient));
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [dispatch]);

  const maleIcon = <Icon name='mars' />;
  const femaleIcon = <Icon name='venus' />;
  const otherIcon = <Icon name='genderless' />;
  return (
    <div>
      <Container textAlign='left'>
        <h2>
          {patient.name}{' '}
          {patient.gender === 'male'
            ? maleIcon
            : patient.gender === 'female'
            ? femaleIcon
            : otherIcon}
        </h2>
        <div>
          ssn: {patient.ssn} <br />
          occupation: {patient.occupation}
        </div>

        <h4>entries</h4>
      </Container>
    </div>
  );
};

export default PatientPage;
