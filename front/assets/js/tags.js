const tagModule = {
    makeTagInDom: function (tag) {
      // On crée un span pour afficher un tag
      const tagDOM = document.createElement('span');
      // on lui donne un attribut data-tag-id
      tagDOM.dataset.tagId = tag.id;
      // On lui donne un nom
      tagDOM.textContent = tag.name;
      // on lui donne un bgcolor
      tagDOM.style.backgroundColor = tag.color;
      tagDOM.classList.add('tag');
      tagDOM.addEventListener('dblclick', tagModule.dissociateTagFromCard);
      // Ajouter un tag sur le dom
      // on récupère le parent de tag
      //tag.card_has_tag.card_id;
      const card = document.querySelector(
        `.box[data-card-id="${tag.card_has_tag.card_id}"]`
      );
      card.querySelector('.tags').appendChild(tagDOM);
    },
    dissociateTagFromCard: async function (event) {
      const cardId = event.target.closest('.box').dataset.cardId;
      const tagId = event.target.dataset.tagId;
      try {
        const response = await fetch(
          `${utilsModule.base_url}/cards/${cardId}/tags/${tagId}`,
          {
            method: 'DELETE',
          }
        );
        const json = await response.json();
        if (!response.ok) throw json;
        event.target.remove();
      } catch (error) {
        console.error(error.message);
      }
    },
    showAssociateTagModal: async function (event) {
      // on récupère l'id de la carte cliquée
      const cardDOM = event.target.closest('.box');
      const cardId = cardDOM.dataset.cardId;
      // on modifie l'id de la carte dans le input caché du formulaire
      const modal = document.querySelector('#addTagToCardModal');
      modal.querySelector('input[name="card_id"]').value = cardId;
      // on vide le select
      // * changement du sélecteur du select
      const select = modal.querySelector('select[name="tag_id"]');
      select.textContent = '';
      // pour le remplir avec les tags fournies par l'API
      try {
        // faire un call API en GET sur +/tags pour récupérer tous les tags
        const response = await fetch(`${utilsModule.base_url}/tags`);
        // notre variable json contient tous les tags ou l'erreur renvoyée par l'API
        const json = await response.json();
        if (!response.ok) throw json;
        // on récupère les tags de la carte dans le DOM
        const tagsDOM = cardDOM.querySelectorAll('.tag');
        // si la carte possède tous les tags, inutile d'aller plus loin : on ferme la modale
        if (tagsDOM.length === json.length) return utilsModule.hideModals();
        // pour chaque tag on va créer une balise option pour le select
        for (const tag of json) {
          // mais on vérifie d'abord si le tag n'est pas déjà présent sur la carte
          // malheuresement, impossible d'utiliser la méthode find() sur une NodeList, on doit s'y prendre autrement
          let tagPresence = false;
          for (const tagDOM of tagsDOM) {
            if (tagDOM.textContent === tag.name) {
                tagPresence = true;
              }
            }
            // si on remarque la présence du tag sur la carte, alors on passe au tour de boucle suivant
            if (tagPresence) continue;
            // sinon on peut créer la balise option
            const option = document.createElement('option');
            // la remplir avec le nom du tag
            option.textContent = tag.name;
            // et mettre l'id du tag en value
            option.value = tag.id;
            // on insère enfin l'option dans le select
            select.appendChild(option);
    
            // on affiche la modale
            modal.classList.add('is-active');
          }
        } catch (error) {
          alert('Impossible de récupérer tous les tags !');
          console.error(error);
        }
    },
      associateTagToCard: function () {
        // *
      }, 

}