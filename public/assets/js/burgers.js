// Wait to attach event handlers until after DOM loads
document.addEventListener('DOMContentLoaded', (event) => {
    // console.log('pls work');
    if (event) {
        console.info('DOM loaded');
    }

    // UPDATE
    const changeDevourBtns = document.querySelectorAll('.change-devour');

    // Create button event listener
    if (changeDevourBtns) {
        changeDevourBtns.forEach((button) => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const newDevour = e.target.getAttribute('data-newdevour');

                const newDevourState = {
                    devoured: newDevour,
                };

                // PUT request (update)
                fetch(`/api/burgers/${id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(newDevourState),
                }).then((response) => {
                    if (response.ok) {
                        console.log(`changed devoured to: ${newDevour}`);
                        location.reload('/');
                    } else {
                        alert('An error occured!');
                    }
                });
            });
        });
    }

    // CREATE
    const creatBurgerBtn = document.getElementById('create-form');
    if (creatBurgerBtn) {
        creatBurgerBtn.addEventListener('submit', (e) => {
            e.preventDefault();
            const newBurger = {
                name: document.getElementById('burg').value.trim(),
                // devoured: false,
            };

            $.ajax({
                method: "POST",
                url: "/api/burgers",
                data: newBurger
              }).then(function(response) {
                console.log('Created a new burger!')
                location.reload();
              });

            // fetch('/api/burgers', {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json'
            //     },

            //     body: newBurger
            // }).then(() => {
            //     document.getElementById('burg').value = '';
            //     console.log('Created a new burger!');
            //     location.reload();
            // });
        });
    }

    // DELETE
    const deleteBurgerBtns = document.querySelectorAll('.delete-burger');

    // Event listeners for each delete button
    deleteBurgerBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');

            // Delete request
            fetch(`/api/burgers/${id}`, {
                method: 'DELETE',
            }).then((res) => {
                console.log(res);
                console.log(`Deleted burger: ${id}`);

                location.reload();
            });
        });
    });
});