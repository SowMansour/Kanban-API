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

        clone.querySelector('.card-content').textContent = cardData.content;

        clone.querySelector('.box').dataset.cardId = cardData.id;

        // console.log(cardData.list_id);

        const goodList = document.querySelector(
            `[data-list-id="${cardData.list_id}"]`
        );

        const cardEmplacement = goodList.querySelector('.panel-block');
        cardEmplacement.appendChild(clone);
    },

}