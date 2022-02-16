export function loginRegister() {
    const loginButton = document.querySelector('#login-button');
    const registerButton = document.querySelector('#registration-button');
    loginButton.addEventListener('click', () => {
        showModal('Login', false);
    })
    registerButton.addEventListener('click', () => {
        showModal('Registration', true);
    })
}

function showModal(modalTitle, register) {
    let body = document.querySelector('body');
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="inner-modal">
            <div class="modal-header">
                <h3 class="modal-title" id="modalTitle">${modalTitle}</h3>
                <button class="close-modal" type="button">
                    <span class="material-icons">close</span>
                </button>
            </div>
            <div class="modal-body"></div>
                <form action="#" method="post" class="submit-form">
                    <div class="form-group">
                        <label for="enter-username" class="username-label">
                            Enter your username:
                        </label>
                        <input type="text" class="form-control" name="username-form" id="enter-username"
                               placeholder="John">
                    </div>
                    <div class="form-group">
                        <label for="enter-password" class="password-label">
                            Enter your password:
                        </label>
                        <input type="password" class="form-control" name="password-form" id="enter-password">
                    </div>
                    <button type="submit" class="submit-button">Submit</button>
                </form>
            </div>`;
    body.appendChild(modal);
    const closeButton = document.querySelector('.close-modal');
    closeButton.addEventListener('click', () => {
        body.removeChild(modal);
    })
}