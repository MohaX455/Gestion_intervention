
document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#form')

    form.addEventListener('submit', async (e) => {

        e.preventDefault()

        const name = document.querySelector('#name').value
        const password = document.querySelector('#password').value
        const message = document.querySelector('#message')

        console.log(name, password, message)

        try { 
            const res = await fetch('http://127.0.0.1:3000/admin/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    password
                })
            })
            
            const data = await res.json()

            if (!res.ok) {
                message.classList.remove('hidden')
                message.classList.add('text-red-400 tracking')
                message.textContent = data.message
                return
            }

            message.classList.remove('hidden')
            message.classList.add('text-green-400')
            message.textContent = data.message
            setTimeout(() => {
                window.location.href = '../index.html'
            }, 700)

        } catch (err) {
            console.log("error: ", err)
            message.textContent = "Erreur réseau";
        }

    })

})