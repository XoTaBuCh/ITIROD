export const Menu = () => {
    return `<form class="container" action="game.html" id="join-to-board">
        <h1>Меню</h1>
        <h2 id="user-email"></h2>
        <a class="gray-button" href="game.html" id="create-board">Новая игра</a>
        <input placeholder="Код комнаты" id="url-to-board-input">
        <input class="gray-button" type="submit" value="Присоединиться">
    </form>
    
    <dialog class="invite-dialog" id="invite-dialog">
      <h2>Вас приглашают в игру</h2>
      <p id="invite-url"></p>
      <span></span><button class="orange-button" id="accept">Принять</button>
      <button class="orange-button" id="deny">Отклонить</button></span>
    </dialog>`;
}

export const MenuHeader = () => {
    return `<a class="orange-button" href="../index.html" id="log-out">Выйти</a>`;
}
export const MenuHead = () => {
    return `<title>Меню</title>
    <link href="../../styles/menu.css" rel="stylesheet"/>`
}


