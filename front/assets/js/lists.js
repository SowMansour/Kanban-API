const listModule = {
    showListModal: function () {
        // sélectionne la modal
        const modal = document.querySelector('#addListModal');
        // ajout de la classse is-active de bulma
        modal.classList.add('is-active');
      },

      handleAddListForm: async function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
        // Fetch en méthode POST : on récupère les données du formulaire, et on les envoie 
        //au serveur pour qu'il crée une liste en BDD
        const response = await fetch(`${utilsModule.base_url}/lists`, {
          method: 'POST',
          body: formData
        });
        
        const list = await response.json();
  
        if(!response.ok) throw list;
        app.makeListInDOM(list);
        app.hideModals();
        // Vide les inputs du formualaire
        event.target.reset();
  
      } catch (e) {
        console.error(e.message);
    }
      },

      makeListInDOM: function (dataList) {
        // récupère le template
        const template = document.getElementById('template-list');
        // On clone ce template pour pouvoir le modifier et l'afficher sur le DOM
        const clone = document.importNode(template.content, true);

        const h2 = clone.querySelector('h2');
        h2.textContent = dataList.name;

        //Modification titre des listes
        h2.addEventListener('dblclick', listModule.showEditList);

        //valider le changement de nom des listes
        const form = h2.nextElementSibling;
        form.addEventListener('submit', listModule.handleEditListForm)        
        
        clone.querySelector('.panel').dataset.listId = dataList.id;
        clone.querySelector("form input[name='list-id']").value = dataList.id;
         // Ajouter la liste sur le DOM
        const listContainer = document.querySelector('.card-lists');
        const firstElement = listContainer.querySelector('.panel');
        if (firstElement) {
            firstElement.before(clone);
        } else {
            listContainer.appendChild(clone);
        }
        app.addListenerToActions();
        },

        showEditList: (e) => {
            e.target.classList.add('is-hidden');

            e.target.nextElementSibling.classList.remove('is-hidden');
        },

        handleEditListForm: async (e) => {
            e.preventDefault();
            const h2 = e.target.previousElementSibling;
            const formData = new FormData(e.target);
            try {
                const response = await fetch(`${utilsModule.base_url}/lists/${formData.get('list-id')}`,{
                    method: 'PATCH',
                    body: formData
                })
                
                const json = await response.json();

                h2.textContent = json.name;
                
            } catch (e) {
               console.error(e.message); 
            } finally{
            e.target.classList.add('is-hidden');
            h2.classList.remove('is-hidden');
            }
        }
     }