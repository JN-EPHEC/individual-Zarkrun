document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('users-list');
    const form = document.getElementById('user-form');
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        postUsers(list);
    });
    loadUsers(list)
});
async function loadUsers(list) {
    try {
        const res = await fetch('http://localhost:3000/api/users');
        const users = await res.json();

        list.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.className = "list-group-item d-flex justify-content-between align-items-center";

            const span = document.createElement('span');
            span.textContent = `${user.firstName} ${user.lastName}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "X";
            deleteBtn.className = "btn btn-danger btn-sm";

            deleteBtn.addEventListener("click", () => {
                deleteUser(user.id, list);
            });

            li.appendChild(span);
            li.appendChild(deleteBtn);
            list.appendChild(li);
        });

    } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs :", err);
    }
}

async function postUsers(list){
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    try {
        const res = await fetch('http://localhost:3000/api/users',
            {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName}),
            });
        if (res.ok) {
            await res.json();
            loadUsers(list);
        }
    } catch (err) {
        console.error("Erreur du post : ", err);
    }
}

async function deleteUser(id, list) {
    try {
        const res = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            loadUsers(list);
        }

    } catch (err) {
        console.error("Erreur lors de la suppression :", err);
    }
}
