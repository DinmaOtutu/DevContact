import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use (bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((res, req, next) => {
const error = new Error('oops! not found');
error.status = 404;
next(err);
});

const server = app.listen(process.env.PORT || 3000, () => {
    // eslint-disable-next-line no-console
    console.log(`'Listening on port '${server.address().port}`);
  });
  
  export default app;
  