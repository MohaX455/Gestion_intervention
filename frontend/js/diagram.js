
document.addEventListener('DOMContentLoaded', () => {
    // Graphique Doughnut
    const ctx = document.getElementById('interventionChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Terminées', 'En cours', 'En attente'],
            datasets: [{
                label: 'Interventions',
                data: [12, 5, 3],
                backgroundColor: ['#34d399', '#facc15', '#f87171'],
                borderWidth: 1
            }]
        }
    });

    // Graphique Barres
    new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
            datasets: [{
                label: "Nombre d'interventions",
                data: [5, 7, 6, 9, 4, 8],
                backgroundColor: "#3b82f6"
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });
})