import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f5b3c3",
        color: "white",
      }}
      className="text-center py-4 mt-5"
    >
      <Container>
        <p className="mb-1">© 2025 3 Amores. Todos os direitos reservados.</p>
        <p className="mb-0">
          Desenvolvido por:{" "}
          <a
            href="mailto:taisadefante@hotmail.com"
            style={{
              color: "#5c3a1e", // marrom
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Defan Soluções Digitais
          </a>
        </p>
      </Container>
    </footer>
  );
}
