import {initializeApp} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
    getAuth,
    connectAuthEmulator,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
import {
    getDatabase,
    onValue,
    ref,
    set,
    remove
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"
import {ChangeBoard, ShowInvites} from "../scripts/index.js";

const firebaseConfig = {
    apiKey: "AIzaSyDII6W3pbfKqAlGtY2lzMY8ofFwPdB5M-g",
    authDomain: "checkers-xotab.firebaseapp.com",
    databaseURL: "https://checkers-xotab-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "checkers-xotab",
    storageBucket: "checkers-xotab.appspot.com",
    messagingSenderId: "52371597680",
    appId: "1:52371597680:web:89e738682838341a5cc7b5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

//connectAuthEmulator(auth, "http://localhost:9099");

export function setBoardData(boardId, position, history, lastMove) {
    const db = getDatabase();
    const reference = ref(db, 'boards/' + boardId);
    set(reference, {
        position: position,
        history: history,
        lastMove: lastMove
    });
}

export async function sendInvite(userId, url) {
    const db = getDatabase();
    const invitesRef = ref(db, 'invites/' + userId);
    set(invitesRef, {
        url: url
    });
}

export async function getInvites(userId) {
    const db = getDatabase();
    const Ref = ref(db, 'invites/' + userId);
    onValue(Ref, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            ShowInvites(data);

            const invitesRef = ref(db, 'invites/' + userId);
            remove(invitesRef);
        } else {
            console.log("No invites");
        }
    });
}

export async function getBoardData(boardID) {
    const db = getDatabase();
    const Ref = ref(db, 'boards/' + boardID);
    onValue(Ref, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data);
            ChangeBoard(data);
        } else {
            console.log("No data available");
        }
    });
}

export const signInWithEmail = async (loginEmail, loginPassword, callback) => {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword).catch(
        (error) => {
            alert(error.message);
        }
    );
};

export const signUpWithEmail = async (loginEmail, loginPassword, callback) => {
    if (!loginEmail.trim()) return;

    await createUserWithEmailAndPassword(auth, loginEmail, loginPassword).catch(
        (error) => {
            alert(error.message);
        }
    );
};

export const signOutFromApp = async () => {
    await signOut(auth);
};

export const monitorAuthState = async (setUserData, callback) =>
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            setUserData({
                id: user.uid,
                isSignedIn: true,
                name: user.email,
            });
            callback();
        } else {
            console.log("no user");
            setUserData({});
        }
    });

export async function monitorBoardState(game, gameStarted, callback) {
    if (gameStarted) {
        console.log("catched");
        const dbRef = ref(getDatabase(), 'boards/' + game.boardId);
        onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.val());
            } else {
                console.log("No data available");
            }

        });
    }
}
