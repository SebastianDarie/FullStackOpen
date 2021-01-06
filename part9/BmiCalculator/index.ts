import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);

  if (!height || !weight || height < 0 || weight < 0) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  res.send({ height, weight, bmi });
});

app.get('/exercises', (req, res) => {
  const numArr = (str: string): Array<number> => {
    return str
      .substring(1, str.length - 1)
      .split(',')
      .map((el) => Number(el));
  };

  const targetHr = Number(req.query.target);
  const hours = numArr(req.query.daily_exercises as string);

  if (!targetHr) {
    res.status(400).send({ error: 'parameters missing' });
  }

  const {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  } = calculateExercises(hours, targetHr);

  res.status(200).send({
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  });
});

const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
