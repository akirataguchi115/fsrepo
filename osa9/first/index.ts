import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});