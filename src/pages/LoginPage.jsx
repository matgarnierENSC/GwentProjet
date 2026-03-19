import { loginWithGoogle } from "../services/firebaseService";
import { Button, Box, Typography } from "@mui/material";

function LoginPage() {
  function handleLogin() {
    loginWithGoogle().catch((err) => console.error("Erreur login :", err));
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap={3}
    >
      <Typography variant="h4">Card Battle</Typography>
      <Typography variant="subtitle1">Jeu de cartes Gwent</Typography>
      <Button variant="contained" onClick={handleLogin}>
        Se connecter avec Google
      </Button>
    </Box>
  );
}

export default LoginPage;