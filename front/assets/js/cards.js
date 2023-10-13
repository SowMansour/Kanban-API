const cardModule = {
    showCardModal: function (event) {
        event.preventDefault();
        const modal = document.querySelector('#addCardModal');
        modal.classList.add('is-active');
        //*  on doit assigner un id au champ caché du formulaire
        // * Récupérer l'id de la liste concernée
        const baseList = event.target.closest('.panel');
        const id = baseList.getAttribute('data-list-id');
        //* assigner l'ID à notre input hidden
        const cardModal = document.querySelector('#addCardModal');
        cardModal.querySelector('input[type=hidden]').value = id;
    },

    handleAddCardForm: async function (event) {
        // On empêche le rechargement de la page avec cette ligne
        event.preventDefault();
        // Comment récupérer les données d'un formulaire ?
        const formData = new FormData(event.target);
        try {
            const response = await fetch(`${utilsModule.base_url}/cards`, {
                method: 'POST',
                body: formData
            });

            const card = await response.json();

            if (!response.ok) throw card;

            app.makeCardInDOM(card);
            app.hideModals();
            // Vide les inputs du formualaire
            event.target.reset();
        } catch (e) {
            console.error(e.message);
        }
    },

    makeCardInDOM: function (cardData) {
        // récupère le template
        const template = document.getElementById('template-card');
        // On clone ce template pour pouvoir le modifier et l'afficher sur le DOM
        const clone = document.importNode(template.content, true);

        const cardTitle = clone.querySelector('.card-content');
        cardTitle.textContent = cardData.content;
        const box = clone.querySelector('.box');
        box.dataset.cardId = cardData.id;
        box.style.backgroundColor = cardData.color;

        const editBtns = document.querySelectorAll('.fa-pencil-alt');

        editBtns.forEach(bouton => {
            bouton.parentElement.parentElement.addEventListener('click', cardModule.showEditCardForm)
        });

        const deleteBtns = document.querySelectorAll('.js-delete-card');

        deleteBtns.forEach(bouton => {
            bouton.parentElement.parentElement.addEventListener('click', cardModule.deleteCard)
        });

        box.querySelector('form').addEventListener('submit', cardModule.handleEditCardForm);

        // console.log(cardData.list_id);

        const goodList = document.querySelector(
            `[data-list-id="${cardData.list_id}"]`
        );

        const cardEmplacement = goodList.querySelector('.panel-block');
        cardEmplacement.appendChild(clone);
    },

    showEditCardForm: (e) => {
        e.preventDefault();
        //Selectionne tous le contenus des cartes
        const card = e.target.closest('.box');
        card.querySelector('.card-content').classList.add('is-hidden');
        card.querySelector('form').classList.remove('is-hidden');
    },

    handleEditCardForm: async (e) => {
        e.preventDefault();
        
        const cardId = e.target.closest('.box').getAttribute('data-card-id');

        const formData = new FormData(e.target);
        const cardTitle = e.target.previousElementSibling;
        try {
            const response = await fetch(`${utilsModule.base_url}/cards/${cardId}`, {
                method: 'PATCH',
                body: formData
            });

            const json = await response.json();

            if(!response.ok) throw json;

            cardTitle.textContent = json.content;

            // mettre la couleur à jour
            cardTitle.closest('.box').style.backgroundColor = json.color;
        } catch (e) {
            console.error(e.message);
        } finally {
            // cache la form et le reset
            e.target.classList.add('is-hidden');
            //Permet de vider le form
            e.target.reset();
            //Affichage du nouveau titre
            cardTitle.classList.remove('is-hidden');
        } 
    },

    deleteCard: async (e) => {
        const card = e.target.closest('.box');
        const cardId = card.getAttribute('data-card-id');

        try {
            const response = await fetch(`${utilsModule.base_url}/cards/${cardId}`, {
                method: 'DELETE',
            });

            const json = await response.json();

            if(!response.ok) throw json;

            card.remove();
        } catch (e) {
            console.error(e.message);
        }
    },

    handleDragCards: (e) => {
    // * on doit mettre à jour toutes les cartes
    // on récupère les cartes de la liste d'origine
    let cards = e.from.querySelectorAll('.box');

    // on modifie la position des cartes sur l'API
    cardModule.updateAllCards(cards);

    // Si la bnouvelle liste est la liste de départ, on arrête
    if (e.from === e.to) return;

    // on réassigne la variable car on obeit au peuple
    cards = e.to.querySelectorAll('.box');

    // On récupère l'id de la nouvelle liste de déstination de la carte
    const listId = e.to.closest('.panel').dataset.listId;

    // on met à jour la carte avec cette information
    cardModule.updateAllCards(cards, listId);
    },

    updateAllCards: function (cards, listId = null) {
        // on met à jour chaque carte
        cards.forEach(async (card, index) => {
          // On init un formDtat vide
          const formData = new FormData();
    
          // on ajoute la position de la carte manuellement
          formData.set('position', index);
    
          // si on souhaite changer la carte de liste et qu'on a l'information listId
          if (listId) {
            // on ajoute list_id au formData (req.body)
            formData.set('list_id', listId);
          }
    
          try {
            // * on met chaque carte à jour dans la BDD
            const response = await fetch(
              `${utilsModule.base_url}/cards/${card.dataset.cardId}`,
              {
                method: 'PATCH',
                body: formData,
              }
            );
            const json = await response.json();
            if (!response.ok) throw json;
          } catch (error) {
            console.error(error.message);
          }
        });
      },

};