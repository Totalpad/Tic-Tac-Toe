import Store from "./store.js";
import View from "./view.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store('live-game-key', players);



  window.addEventListener('storage', ()=> {
    console.log('State changed from another tab ')
    view.render(store.game, store.stats)
  })

  view.render(store.game, store.stats)

  view.bindGameResetEvent((event) => {
    store.reset();
    view.render(store.game, store.stats)
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
    view.render(store.game, store.stats)
  });

  view.bindPlayerMoveEvent((square) => {
    const exisitngMove = store.game.currentGameMoves.find(
      (move) => move.squareId === +square.id
    );

    if (exisitngMove) {
      return;
    }

    
    store.playerMove(+square.id);

    view.render(store.game, store.stats)
    
  });
}

window.addEventListener("load", init);










