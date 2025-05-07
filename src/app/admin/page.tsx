"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import {
  Container,
  Form,
  Button,
  Card,
  Alert,
  InputGroup,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push("/admin/painel");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro no login:", error.message);
      }
      setErro("Email ou senha inválidos.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ maxWidth: "400px", width: "100%" }} className="shadow">
        <Card.Body>
          <h3 className="mb-4 text-center">Login Admin</h3>
          {erro && <Alert variant="danger">{erro}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Senha</Form.Label>
              <InputGroup>
                <Form.Control
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setMostrarSenha((prev) => !prev)}
                  tabIndex={-1}
                >
                  <i
                    className={`bi ${mostrarSenha ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </Button>
              </InputGroup>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Entrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
