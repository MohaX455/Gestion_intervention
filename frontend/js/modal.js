document.addEventListener('DOMContentLoaded', () => {

    const modal = document.querySelector('#my_modal')
    const modalContent = document.querySelector('#modal_content')
    const openModalBtn = document.querySelector('#openModalBtn')
    const closeModalBtn = document.querySelector('#closeModalBtn')

    function openModal() {
        modal.classList.replace("hidden", 'flex');
        setTimeout(() => {
            modalContent.classList.remove("scale-95", "opacity-0");
            modalContent.classList.add("scale-100", "opacity-100");
            modal.classList.remove("opacity-0");
            modal.classList.add('opacity-100')
        }, 10);
    }

    openModalBtn.addEventListener('click', () => {
        openModal()
    })

    function closeModal() {
        modalContent.classList.remove("scale-100", "opacity-100");
        modalContent.classList.add("scale-95", "opacity-0");
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 300); // attendre la fin de l'animation
    }

    closeModalBtn.addEventListener('click', () => {
        closeModal()
    })

    // Fermer si on clique sur l’overlay
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    })

})