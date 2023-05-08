export const SignUp = () => {
    return ` <form action="menu.html" id="create-account">
        <fieldset class="container">
            <h1>Регистрация</h1>
            <input placeholder="Username">
            <br>
            <input type="email" placeholder="Email" id="email">
            <br>
            <input type="password" placeholder="Password" id="password">
            <br>
            <p id="error-field"></p>
            <input class="gray-button" type="submit" value="Зарегистрироваться">
        </fieldset>
    </form>`;
}

export const SignUpHeader = () => {
    return `<a class="orange-button" href="../index.html" id="main-page">Главная</a>
            <a class="orange-button" href="login.html" id="login">Логин</a>`;
}
export const SignUpHead = () => {
    return `<title>Регистрация</title>
    <link href="../../styles/sing_up.css" rel="stylesheet"/>`
}


