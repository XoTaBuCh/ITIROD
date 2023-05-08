import {
    setBoardData,
} from "../api/firebase-config.js";

class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Game {
    constructor() {
        this.boardID;
        this.history;
        this.square_dim = 80;
        this.piece_toggled = false;
        this.red_turn = true;
        this.double_jump = false;
        this.game_is_over = false;
        this.selected;
        this.piece;
        this.board = this.Board([1, 0, 1, 0, 1, 0, 1, 0,
            0, 1, 0, 1, 0, 1, 0, 1,
            1, 0, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, -1, 0, -1, 0, -1, 0, -1,
            -1, 0, -1, 0, -1, 0, -1, 0,
            0, -1, 0, -1, 0, -1, 0, -1]);
    }

    preload() {
        this.length = preload.arguments.length;
        for (var i = 0; i < this.length; i++) {
            this[i] = new Image();
            this[i].src = preload.arguments[i];
        }
    }

    Board(arg) {
        let board = new Array();
        for (var i = 0; i < 8; i++) {
            board[i] = new Array();
            for (var j = 0; j < 8; j++) board[i][j] = arg[8 * j + i];
        }
        board[-2] = new Array(); // prevents errors
        board[-1] = new Array(); // prevents errors
        board[8] = new Array(); // prevents errors
        board[9] = new Array(); // prevents errors
        return board;
    }

    moveable_space(i, j) {
        return ((i % 2) + j) % 2 == 0;
    }

    coord(x, y) {
        var c = new Coordinate(x, y);
        return c;
    }

    drawBoard() {
        let text = `<div class="main-wrapper">
    <div class="container">
        <div class="btn-wrapper">
        <input id="url-to-board" type="text" value="Код" disabled>
        <button class="gray-button" id="copy-url">
            <svg fill="#000000" height="20px" width="20px"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                <g id="Text-files">
                    <path d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228
                        C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999
                        c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64
                        h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002
                        C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228
                        c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999
                        c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z
                         M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699
                        c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946
                        c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999
                        h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"/>
                    <path d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005
                        c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997
                        C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"/>
                    <path d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986
                        c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016
                        C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"/>
                    <path d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997
                        s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997
                        S39.16465,29.4603004,38.6031494,29.4603004z"/>
                    <path d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997
                        s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997
                        S29.0059509,37.5872993,28.4444485,37.5872993z"/>
                </g>
            </svg>
        </button>
    </div>

        <form id="send-invite">
            <div class="btn-wrapper">
            <input id="username" placeholder="username">
            <button class="gray-button">
                <svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 491.022 491.022" xml:space="preserve">
                    <g>
                        <g>
                            <path d="M490.916,13.991c-0.213-1.173-0.64-2.347-1.28-3.307c-0.107-0.213-0.213-0.533-0.32-0.747
                                c-0.107-0.213-0.32-0.32-0.533-0.533c-0.427-0.533-0.96-1.067-1.493-1.493c-0.427-0.32-0.853-0.64-1.28-0.96
                                c-0.213-0.107-0.32-0.32-0.533-0.427c-0.32-0.107-0.747-0.32-1.173-0.427c-0.533-0.213-1.067-0.427-1.6-0.533
                                c-0.64-0.107-1.28-0.213-1.92-0.213c-0.533,0-1.067,0-1.6,0c-0.747,0.107-1.493,0.32-2.133,0.533
                                c-0.32,0.107-0.747,0.107-1.067,0.213L6.436,209.085c-5.44,2.347-7.893,8.64-5.547,14.08c1.067,2.347,2.88,4.373,5.227,5.44
                                l175.36,82.453v163.947c0,5.867,4.8,10.667,10.667,10.667c3.733,0,7.147-1.92,9.067-5.12l74.133-120.533l114.56,60.373
                                c5.227,2.773,11.627,0.747,14.4-4.48c0.427-0.853,0.747-1.813,0.96-2.667l85.547-394.987c0-0.213,0-0.427,0-0.64
                                c0.107-0.64,0.107-1.173,0.213-1.707C491.022,15.271,491.022,14.631,490.916,13.991z M190.009,291.324L36.836,219.218
                                L433.209,48.124L190.009,291.324z M202.809,437.138V321.831l53.653,28.267L202.809,437.138z M387.449,394.898l-100.8-53.013
                                l-18.133-11.2l-0.747,1.28l-57.707-30.4L462.116,49.298L387.449,394.898z"/>
                        </g>
                    </g>
                </svg>
            </button>
        </div>
        </form>
        <div class="history">
            <p class="history-title">Шаги</p>
            <ul class="history-list" id="history">
            </ul>
        </div>
    </div>`;
        text += '<div class="board">' +
            "<table border=0 cellspacing=0 cellpadding=0 width=" +
            (this.square_dim * 8 + 8) +
            "<tr><td><img src='gif/black.gif' width=" +
            (this.square_dim * 8 + 8) +
            " height=4><br></td></tr>";
        for (var j = 0; j < 8; j++) {
            text += "<tr><td><img src='gif/black.gif' width=4 height=" + this.square_dim + ">";
            for (var i = 0; i < 8; i++) {
                if (this.moveable_space(i, j))
                    text += "<a id='space" + i + j + "'>";
                text += "<img src='";
                if (this.board[i][j] == 1) text += "gif/you1.gif";
                else if (this.board[i][j] == -1) text += "gif/me1.gif";
                else if (this.board[i][j] == 1.1) text += "gif/you1k.gif";
                else if (this.board[i][j] == -1.1) text += "gif/me1k.gif";
                else if (this.moveable_space(i, j)) text += "gif/gray.gif";
                else text += "gif/black.gif";
                text +=
                    "' width=" +
                    this.square_dim +
                    " height=" +
                    this.square_dim +
                    " name='space" +
                    i +
                    "" +
                    j +
                    "' border=0>";
                if (this.moveable_space(i, j)) text += "</a>";
            }
            text += "<img src='gif/black.gif' width=4 height=" + this.square_dim + "></td></tr>";
        }
        text +=
            "<tr><td><img src='gif/black.gif' width=" +
            (this.square_dim * 8 + 8) +
            " height=4><br></td></tr></table><br>" +
            "</div>";
        return text;
    }

