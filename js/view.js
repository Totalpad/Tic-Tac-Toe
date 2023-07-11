export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qs('[data-id="menu"]');
    this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
    this.$.menuItems = this.#qs('[data-id="menu-items"]');
    this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
    this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
    this.$.modal = this.#qs('[data-id="modal"]');
    this.$.modalText = this.#qs('[data-id="modal-text"]');
    this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
    this.$.turn = this.#qs('[data-id="turn"]');
    this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
    this.$.p2Wins = this.#qs('[data-id="p2-wins"]');
    this.$.ties = this.#qs('[data-id="ties"]');

    this.$$.squares = this.#qsAll('[data-id="square"]');

    // UI-only event Listeners
    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  render(game, stats) {
    const { playerWithStats, ties } = stats;
    const {
      currentGameMoves,
      currentPlayer,
      status: { isComplete, winner },
    } = game;

    this.#closeAll();
    this.#clearMoves();
    this.#updateScoreboard(
      playerWithStats[0].wins,
      playerWithStats[1].wins,
      ties
    );
    this.#initializeMoves(currentGameMoves);

    if (isComplete) {
      this.#openModal(
        winner ? `${winner.name} wins!` : `It is Tie Game!`
      );
      return;
    }

    this.#setTurnIndicator(currentPlayer);
  }
  /**
   * Register all the event listeners
   *
   */

  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  /**
   * DOM helper methods
   */
  #updateScoreboard(p1Wins, p2Wins, ties) {
    this.$.p1Wins.innerText = `${p1Wins} wins`;
    this.$.p2Wins.innerText = `${p2Wins} wins`;
    this.$.ties.innerText = `${ties} ties`;
  }

  #openModal(message) {
    this.$.modal.classList.remove("hidden");
    this.$.modalText.innerText = message;
  }

  #closeAll() {
    this.#closeModal();
    this.#closeMenu();
  }

  #clearMoves() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  #initializeMoves(currentGameMoves) {
    this.$$.squares.forEach((square) => {
      const exisitngMove = currentGameMoves.find((move) => move.squareId === +square.id);

      if (exisitngMove) {
        this.#handlePlayerMove(square, exisitngMove.player);
      }
    });
  }

  #closeModal() {
    this.$.modal.classList.add("hidden");
  }

  #closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.add("fa-chevron-down");
    icon.classList.remove("fa-chevron-up");
  }

  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  }

  #handlePlayerMove(squareEl, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  #setTurnIndicator(player) {
    const icon = document.createElement("i");
    const lable = document.createElement("p");

    icon.classList.add("fa-solid", player.colorClass, player.iconClass);

    lable.classList.add(player.colorClass);

    lable.innerText = `${player.name}, you are up!`;

    this.$.turn.replaceChildren(icon, lable);
  }

  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!el) throw new Error("Could not find elements");

    return el;
  }

  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);

    if (!elList) throw new Error("Could not find elements");

    return elList;
  }
}

// export default class View {
//   $ = {};
//   $$ = {};

//   constructor() {
//     this.$.menu = this.#qs('[data-id="menu"]');
//     this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
//     this.$.menuItems = this.#qs('[data-id="menu-items"]');
//     this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
//     this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
//     this.$.modal = this.#qs('[data-id="modal"]');
//     this.$.modalText = this.#qs('[data-id="modal-text"]');
//     this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
//     this.$.turn = this.#qs('[data-id="turn"]');
//     this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
//     this.$.p2Wins = this.#qs('[data-id="p2-wins"]');
//     this.$.ties = this.#qs('[data-id="ties"]');

//     this.$$.squares = this.#qsAll('[data-id="square"]');

//     // UI-only event Listeners
//     this.$.menuBtn.addEventListener("click", (event) => {
//       this.#toggleMenu();
//     });
//   }
//   /**
//    * Register all the event listeners
//    *
//    */

//   bindGameResetEvent(handler) {
//     this.$.resetBtn.addEventListener("click", handler);
//     this.$.modalBtn.addEventListener("click", handler);
//   }

//   bindNewRoundEvent(handler) {
//     this.$.newRoundBtn.addEventListener("click", handler);
//   }

//   bindPlayerMoveEvent(handler) {
//     this.$$.squares.forEach((square) => {
//       square.addEventListener("click", () => handler(square));
//     });
//   }

//   /**
//    * DOM helper methods
//    */
//   updateScoreboard(p1Wins, p2Wins, ties) {
//     this.$.p1Wins.innerText = `${p1Wins} wins`;
//     this.$.p2Wins.innerText = `${p2Wins} wins`;
//     this.$.ties.innerText = `${ties} ties`;
//   }

//   openModal(message) {
//     this.$.modal.classList.remove("hidden");
//     this.$.modalText.innerText = message;
//   }

//   closeAll() {
//     this.#closeModal();
//     this.#closeMenu();
//   }

//   clearMoves() {
//     this.$$.squares.forEach((square) => {
//       square.replaceChildren();
//     });
//   }

//   initializeMoves(moves) {
//     this.$$.squares.forEach((square) => {
//       const exisitngMove = moves.find((move) => move.squareId === +square.id);

//       if (exisitngMove) {
//         this.handlePlayerMove(square, exisitngMove.player);
//       }
//     });
//   }

//   #closeModal() {
//     this.$.modal.classList.add("hidden");
//   }

//   #closeMenu() {
//     this.$.menuItems.classList.add("hidden");
//     this.$.menuBtn.classList.remove("border");

//     const icon = this.$.menuBtn.querySelector("i");
//     icon.classList.add("fa-chevron-down");
//     icon.classList.remove("fa-chevron-up");
//   }

//   #toggleMenu() {
//     this.$.menuItems.classList.toggle("hidden");
//     this.$.menuBtn.classList.toggle("border");

//     const icon = this.$.menuBtn.querySelector("i");
//     icon.classList.toggle("fa-chevron-down");
//     icon.classList.toggle("fa-chevron-up");
//   }

//   handlePlayerMove(squareEl, player) {
//     const icon = document.createElement("i");
//     icon.classList.add("fa-solid", player.iconClass, player.colorClass);
//     squareEl.replaceChildren(icon);
//   }

//   setTurnIndicator(player) {
//     const icon = document.createElement("i");
//     const lable = document.createElement("p");

//     icon.classList.add("fa-solid", player.colorClass, player.iconClass);

//     lable.classList.add(player.colorClass);

//     lable.innerText = `${player.name}, you are up!`;

//     this.$.turn.replaceChildren(icon, lable);
//   }

//   #qs(selector, parent) {
//     const el = parent
//       ? parent.querySelector(selector)
//       : document.querySelector(selector);

//     if (!el) throw new Error("Could not find elements");

//     return el;
//   }

//   #qsAll(selector) {
//     const elList = document.querySelectorAll(selector);

//     if (!elList) throw new Error("Could not find elements");

//     return elList;
//   }
// }
