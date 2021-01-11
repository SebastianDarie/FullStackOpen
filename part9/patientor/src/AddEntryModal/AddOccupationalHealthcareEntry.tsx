import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Entry } from '../types';

interface AddOccupationalHealthcareEntryProps {
  onSubmit: (values: Entry) => void;
  onCancel: () => void;
}

export const AddOccupationalHealthcareEntry: React.FC<AddOccupationalHealthcareEntryProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        id: '',
        type: 'OccupationalHealthcare',
        date: '',
        description: '',
        specialist: '',
        diagnosisCodes: [],
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Diagnosis description'
              name='description'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Dr.John Doe'
              name='specialist'
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label='Employer Name'
              placeholder='employer'
              name='employerName'
              component={TextField}
            />
            <Field
              label='Sick Leave Start Date'
              placeholder='YYYY-MM-DD'
              name='sickLeave.startDate'
              component={TextField}
            />
            <Field
              label='Sick Leave End Date'
              placeholder='YYYY-MM-DD'
              name='sickLeave.endDate'
              component={TextField}
            />
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
