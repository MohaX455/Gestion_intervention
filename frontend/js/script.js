
document.addEventListener('DOMContentLoaded', async () => {

    try {
        const res = await fetch('http://127.0.0.1:3000/admin/dashboard', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await res.json();

        if (!res.ok) {
            window.location.href = './pages/login.html';
            console.log("Dashboard data:", data);
            return;
        }

        const toggleBtn = document.getElementById('toggleBtn');
        toggleBtn.addEventListener('click', () => {
            alert('Toggle sidebar functionality not implemented yet.');
        });

        const logout = document.querySelector('#logout')
        
        logout.addEventListener('click', async (e) => {
            e.preventDefault()
            try {
                const res = await fetch('http://127.0.0.1:3000/admin/auth/logout', {
                    method: 'POST',
                    credentials: 'include'
                })

                if (!res.ok) {
                    alert('erreur du fetch')
                    return
                }

                window.location.href = './pages/login.html'

            } catch(err) {
                console.error('Error lors du logout :', err)
            }
        })

    } catch (err) {
        console.error(err);
        window.location.href = './pages/login.html';
    }

});