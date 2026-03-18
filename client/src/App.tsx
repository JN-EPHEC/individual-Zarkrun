import { useEffect, useState } from "react";

interface User {
    id: number;
    firstName: string;
    lastName: string;
}

function App() {

    const [users, setUsers] = useState<User[]>([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [id, setId] = useState<number | "">("");

    // Charger les utilisateurs
    const loadUsers = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/users");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("Erreur loadUsers", err);
        }
    };

    // Au montage
    useEffect(() => {
        loadUsers();
    }, []);

    // Ajouter un utilisateur
    const postUser = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    firstName,
                    lastName
                })
            });

            if (res.ok) {
                setFirstName("");
                setLastName("");
                setId("");
                loadUsers();
            }

        } catch (err) {
            console.error("Erreur POST", err);
        }
    };

    // Supprimer un utilisateur
    const deleteUser = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                loadUsers();
            }

        } catch (err) {
            console.error("Erreur DELETE", err);
        }
    };

    return (
        <div className="container p-5">

            <h1>Liste des étudiants</h1>

            <form onSubmit={postUser} className="mb-4">

                <input
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <input
                    placeholder="id"
                    value={id}
                    onChange={(e) => setId(Number(e.target.value))}
                />

                <button type="submit">Ajouter</button>

            </form>

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.firstName} {user.lastName} {user.id}

                        <button onClick={() => deleteUser(user.id)}>
                            X
                        </button>

                    </li>
                ))}
            </ul>

        </div>
    );
}

export default App;