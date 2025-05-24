document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (!form || !formMessage) {
        console.error('No se encontró el formulario o el elemento de mensaje');
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validación básica del formulario
        const firstName = form.querySelector('[name="first-name"]')?.value?.trim();
        const lastName = form.querySelector('[name="last-name"]')?.value?.trim();
        const email = form.querySelector('[name="email"]')?.value?.trim();
        const phone = form.querySelector('[name="phone"]')?.value?.trim();
        const message = form.querySelector('[name="message"]')?.value?.trim();

        if (!firstName || !lastName || !email || !phone || !message) {
            formMessage.innerHTML = '<div class="alert alert-danger">Por favor, complete todos los campos requeridos.</div>';
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.innerHTML = '<div class="alert alert-danger">Por favor, ingrese un email válido.</div>';
            return;
        }

        // Mostrar mensaje de carga
        formMessage.style.display = 'block';
        formMessage.innerHTML = '<div class="alert alert-info">Enviando mensaje...</div>';

        try {
            // Log de datos antes de enviar
            console.log('Enviando datos al servidor:', {
                'first-name': firstName,
                'last-name': lastName,
                'email': email,
                'phone': phone,
                'message': message
            });

            // Enviar datos al servidor de Node.js
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'first-name': firstName,
                    'last-name': lastName,
                    'email': email,
                    'phone': phone,
                    'message': message
                })
            });

            console.log('Respuesta del servidor:', response.status);

            const result = await response.json();

            if (result.success) {
                // Mostrar mensaje de éxito
                formMessage.innerHTML = '<div class="alert alert-success">¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.</div>';
                form.reset(); // Limpiar formulario
            } else {
                throw new Error(result.message || 'Error al enviar el mensaje');
            }
        } catch (error) {
            // Mostrar mensaje de error
            formMessage.innerHTML = '<div class="alert alert-danger">Lo sentimos, hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.</div>';
            console.error('Error:', error);
        }
    });
});