    clicked(i, j) {
        if (this.integ((this.board[i][j]) >= 1 && this.red_turn) || (this.integ(this.board[i][j]) <= -1 && !this.red_turn)) {
            this.toggle(i, j);
        } else if (this.piece_toggled) this.move(this.selected, this.coord(i, j));
    }

    toggle(x, y) {
        if (this.red_turn) {
            if (this.piece_toggled)
                this.draw(
                    this.selected.x,
                    this.selected.y,
                    "gif/you1" + (this.board[this.selected.x][this.selected.y] == 1.1 ? "k" : "") + ".gif"
                );
            if (this.piece_toggled && this.selected.x == x && this.selected.y == y) {
                this.piece_toggled = false;
                if (this.double_jump) {
                    this.red_turn = this.double_jump = false;
                }
            } else {
                this.piece_toggled = true;
                this.draw(x, y, "gif/you2" + (this.board[x][y] == 1.1 ? "k" : "") + ".gif");
            }
            this.selected = this.coord(x, y);
        } else {
            if (this.piece_toggled)
                this.draw(
                    this.selected.x,
                    this.selected.y,
                    "gif/me1" + (this.board[this.selected.x][this.selected.y] == -1.1 ? "k" : "") + ".gif"
                );
            if (this.piece_toggled && this.selected.x == x && this.selected.y == y) {
                this.piece_toggled = false;
                if (this.double_jump) {
                    this.red_turn = this.double_jump = false;
                }
            } else {
                this.piece_toggled = true;
                this.draw(x, y, "gif/me2" + (this.board[x][y] == -1.1 ? "k" : "") + ".gif");
            }
            this.selected = this.coord(x, y);
        }
    }

    draw(x, y, name) {
        document.images["space" + x + "" + y].src = name;
    }

    integ(num) {
        if (num != null) return Math.round(num);
        else return null;
    }

    abs(num) {
        return Math.abs(num);
    }

    sign(num) {
        if (num < 0) return -1;
        else return 1;
    }

    concatenate(arr1, arr2) {
        // function tacks the second array onto the end of the first and returns result
        for (var i = 0; i < arr2.length; i++) arr1[arr1.length + i] = arr2[i];
        return arr1;
    }

    legal_move(from, to) {
        if (to.x < 0 || to.y < 0 || to.x > 7 || to.y > 7) return false;
        this.piece = this.board[from.x][from.y];
        this.distance = this.coord(to.x - from.x, to.y - from.y);
        if (this.distance.x == 0 || this.distance.y == 0) {
            return false;
        }
        if (this.abs(this.distance.x) != this.abs(this.distance.y)) {
            return false;
        }
        if (this.abs(this.distance.x) > 2) {
            return false;
        }
        if (this.abs(this.distance.x) == 1 && this.double_jump) {
            return false;
        }
        if (this.board[to.x][to.y] != 0 || this.piece == 0) {
            return false;
        }
        if (
            this.abs(this.distance.x) == 2 &&
            this.integ(this.piece) !=
            -this.integ(this.board[from.x + this.sign(this.distance.x)][from.y + this.sign(this.distance.y)])
        ) {
            return false;
        }
        if (this.integ(this.piece) == this.piece && this.sign(this.piece) != this.sign(this.distance.y)) {
            return false;
        }

        return true;
    }

