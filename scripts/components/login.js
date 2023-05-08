export const LogIn = () => {
    return `<form action="menu.html" id="log-in-user">
            <fieldset class="container">
                <h1>Авторизация</h1>
                <input type="email" placeholder="Email" id="email">
                <br>
                <input type="password" placeholder="Password" id="password">
                <br>
                <p id="error-field"></p>
                <input class="gray-button" type="submit" value="Войти">
            </fieldset>
        </form>`;
}
export const LogInHeader = () => {
    return `<a class="orange-button" href="../index.html" id="main-page">Главная</a>
            <a class="orange-button" href="sign_up.html" id="sign-up">Регистрация</a>`;
}
export const LogInHead = () => {
    return `<title>Логин</title>
    <link href="../../styles/login.css" rel="stylesheet"/>`
}