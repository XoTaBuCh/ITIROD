import {Welcome, WelcomeHeader, WelcomeHead} from './components/main.js';
import {
    getBoardData, getInvites,
    monitorAuthState, monitorBoardState, sendInvite, setBoardData,
    signInWithEmail,
    signOutFromApp,
    signUpWithEmail
} from "../api/firebase-config.js";
import {SignUp, SignUpHead, SignUpHeader} from "./components/sign_up.js";
import {LogIn, LogInHead, LogInHeader,} from "./components/login.js";
import {Menu, MenuHead, MenuHeader} from "./components/menu.js";
import {Help, HelpHead, HelpHeader} from "./components/help.js";
import {GameHead, GameHeader} from "./components/game.js";

import {Game} from './game_logic.js';

//////////////////////////////////////////////

const headContainer = document.getElementById("head");
const navbarContainer = document.getElementById("navbar");
const mainContainer = document.getElementById("main");


let userData = {
    id: "",
    name: "",
    hasSavedGame: false,
    isSignedIn: false,
};

let gameStarted = false;
let game;

//////////////////////////////////////////////

const addOnClick = (id, callback) => {
    document.getElementById(id).addEventListener("click", callback);
};

const addOnSubmit = (id, callback) => {
    document.getElementById(id).addEventListener("submit", callback);
};

const addMoveAction = (i, j, callback) => {
    if (j % 2 == i % 2) {
        const cell = document.getElementById(("space" + i + j).toString());
        cell.addEventListener("click", () => {
            game.clicked(i, j);
        });

    }
};

//////////////////////////////////////////////

const RenderWelcome = () => {
    headContainer.innerHTML = WelcomeHead();
    navbarContainer.innerHTML = WelcomeHeader();
    mainContainer.innerHTML = Welcome();
    addOnClick("get-started", (e) => {
        e.preventDefault();
        RenderSignUp();
    });
    addOnClick("sign-up", (e) => {
        e.preventDefault();
        RenderSignUp();
    });
    addOnClick("login", (e) => {
        e.preventDefault();
        RenderLogIn();
    });
    addOnClick("help", (e) => {
        e.preventDefault();
        RenderHelp();
    })
}

const RenderHelp = () => {
    headContainer.innerHTML = HelpHead();
    navbarContainer.innerHTML = HelpHeader();
    mainContainer.innerHTML = Help();
    addOnClick("main", (e) => {
        e.preventDefault();
        RenderWelcome();
    });
}

const RenderSignUp = () => {
    headContainer.innerHTML = SignUpHead();
    navbarContainer.innerHTML = SignUpHeader();
    mainContainer.innerHTML = SignUp();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    addOnSubmit("create-account", (e) => {
        e.preventDefault();
        signUpWithEmail(email.value, password.value);
    });

    addOnClick("main-page", (e) => {
        e.preventDefault();
        RenderWelcome();
    });
    addOnClick("login", (e) => {
        e.preventDefault();
        RenderLogIn();
    });
}

const RenderLogIn = () => {
    headContainer.innerHTML = LogInHead();
    navbarContainer.innerHTML = LogInHeader();
    mainContainer.innerHTML = LogIn();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    addOnSubmit("log-in-user", (e) => {
        e.preventDefault();
        signInWithEmail(email.value, password.value);
    });

    addOnClick("sign-up", (e) => {
        e.preventDefault();
        RenderSignUp();
    });
    addOnClick("main-page", (e) => {
        e.preventDefault();
        RenderWelcome();
    });
}

const RenderMenu = () => {
    headContainer.innerHTML = MenuHead();
    navbarContainer.innerHTML = MenuHeader();
    mainContainer.innerHTML = Menu();

    const userEmail = document.getElementById("user-email");
    userEmail.textContent = userData.name;

    getInvites(userData.name.replaceAll("\.", ""));

    addOnClick("create-board", (e) => {
        e.preventDefault();
        gameStarted = true;
        RenderGame();
    });
    addOnSubmit("join-to-board", (e) => {
        e.preventDefault();
        const url = document.getElementById("url-to-board-input").value;
        if (url) {
            gameStarted = true;
            RenderGame(url);
        }
    });
    addOnClick("log-out", (e) => {
        e.preventDefault();
        setUserData({
            id: "",
            name: "",
            hasSavedGame: false,
            isSignedIn: false,
        });
        signOutFromApp();
        RenderWelcome();
    });
}

const RenderGame = async (url) => {
    game = new Game();
    headContainer.innerHTML = GameHead();
    navbarContainer.innerHTML = GameHeader();
    mainContainer.innerHTML = game.drawBoard();
    game.history = document.getElementById("history");

    if (url) {
        game.boardID = url;
        getBoardData(url);
    } else {
        game.boardID = generateBoardID();
        setBoardData(game.boardID, game.board, '', game.red_turn);
        getBoardData(game.boardID);
    }

    document.getElementById("url-to-board").value = game.boardID;

    addOnClick("menu", (e) => {
        e.preventDefault();
        gameStarted = false;
        game = null;
        RenderMenu();
    });
    addOnClick("log-out", (e) => {
        e.preventDefault();
        gameStarted = false;
        game = null;
        setUserData({
            id: "",
            name: "",
            hasSavedGame: false,
            isSignedIn: false,
        });
        signOutFromApp();
        RenderWelcome();
    });
    addOnClick("copy-url", (e) => {
        navigator.clipboard.writeText(game.boardID)
            .then(() => {
                // Получилось!
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    });
    addOnSubmit("send-invite", (e) => {
        e.preventDefault();
        sendInvite(document.getElementById("username").value.replaceAll("\.", ""), game.boardID)
    });
}

//////////////////////////////////////////////
const generateBoardID = () => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
const setUserData = (newData) => {
    userData = JSON.parse(JSON.stringify(newData));
    console.log(newData);
}

export const ChangeBoard = (data) => {
    game.board = data.position;
    game.history = data.history;
    game.red_turn = data.lastMove;
    mainContainer.innerHTML = game.drawBoard();
    document.getElementById("history").innerHTML = game.history;
    document.getElementById("url-to-board").value = game.boardID;

    for (var j = 0; j < 8; j++) {
        for (var i = 0; i < 8; i++) {
            addMoveAction(i, j, () => game.clicked);
        }
    }
}

export const ShowInvites = (data) => {
    const dialog  = document.getElementById("invite-dialog");
    dialog.showModal();
    console.log(data.url);
    document.getElementById("invite-url").innerHTML = data.url;
    addOnClick("accept", () => {
        RenderGame(data.url);
    });
    addOnClick("deny", () => {
        dialog.close();
    });
}


RenderWelcome();
monitorAuthState(setUserData, RenderMenu);
//monitorBoardState(game, gameStarted, ChangeBoard)