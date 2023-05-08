export const Game = () => {
    return `<form class="container" action="game.html" id="join-to-board">
        <h1>Меню</h1>
        <h2 id="user-email"></h2>
        <a class="gray-button" href="game.html" id="create-board">Новая игра</a>
        <input placeholder="Код комнаты" id="url-to-board-input">
        <input class="gray-button" type="submit" value="Присоединиться">
    </form>`;
}

export const GameHeader = () => {
    return `<a class="orange-button" href="../menu.html" id="menu">Меню</a>
            <a class="orange-button" href="../index.html" id="log-out">Выйти</a>`;
}
export const GameHead = () => {
    return `<title>Игра</title>
    <link href="../styles/game.css" rel="stylesheet"/>`
}