    move(from, to) {
        //if (!red_turn) red_turn = true;
        if (this.legal_move(from, to)) {
            this.piece = this.board[from.x][from.y];
            this.distance = this.coord(to.x - from.x, to.y - from.y);
            if (this.abs(this.distance.x) == 1 && this.board[to.x][to.y] == 0) {
                this.swap(from, to);
            } else if (
                this.abs(this.distance.x) == 2 &&
                this.integ(this.piece) !=
                this.integ(this.board[from.x + this.sign(this.distance.x)][from.y + this.sign(this.distance.y)])) {
                this.double_jump = false;
                this.swap(from, to);
                this.remove(from.x + this.sign(this.distance.x), from.y + this.sign(this.distance.y));
                if (
                    this.legal_move(to, this.coord(to.x + 2, to.y + 2)) ||
                    this.legal_move(to, this.coord(to.x + 2, to.y - 2)) ||
                    this.legal_move(to, this.coord(to.x - 2, to.y - 2)) ||
                    this.legal_move(to, this.coord(to.x - 2, to.y + 2))
                ) {
                    this.double_jump = true;
                }
            }
            if (this.board[to.x][to.y] == 1 && to.y == 7 && this.red_turn) this.king_me(to.x, to.y);
            if (this.board[to.x][to.y] == -1 && to.y == 0 && !this.red_turn) this.king_me(to.x, to.y);
            this.selected = to;
            if (this.red_turn) {
                if (this.game_over() && !this.double_jump) {
                    this.toggle(to.x, to.y);
                    this.red_turn = this.double_jump = false;

                    this.history += "<li class='red-li'>(" + from.x + " ," + from.y +
                        ") -> (" + to.x + " ," + to.y + ")</li>";
                    setBoardData(this.boardID, this.board, this.history, this.red_turn);
                }
            } else {
                if (this.game_over() && !this.double_jump) {
                    this.toggle(to.x, to.y);
                    this.red_turn = true;
                    this.double_jump = false;
                    this.history += "<li class='black-li'>(" + from.x + " ," + from.y +
                        ") -> (" + to.x + " ," + to.y + ")</li>";
                    setBoardData(this.boardID, this.board, this.history, this.red_turn);
                }
            }
        }
        return true;
    }

    king_me(x, y) {
        if (this.board[x][y] == 1) {
            this.board[x][y] = 1.1; // king you
            this.draw(x, y, "gif/you2k.gif");
        } else if (this.board[x][y] == -1) {
            this.board[x][y] = -1.1; // king me
            this.draw(x, y, "gif/me2k.gif");
        }
        if (this.red_turn) this.history += "<li class='white-li'>Red "
        else this.history += "<li class='white-li'>Black "
        this.history += "checker(" + x + "," + y + ")is king now</li>";
    }

    swap(from, to) {
        this.dummy_src = document.images["space" + to.x + "" + to.y].src;
        document.images["space" + to.x + "" + to.y].src =
            document.images["space" + from.x + "" + from.y].src;
        document.images["space" + from.x + "" + from.y].src = this.dummy_src;

        this.dummy_num = this.board[from.x][from.y];
        this.board[from.x][from.y] = this.board[to.x][to.y];
        this.board[to.x][to.y] = this.dummy_num;
    }

    remove(x, y) {
        this.draw(x, y, "gif/gray.gif");
        this.board[x][y] = 0;
        if (this.red_turn) this.history += "<li class='white-li'>Black "
        else this.history += "<li class='white-li'>Red "
        this.history += "checker(" + x + "," + y + ") eaten</li>";
    }

    game_over() {
        // make sure game is not over (return false if game is over)
        this.comp = this.you = false;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (this.integ(this.board[i][j]) == -1) this.comp = true;
                if (this.integ(this.board[i][j]) == 1) this.you = true;
            }
        }
        if (!this.comp) this.history +=
            "<li class='white-li'>You beat me!</li>";
        if (!this.you) this.history +=
            "<li class='white-li'>Gotcha! Game over.</li>";
        this.game_is_over = !this.comp || !this.you;
        return !this.game_is_over;
    }
}
