import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { EntryFormValues } from '../types';
import { AddHealthCheckForm } from './AddHealthCheckForm';
import { AddHospitalForm } from './AddHospitalForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  type: string;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  type,
}: Props) => {
  if (type === 'HealthCheck') {
    return (
      <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new HealthCheck entry</Modal.Header>
        <Modal.Content>
          {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
          <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
      </Modal>
    );
  } else if (type === 'Hospital') {
    return (
      <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new Hospital entry</Modal.Header>
        <Modal.Content>
          {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
          <AddHospitalForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
      </Modal>
    );
  } else if (type === 'Occupational Healthcare') {
    return (
      <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new Occupational Healthcare entry</Modal.Header>
        <Modal.Content>
          {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
          {/* < onSubmit={onSubmit} onCancel={onClose} /> */}
        </Modal.Content>
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default AddEntryModal;
