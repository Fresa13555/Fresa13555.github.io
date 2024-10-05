// Redirige a la página de confirmación de asistencia
document.getElementById('confirmButton').addEventListener('click', function() {
    window.location.href = 'confirmacion.html';
});

// Lógica para manejar la selección de nombres y número de invitados
if (window.location.pathname.includes('confirmacion.html')) {
    const nameSelect = document.getElementById('nameSelect');
    const guestSection = document.getElementById('guestSection');
    const guestCountInput = document.getElementById('guestCount');
    const guestMessage = document.getElementById('guestMessage');
    const confirmGuestsButton = document.getElementById('confirmGuests');

    // Llama a la API para obtener los nombres desde el archivo Excel
    fetch('/api/names')
        .then(response => response.json())
        .then(data => {
            data.names.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.text = name;
                nameSelect.appendChild(option);
            });
        });

    // Mostrar la sección de invitados cuando se selecciona un nombre
    nameSelect.addEventListener('change', function() {
        guestSection.classList.remove('hidden');
    });

    // Confirmar el número de invitados
    confirmGuestsButton.addEventListener('click', function() {
        const guestCount = guestCountInput.value;
        const name = nameSelect.value;

        if (guestCount > 0) {
            // Enviar los datos al servidor para guardarlos en el archivo Excel
            fetch('/api/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    guests: guestCount
                })
            }).then(response => {
                guestMessage.innerText = `${name} ha confirmado ${guestCount} invitados.`;
            });
        } else {
            guestMessage.innerText = `Por favor selecciona el número correcto de invitados.`;
        }
    });
}