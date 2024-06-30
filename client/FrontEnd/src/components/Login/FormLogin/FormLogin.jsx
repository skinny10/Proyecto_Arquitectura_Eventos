import { Card, Button, Input, Label } from "../../UI";
import { useNavigate } from "react-router-dom";
import "./FormLogin.css";
import { useState } from "react";
import Swal from "sweetalert2";

function FormLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          Swal.fire({
            title: "Error!",
            text: "No estás autorizado a entrar a la casa",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (response.status === 401) {
          Swal.fire({
            title: "Error!",
            text: `Credenciales inválidas. Intentos restantes: ${data.attemptsLeft}`,
            icon: "warning",
            confirmButtonText: "OK",
          });
        } else {
          throw new Error(
            data.error || `HTTP error! status: ${response.status}`
          );
        }
        return;
      }

      console.log("Login exitoso:", data);
      navigate("/home");
    } catch (error) {
      console.error("Error completo:", error);
      setError(error.message || "Ocurrió un error durante el inicio de sesión");
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center text-white">
      <Card className="p-6">
        <h1 className="text-2xl font-bold text-white ">Door</h1>
        <form className="login-box" onSubmit={handleSubmit}>
          <div className="user-box">
            <Label className="label_login" htmlFor="Username">
              Username
            </Label>
            <Input
              className="input_login"
              label="Write your username"
              type="text"
              name="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
            />
          </div>

          <div className="user-box">
            <Label htmlFor="password">Password</Label>
            <Input
              className="input_login"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
          </div>

          {error && <p>{error}</p>}

          <Button type="submit">Open</Button>
        </form>
      </Card>
    </div>
  );
}

export default FormLogin;
