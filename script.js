document.addEventListener('DOMContentLoaded', function () {
    cargarInvitados();
});

// Función para cargar los nombres desde el Excel
function cargarInvitados() {
    fetch('invitados.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            var workbook = XLSX.read(data, {type: 'array'});
            var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            var invitadoData = XLSX.utils.sheet_to_json(firstSheet);

            var select = document.getElementById('Nombre');
            invitadoData.forEach(invitado => {
                var option = document.createElement('option');
                option.text = invitado.Nombre;
                option.value = invitado.Nombre;
                select.add(option);
            });
        });
}

// Función para confirmar asistencia
function confirmarAsistencia() {
    var nombre = document.getElementById('invitado').value;
    // Aquí puedes hacer una lógica adicional para guardar la asistencia en el Excel
    alert('Asistencia confirmada para ' + nombre);
}
