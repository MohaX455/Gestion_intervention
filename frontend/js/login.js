
document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#form')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const name = document.querySelector('#name')
        const password = document.querySelector('#password')
        const message = document.querySelector('#message')
        message.textContent = "";

        const formData = {
            name: name.value.trim(),
            password: password.value.trim()
        }

        try {
            const res = await fetch('http://127.0.0.1:3000/admin/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                message.classList.remove('hidden')
                message.classList.add('text-red-400 tracking-wide')
                message.textContent = data.message
                return
            }

            message.classList.remove('hidden')
            message.classList.add('text-green-400')
            message.textContent = data.message
            setTimeout(async () => {
                // après login, récupérer le rôle
                const roleRes = await fetch('http://127.0.0.1:3000/dashboard/me', {
                    method: 'GET',
                    credentials: 'include'
                })
                const userData = await roleRes.json()
                const role = userData.user.role
                if (role === 'admin') window.location.href = './admin/admin.html'
                else if (role === 'technician') window.location.href = './technician/technician.html'
                else if (role === 'secretary') window.location.href = './secretary/secretary.html'
            }, 700)

        } catch (err) {
            console.log("error: ", err)
            message.textContent = "Erreur réseau";
        }

    })

})