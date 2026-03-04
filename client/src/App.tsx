import { useEffect, useState } from "react";
// Définition d'une interface pour le typage
// Sera couvert plus en profondeur en TH
interface User {
    id: number;
    firstName: string;
    lastName: string;
}
function App() {
// 1. Définition de l'état
    const [data, setData] = useState<User[]>([]);
// 2. Appel API au montage du composant
    useEffect(() => {
        fetch("http://localhost:3000/api/users")
            .then(res => res.json())
            .then(result => {  console.log("React reçoit :", result);
                setData(result);
            })
            .catch(err => console.error(err));
    }, []);
// 3. Rendu (JSX)
    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.firstName}</li>
                ))}
            </ul>
        </div>
    );
}
export default App;