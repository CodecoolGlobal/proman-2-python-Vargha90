export const htmlTemplates = {
    board: 1,
    card: 2
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    return `
        <section class="board" id=board_${board.id} data-board-id=${board.id}>
        <div class="board-header"><span class="board-title">${board.title}</span>
        <button class="board-add">Add Card</button>
        <button class="board-toggle closed" id=button_${board.id} data-board-id="${board.id}"><i class="fas fa-chevron-down"></i></button>
        </div>
        </section>
        `;
}


function cardBuilder(card) {
    return`<div class="card" data-card-id="${card.id}">${card.title}</div>`;

}

