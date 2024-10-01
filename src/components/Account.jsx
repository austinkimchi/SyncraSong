import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";


const buttonTheme = createTheme({
  typography: {
    fontFamily: "Fort",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Fort",
          fontSize: "24px",
          color: "rgb(100, 108, 255)",
          textTransform: "none",
        },
      },
    },
  },
});

export default function Account() {
  const [account, setAccount] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetchAccountInfo();
    }
  }, [token]);

  const fetchAccountInfo = async () => {
    try {
      const response = await fetch(
        "https://syncrasongapi.austin.kim/auth/users/info",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      if (response.ok && data) {
        setAccount(data);
        localStorage.setItem("user_data", JSON.stringify(data.user));
      } else {
        handleLogout();
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage(
        "Failed to get account data. Servers may not be responding."
      );
      console.error("Failed to get account data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    setToken(null);
    setAccount(null);
  };

  const handleLogin = () => {
    setShowDialog(true);
  };

  const handleLoginSubmit = async () => {
    const userID = document.getElementById("userID").value;
    const password = document.getElementById("password").value;

    try {
      const data = await login(userID, password);
      if (data && data.token) {
        setToken(data.token);
        setShowDialog(false);
        window.location.reload();
      } else {
        setShowError(true);
        setErrorMessage("Failed to login: Check credentials");
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage("Failed to login: " + error.message);
      console.error("Failed to login:", error);
    }
  };

  const login = async (userID, password) => {
    try {
      const response = await fetch(
        "https://syncrasongapi.austin.kim/auth/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userID, password }),
        }
      );
      const data = await response.json();

      if (response.ok && data && data.token) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        handleFailedLogin(response);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleFailedLogin = (response) => {
    setShowError(true);
    setErrorMessage(
      response.status === 401
        ? "Invalid password."
        : response.status === 403
        ? "Needs reauthorization."
        : response.status === 404
        ? "User not found."
        : "Unknown error."
    );
  };

  return (
    <>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>Please login to your account.</DialogContentText>
          {showError && (
            <DialogContentText style={{ color: "red" }}>
              {errorMessage}
            </DialogContentText>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="userID"
            label="Username"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLoginSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>

      {account ? (
        <>
          <p className="header">{account.username}</p>
          <ThemeProvider theme={buttonTheme}>
            <Button onClick={() => console.log(account)}>Account</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </ThemeProvider>
        </>
      ) : (
        <Button onClick={handleLogin} className="header">
          Login
        </Button>
      )}
    </>
  );
}
