document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#form')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const username = document.querySelector('#name')
        const email = document.querySelector('#email')
        const password = document.querySelector('#password')
        const selectedRole = document.querySelector('input[name="role"]:checked')
        const modal = document.querySelector('#my_modal')
        const modalContent = document.querySelector('#modal_content')
        console.log(username, email, password, selectedRole)

        const formData = {
            name: username.value,
            email: email.value,
            password: password.value,
            role: selectedRole.value
        }

        try {
            const res = await fetch('http://127.0.0.1:3000/users/auth/register', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                console.error('Error', data.message);
                alert('Erreur du fetch');
                return;
            }

            // Fermer le modal avec animation
            modalContent.classList.remove("scale-100", "opacity-100");
            modalContent.classList.add("scale-95", "opacity-0");

            // Cleanage des champs
            username.value = '';
            email.value = '';
            password.value = '';
            const radios = document.querySelectorAll('input[name="role"]');
            radios.forEach(radio => radio.checked = false);

            setTimeout(() => {
                modal.classList.add("hidden");
            }, 300);

            // alert('Ajout de l\'utilisateur reussit !')

        } catch (err) {
            console.error('Network error !');
        }


    })
})
