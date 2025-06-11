document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('contact-form');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const consulta = document.getElementById('consulta');

    const errorNombre = document.getElementById('error-nombre');
    const errorEmail = document.getElementById('error-email');
    const errorConsulta = document.getElementById('error-consulta');
    const successMessage = document.getElementById('form-success-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        clearErrors();

        let isValid = validateForm();

        if (isValid) {
            sendForm();
        }
    });

    function validateForm() {
        let valid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombre.value.trim() === '') {
            errorNombre.textContent = 'Por favor, ingresa tu nombre.';
            valid = false;
        }

        if (email.value.trim() === '') {
            errorEmail.textContent = 'Por favor, ingresa tu email.';
            valid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            errorEmail.textContent = 'El formato del email no es válido.';
            valid = false;
        }

        if (consulta.value.trim() === '') {
            errorConsulta.textContent = 'Por favor, escribe tu consulta.';
            valid = false;
        }

        return valid;
    }

    function clearErrors() {
        errorNombre.textContent = '';
        errorEmail.textContent = '';
        errorConsulta.textContent = '';
        successMessage.textContent = '';
    }

    async function sendForm() {
        const formData = new FormData(form);
        const button = form.querySelector('button');

        try {
            button.disabled = true;
            button.textContent = 'Enviando...';

            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                successMessage.textContent = '¡Gracias por tu consulta! Te responderemos pronto.';
                form.reset();
            } else {
                const data = await response.json();
                errorConsulta.textContent = data.errors ? data.errors.map(err => err.message).join(', ') : 'Hubo un error al enviar el formulario.';
            }

        } catch (error) {
            console.error('Error al enviar formulario:', error);
            errorConsulta.textContent = 'No se pudo enviar el formulario. Intenta de nuevo más tarde.';
        } finally {
            button.disabled = false;
            button.textContent = 'Enviar Consulta';
        }
    }
});
