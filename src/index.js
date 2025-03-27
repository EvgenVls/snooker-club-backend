import express from 'express';
import pino from 'pino-http';

const app = express();

const PORT = 3000;

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello snooker',
  });
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Rote not foand',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
