export const Welcome = () => {
    return `<div class="main-wrapper">
    <img class="board-img" src="resources/board.jpg" alt="board">
    
    <div class="container">
        <div class="text">
            <h1>Тут очень важная</h1>
            <h2>и полезная инфа</h2>
        </div>
       <div class="btns">
           <a class="gray-button" href="html/help.html" id="help">

               Как играть?
        </a>
        <a class="gray-button" href="html/sign_up.html" id="get-started">
            Играть
        </a>
       </div>
    </div>
    </div>
`;
}

export const WelcomeHeader = () => {
    return `<a class="orange-button" href="" id="login">Логин</a>
            <a class="orange-button" href="" id="sign-up">Регистрация</a>`;
}
export const WelcomeHead = () => {
    return `<title>Главная страница</title>
    <link href="../styles/main.css" rel="stylesheet"/>`
}


