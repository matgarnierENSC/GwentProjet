import { useState, useEffect } from "react";
import { onAuthChange } from "./services/firebaseService";
import LoginPage from "./pages/LoginPage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Écoute si l'utilisateur est connecté ou non
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Chargement...</p>;

  // Si pas connecté → page de login
  if (!user) return <LoginPage />;

  // Si connecté → app principale
  return (
    <div>
      <p>Connecté : {user.displayName}</p>
      <p>Email : {user.email}</p>
      <img src={user.photoURL} alt="avatar" width={50} />
    </div>
  );
}

export default App;