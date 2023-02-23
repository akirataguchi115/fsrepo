import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = req.query.weight;
		const height = req.query.height;
    if (typeof weight == "string" && typeof height == "string") {
      if (!isNaN(parseInt(height)) && !isNaN(parseInt(weight))) {
        const response = {  
          weight: weight,
          height: height,
          bmi: calculateBmi(parseInt(height), parseInt(weight))
        };
        res.send(response);
      } else {
        res.send({ error: "malformatted parameters"});
      }
    } else {
      res.send({ error: "malformatted parameters"});
    }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const target = req.body.target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const daily_exercises = req.body.daily_exercises as number[];
  for (const value of daily_exercises) {
    if (isNaN(Number(value))) {
      return res.send({ error: "malformatted parameters "});
    }
  }
  if (isNaN(Number(target))) {
    return res.send({ error: "malformatted parameters" });
  } else if (!daily_exercises || !target) {
    return res.send({ error: "parameters missing" });
  }
  const response = calculateExercises(daily_exercises, Number(target));
  return res.send(response);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});