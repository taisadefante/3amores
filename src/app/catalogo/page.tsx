"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

interface Produto {
  id: string;
  nome?: string;
  tema?: string;
  descricao?: string;
  imagemUrl: string;
}

export default function CatalogoPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [temas, setTemas] = useState<string[]>([]);
  const [temaSelecionado, setTemaSelecionado] = useState<string>("todos");

  useEffect(() => {
    const buscarProdutos = async () => {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      const lista: Produto[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.imagemUrl) {
          lista.push({ id: doc.id, ...data } as Produto);
        }
      });

      setProdutos(lista);

      const temasUnicos = new Set<string>(
        lista
          .map((p) => p.tema)
          .filter(
            (tema): tema is string =>
              typeof tema === "string" && tema.trim() !== ""
          )
      );

      setTemas(Array.from(temasUnicos));
    };

    buscarProdutos();
  }, []);

  const produtosFiltrados =
    temaSelecionado === "todos"
      ? produtos
      : produtos.filter((produto) => produto.tema === temaSelecionado);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Nosso Catálogo 🍩</h1>
      <p className="text-center text-muted">
        Veja todos os nossos mini donuts separados por temas encantadores
      </p>

      {/* Select de tema */}
      <Form.Group className="mb-4 text-center">
        <Form.Label className="fw-bold me-2">Filtrar por tema:</Form.Label>
        <Form.Select
          style={{ maxWidth: "300px", margin: "0 auto" }}
          value={temaSelecionado}
          onChange={(e) => setTemaSelecionado(e.target.value)}
        >
          <option value="todos">Todos os temas</option>
          {temas.map((tema) => (
            <option key={tema} value={tema}>
              {tema}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Produtos renderizados */}
      <Row>
        {produtosFiltrados.map((produto) => (
          <Col md={4} lg={3} sm={6} key={produto.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={produto.imagemUrl}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                {produto.nome && (
                  <Card.Title className="fw-bold">{produto.nome}</Card.Title>
                )}
                {produto.descricao && (
                  <Card.Text
                    className="text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {produto.descricao}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
