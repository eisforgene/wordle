const PORT = 8000;
const axios = require("axios").default;
const express = require('express');

const app = express();

app.get('/word', (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: { count: '5', wordLength: '5' },
        headers: {
            'x-rapidapi-host': 'random-words5.p.rapidapi.com',
            'x-rapidapi-key': 'a318ce666bmshdee7acb7e7df220p1c5d4ajsn8081c8b3639b'
        }
    }

    axios.request(options).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    })
})


app.listen(PORT, () => console.log('Server running on port ' + PORT))

