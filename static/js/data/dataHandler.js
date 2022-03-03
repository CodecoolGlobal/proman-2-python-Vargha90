export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function () {
        return await apiGet("/api/statuses");
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        return await apiPost("/api/boards/new_board", {
        title: boardTitle
    })
        // creates new board, saves it and calls the callback function with its data
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        return await apiPost(`/api/boards/${boardId}/cards/new-card`,{
            statusId: statusId,
            cardTitle: cardTitle
        } )
        // creates new card, saves it and calls the callback function with its data
    },
    login: async function (loginData) {
        return await  apiPost("/api/login", loginData)
    },
    register: async function (registerData) {
        return await apiPost("/api/register", registerData)
    },
    logout: async function () {
        return await apiGet("/api/logout")
    },
    getLoggedStatus: async function () {
        return await apiGet("/api/logged")
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        return await response.json()
    }
}

async function apiDelete(url) {
    let response = await fetch(url, {
        method: "DELETE",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPut(url) {
    let response = await fetch(url, {
        method: "PUT",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPatch(url) {
    let response = await fetch(url, {
        method: "PATCH",
    });
    if (response.ok) {
        return await response.json();
    }
}
