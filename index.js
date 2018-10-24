import express from 'express';
import bodyParser from 'body-parser';
import routes from './server/routes/index';


const app = express();

app.use(bodyParser.json());
app.use (bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

app.use((res, req, next) => {
const error = new Error('oops! not found');
error.status = 404;
next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome! create your profile or checkout out developers',
}));

const server = app.listen(process.env.PORT || 3000, () => {
    // eslint-disable-next-line no-console
    console.log(`'Listening on port '${server.address().port}`);
  });
  
  export default app;
  