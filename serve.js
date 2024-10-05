const express = require('express');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// Leer nombres desde el archivo Excel
app.get('/api/names', (req, res) => {
    const workbook = xlsx.readFile('nombres.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const names = data.map(row => row.Nombre);
    res.json({ names });
});

// Confirmar invitados y actualizar el archivo Excel
app.post('/api/confirm', (req, res) => {
    const { name, guests } = req.body;

    const workbook = xlsx.readFile('nombres.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const row = data.find(row => row.Nombre === name);
    if (row) {
        row.Invitados = guests;
    }

    const updatedSheet = xlsx.utils.json_to_sheet(data);
    workbook.Sheets[workbook.SheetNames[0]] = updatedSheet;
    xlsx.writeFile(workbook, 'nombres.xlsx');

    res.json({ message: 'Confirmación guardada' });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});