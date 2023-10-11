const utilsModule = {
    base_url: 'http://localhost:8080',

    hideModals: function () {
        const modals = document.querySelectorAll('.modal');
        for (const modal of modals) {
          modal.classList.remove('is-active');
        }
      },

}