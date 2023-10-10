
const app = {

    // fonction d'initialisation, lancée au chargement de la page
    init: function () {
        app.handleAddList();
        app.handleRemoveList();
        app.handleListForm();
        app.handleAddCard();
        app.handleCardForm();
    },

    handleAddList: () => {
        const addListBtn = document.getElementById('addListButton');
        addListBtn.addEventListener('click', app.showListModal);
    },

    handleRemoveList: () => {
        const closeListBtn = document.querySelectorAll('.close');

        //Iterate on each nodeList
        closeListBtn.forEach(bouton => {
            bouton.addEventListener('click', app.hideModals);
        });
    },

    handleListForm: () => {
        const form = document.querySelector('#addListModal form');
        form.addEventListener('submit', app.validateListForm);
    },

    handleCardForm: () => {
        const cardForm = document.querySelector('#addCardModal form');
        cardForm.addEventListener('submit', app.validateCardForm);
    },

    handleAddCard: () => {
        showCardForms = document.querySelectorAll('.panel a.is-pulled-right');
        // console.log(showCardForms);
        showCardForms.forEach(btn => {
            btn.addEventListener('click', app.showCardModal);
        })
    },

    showListModal: () => {
        const modal = document.getElementById('addListModal');
        //display modal: is-active a bulma param
        modal.classList.add('is-active');
    },

    showCardModal: (e) => {
        e.preventDefault();

        const modal = document.getElementById('addCardModal');
        // console.log(modal);
        modal.classList.add('is-active');

        //* On assigne un Id au champs caché du form
        //recuperer l'id de la liste concernée
        const baseList = e.target.closest('.panel');
        const id = baseList.getAttribute('data-list-id');

        //assigner l'Id à notre input
        const cardModal = document.querySelector('#addCardModal');
        cardModal.querySelector('input[type=hidden]').value = id;
    },

    hideModals: () => {
        const modals = document.querySelectorAll('.modal');
        for (const modal of modals) {
          modal.classList.remove('is-active'); //is-active is a bulma attribut
        }
    },

    validateListForm: (e) => {
        e.preventDefault()
        // Retrieve data
        const formData = new FormData(e.target);
        
        app.makeListInDom(formData);

        app.hideModals();
        //Vide les inputs du formulaire
        e.target.reset();
    },

    makeListInDom: (data) => {
        // console.log(data.get('name'));
        //Retrieve template
        const template = document.getElementById('template-list');

        //Cloner le template pour pouvoir le modifier et l'afficher
        const clone = document.importNode(template.content, true);
        //On selectionne et mettons à jour le titre de list
        clone.querySelector('h2').textContent = data.get('name');

        const listId = `list-${Date.now()}`;
        clone.querySelector('.panel').dataset.listId = listId;
        clone.querySelector("form input[name='list-id']").value = listId;

        //Ajouter la list sur le DOM
        const listContainer = document.querySelector('.card-lists');
        const firstElement = listContainer.querySelector('.panel');
        //Liste ajouter en premeir en partant de gauche si elle existe
        if(firstElement){
        firstElement.before(clone);
        }else{
            listContainer.appendChild(clone);
        }
        //En appelant toutes les methodes grace à init, cela nous permet d'ajouter
        //une carte dans une liste fairchement ajouter
        app.init();
    },

    validateCardForm: (e) => {
        e.preventDefault()
        // Retrieve data
        const formData = new FormData(e.target);
        
        app.makeCardInDom(formData);

        app.hideModals();
        //Vide les inputs du formulaire
        e.target.reset();
    },

    makeCardInDom: (data) => {
        // console.log(data.get('name'));
        //Retrieve template
        const template = document.getElementById('template-card');

        //Cloner le template pour pouvoir le modifier et l'afficher
        const clone = document.importNode(template.content, true);
        //On selectionne et mettons à jour le titre de la carte
        clone.querySelector('.card-content').textContent = data.get('content');

        const cardId = `card-${Date.now()}`;

        clone.querySelector('.box').dataset.cardId = cardId;

        const goodList = document.querySelector(`[data-list-id="${data.get('list_id')}"]`);

        goodList.querySelector('.panel-block').appendChild(clone);
        
    },
  
  };
  
  
  // on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
  document.addEventListener('DOMContentLoaded', app.init );