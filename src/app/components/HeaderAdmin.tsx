"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Toast,
  ToastContainer,
  Image,
} from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

export default function HeaderAdmin() {
  const router = useRouter();
  const pathname = usePathname();
  const [showToast, setShowToast] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push("/admin");
      }, 3000);
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <>
      <Navbar
        style={{ backgroundColor: "#f5b3c3" }}
        variant="light"
        expand="lg"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand
            href="/admin"
            className="d-flex align-items-center gap-2"
          >
            <Image
              src="/logo3amores.png"
              alt="Logo 3 Amores"
              width={50}
              height={50}
              roundedCircle
            />
            <span className="fw-bold text-brown">Painel Admin</span>
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Nav.Link
              href="/admin/produtos"
              active={pathname === "/admin/produtos"}
              className="text-brown"
            >
              Produtos
            </Nav.Link>
            <Nav.Link
              href="/admin/videos"
              active={pathname === "/admin/videos"}
              className="text-brown"
            >
              Vídeos
            </Nav.Link>
            <Button variant="outline-dark" size="sm" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1" />
              Sair
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Sucesso</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Você saiu com sucesso.</Toast.Body>
        </Toast>
      </ToastContainer>

      <style jsx>{`
        .text-brown {
          color: #8b4513;
        }
      `}</style>
    </>
  );
}
