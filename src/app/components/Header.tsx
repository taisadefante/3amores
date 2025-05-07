"use client";

import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Header() {
  const linkStyle = {
    color: "white",
    fontWeight: "500",
    textDecoration: "none",
  };

  const hoverStyle = {
    color: "#ffffffcc",
  };

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#f5b3c3" }}
      className="shadow-sm"
    >
      <Container>
        <Link
          href="/"
          className="navbar-brand d-flex align-items-center gap-2"
          style={linkStyle}
        >
          <Image
            src="/logo3amores.png"
            alt="Logo 3Amores"
            width={80}
            height={80}
            style={{ objectFit: "contain" }}
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Link href="/" className="nav-link" style={linkStyle}>
              Home
            </Link>
            <Link href="/catalogo" className="nav-link" style={linkStyle}>
              Catálogo
            </Link>
            <Link href="/videos" className="nav-link" style={linkStyle}>
              Vídeos
            </Link>
            <div className="d-flex align-items-center gap-3 ms-3">
              <a
                href="https://www.instagram.com/seu_instagram"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = "#ffffffcc")}
                onMouseOut={(e) => (e.currentTarget.style.color = "white")}
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://wa.me/5521988359825"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = "#ffffffcc")}
                onMouseOut={(e) => (e.currentTarget.style.color = "white")}
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
