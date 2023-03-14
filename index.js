
const express = require('express');
const app = express();

// This variable defines the port of your computer where the API will be available
const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
    // The string we want to display on http://localhost:3000
    response.send('Welcome on the annotations API! Hello Wold ! ');
});

app.listen(PORT, () =>{
  console.log(`The Annotations API is running on: http://localhost:${PORT}.`);
});

