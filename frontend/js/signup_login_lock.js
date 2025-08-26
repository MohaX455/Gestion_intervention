
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    const closedSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="text-[rgba(255_255_255_/_0.6)] transition-all cursor-pointer duration-200 hover:text-[rgba(255_255_255_/_0.8)]">
      <circle cx="12" cy="16" r="1" />
      <rect x="3" y="10" width="18" height="12" rx="2" />
      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
    </svg>
  `;

    const openSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="text-[rgba(255_255_255_/_0.6)] transition-all duration-200 cursor-pointer hover:text-[rgba(255_255_255_/_0.8)]">
      <rect width="18" height="12" x="3" y="10" rx="2" />
      <path d="M7 10V7a5 5 0 0 1 9.33-2.5" />
      <circle cx="12" cy="16" r="1" />
    </svg>
  `;

    let isVisible = false;
    togglePassword.innerHTML = closedSVG; // état initial

    togglePassword.addEventListener("click", () => {
        isVisible = !isVisible;
        passwordInput.type = isVisible ? "text" : "password";
        togglePassword.innerHTML = isVisible ? openSVG : closedSVG;
    });
})