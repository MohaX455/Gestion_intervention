
document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#form')

    form.addEventListener('submit', async (e) => {

        const name = document.querySelector('#name').value.trim()
        const email = document.querySelector('#email').value.trim()
        const password = document.querySelector('#password').value.trim()
        const message = document.querySelector('#message')
        message.textContent = "";

        e.preventDefault()

        try {
            const res = await fetch('http://127.0.0.1:3000/admin/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role: 'admin'
                })
            })

            const data = await res.json()

            if (!res.ok) {
                message.classList.remove('hidden')
                message.classList.add('text-red-400')
                message.textContent = data.message
                return
            }

            message.classList.remove('hidden')
            message.classList.add('text-green-400')
            message.textContent = data.message
            setTimeout(() => {
                window.location.href = '../pages/login.html'
            }, 1000)

        } catch (err) {
            console.log("error: ", err)
            message.textContent = "Erreur réseau";
        }

    })


})