import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Container, Icon } from 'semantic-ui-react';
import { addEntry, setPatient, useStateValue } from '../state';
import { Entry, EntryFormValues, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import EntryDetails from '../EntryDetails/EntryDetails';
import AddEntryModal from '../AddEntryModal';

export const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>('');
  const [type, setType] = useState<string>('');

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitHandler = async (values: EntryFormValues) => {
    console.log('start submit block');
    try {
      const { data: newEntries } = await axios.post<Array<Entry>>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );

      dispatch(addEntry(newEntries));
      closeModal();
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.error);
    }
  };

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

        <h3>entries</h3>
        {patient.entries &&
          patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}

        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitHandler}
          onClose={closeModal}
          error={error}
          type={type}
        />
        <Button
          onClick={() => {
            setType('HealthCheck');
            openModal();
          }}
        >
          Add new HealthCheck entry
        </Button>
        <Button
          onClick={() => {
            setType('Hospital');
            openModal();
          }}
        >
          Add new Hospital entry
        </Button>
        <Button
          onClick={() => {
            setType('Occupational Healthcare');
            openModal();
          }}
        >
          Add new Occupational Healthcare entry
        </Button>
      </Container>
    </div>
  );
};

export default PatientPage;
