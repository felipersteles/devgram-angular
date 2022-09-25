
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080; //se n tiver porta ele hospeda no 8080

app.use(express.static(__dirname + '/dist/devgram-angular'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/devgram-angular/index.html');
})

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta ' + PORT);
})

