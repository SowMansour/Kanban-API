const app = {
  // fonction d'initialisation, lancée au chargement de la page
  init: function () {
    app.addListenerToActions();
    app.getListsFromAPI();
  },

  addListenerToActions: function () {
    // 1. On sélectionne un élément
    const btn = document.getElementById('addListButton');
    // 2. On ajoute l'écouteur d'évènement
    btn.addEventListener('click', listModule.showListModal);
    const closeBtns = document.querySelectorAll('.close');
    // retourne un NodeList
    for (const btn of closeBtns) {
      btn.addEventListener('click', utilsModule.hideModals);
    }
    // FORM ADD LIST
    const form = document.querySelector('#addListModal form');
    form.addEventListener('submit', listModule.handleAddListForm);
    // FORM ADD CARD
    const showCardFormBtns = document.querySelectorAll(
      '.panel a.is-pulled-right'
    );
    showCardFormBtns.forEach((btn) =>
      btn.addEventListener('click', cardModule.showCardModal)
    );
    // FORM ADD CARD
    const cardForm = document.querySelector('#addCardModal form');
    cardForm.addEventListener('submit', cardModule.handleAddCardForm);
  },
  
  getListsFromAPI: async function () {
    try {
      const response = await fetch(`${utilsModule.base_url}/lists`);
      const json = await response.json();
      // GUARD : Si la requête s'est mal passée, on throw une erreur
      if (!response.ok) throw json;

      //
      for (const list of json) {
        listModule.makeListInDOM(list);

        for (const card of list.cards) {
          cardModule.makeCardInDOM(card);
        }
      };
        
    // Drag n Drop avec ma librairie Sortable
    const listContainer = document.querySelector('.card-lists');

    Sortable.create(listContainer, {
      draggable: '.panel',
      onEnd: listModule.handleDragList,
      animation: 100,
    });
    
    } catch (error) {
      console.error(error.message);
    }
  },

};

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init);


