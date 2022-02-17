import {dataHandler} from "../data/dataHandler.js";

export function loginRegister() {
    const loginButton = document.querySelector('#login-button');
    const registerButton = document.querySelector('#registration-button');
    loginButton.addEventListener('click', () => {
        showModal('Login', false, 'loginModal', 'loginModalTitle');
    })
    registerButton.addEventListener('click', () => {
        showModal('Registration', true, 'registerModal', 'registerModalTitle');
    })
}

function showModal(modalTitle, register, modalBoard, title) {
    let body = document.querySelector('body');
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.setAttribute("id", modalBoard);
    modal.setAttribute("tabIndex", "-1");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-labelledby", title);
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id=${title}>${modalTitle}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeIcon">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
<!--                    <form action="/api/login" method="post">-->
                        <div class="modal-body">
                            <label for="username">Username:</label>
                            <input id="username" type="text" minLength="1" placeholder="John" name="username-field"><br>
                            <label for="password">Password:</label>
                            <input id="password" type="password" name="password-field">
                        </div>
                        <div class="modal-footer">
                            <button id="closeButton" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="submitButton" data-dismiss="modal">Submit</button>
                        </div>
<!--                    </form>-->
                </div>
            </div>`;
    body.appendChild(modal);
    const closeIcon = document.querySelector('#closeIcon');
    const closeButton = document.querySelector('#closeButton');
    const submitButton = document.querySelector('#submitButton')
    closeIcon.addEventListener('click', () => {
        body.removeChild(modal);
    })
    closeButton.addEventListener('click', () => {
        body.removeChild(modal);
    })
    submitButton.addEventListener('click', () => {
        if (register === false) {
            loginUser();
        } else {
            registerUser();
        }
        body.removeChild(modal);
    })
}

async function loginUser() {
    let data = {
        'username': document.querySelector('#username').value,
        'password': document.querySelector('#password').value
    }
    await dataHandler.login(data);
}

async function registerUser() {
    let data = {
        'username': document.querySelector('#username').value,
        'password': document.querySelector('#password').value
    }
    await dataHandler.register(data);
}