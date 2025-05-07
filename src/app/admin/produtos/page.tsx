"use client";

import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Table,
  Modal,
} from "react-bootstrap";
import Image from "next/image";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Produto {
  id: string;
  nome?: string;
  tema?: string;
  descricao?: string;
  imagemUrl: string;
  imagemPath: string;
}

export default function ProdutosPage() {
  const [nome, setNome] = useState<string>("");
  const [tema, setTema] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [mensagem, setMensagem] = useState<string>("");
  const [modoEdicao, setModoEdicao] = useState<boolean>(false);
  const [produtoIdEdicao, setProdutoIdEdicao] = useState<string>("");
  const [imagemPathAntiga, setImagemPathAntiga] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const carregarProdutos = async (): Promise<void> => {
    const querySnapshot = await getDocs(collection(db, "produtos"));
    const lista: Produto[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      lista.push({ id: doc.id, ...data } as Produto);
    });
    setProdutos(lista);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const resetarFormulario = (): void => {
    setNome("");
    setTema("");
    setDescricao("");
    setImagem(null);
    setProdutoIdEdicao("");
    setImagemPathAntiga("");
    setModoEdicao(false);
    setMensagem("");
  };

  const abrirModal = (): void => {
    resetarFormulario();
    setShowModal(true);
  };

  const fecharModal = (): void => {
    setShowModal(false);
    resetarFormulario();
  };

  const salvarProduto = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (modoEdicao) {
      const docRef = doc(db, "produtos", produtoIdEdicao);
      let novaImagemUrl = "";
      let novaImagemPath = imagemPathAntiga;

      if (imagem) {
        if (imagemPathAntiga) {
          await deleteObject(ref(storage, imagemPathAntiga));
        }
        novaImagemPath = `produtos/${uuidv4()}-${imagem.name}`;
        const novaImagemRef = ref(storage, novaImagemPath);
        await uploadBytes(novaImagemRef, imagem);
        novaImagemUrl = await getDownloadURL(novaImagemRef);
      }

      await updateDoc(docRef, {
        nome,
        tema,
        descricao,
        ...(imagem && {
          imagemUrl: novaImagemUrl,
          imagemPath: novaImagemPath,
        }),
      });

      setMensagem("Produto atualizado com sucesso!");
    } else {
      if (!imagem) {
        setMensagem("A imagem é obrigatória.");
        return;
      }

      const imagemPath = `produtos/${uuidv4()}-${imagem.name}`;
      const imagemRef = ref(storage, imagemPath);
      await uploadBytes(imagemRef, imagem);
      const imagemUrl = await getDownloadURL(imagemRef);

      await addDoc(collection(db, "produtos"), {
        nome,
        tema,
        descricao,
        imagemUrl,
        imagemPath,
      });

      setMensagem("Produto cadastrado com sucesso!");
    }

    carregarProdutos();
    fecharModal();
  };

  const excluirProduto = async (
    id: string,
    imagemPath: string
  ): Promise<void> => {
    await deleteDoc(doc(db, "produtos", id));
    await deleteObject(ref(storage, imagemPath));
    carregarProdutos();
  };

  const editarProduto = (produto: Produto): void => {
    setNome(produto.nome || "");
    setTema(produto.tema || "");
    setDescricao(produto.descricao || "");
    setProdutoIdEdicao(produto.id);
    setImagemPathAntiga(produto.imagemPath);
    setModoEdicao(true);
    setImagem(null);
    setShowModal(true);
  };

  return (
    <Container className="py-5">
      <div className="mb-4 text-start">
        <h2 className="mb-3">Produtos</h2>
        <Button
          onClick={abrirModal}
          style={{
            backgroundColor: "#8B4513",
            color: "#fff",
            border: "none",
          }}
        >
          <i className="bi bi-plus-circle me-1"></i> Adicionar Produto
        </Button>
      </div>

      <Modal show={showModal} onHide={fecharModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicao ? "Editar Produto" : "Novo Produto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mensagem && <Alert variant="success">{mensagem}</Alert>}
          <Form onSubmit={salvarProduto}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tema</Form.Label>
                  <Form.Control
                    type="text"
                    value={tema}
                    onChange={(e) => setTema(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                Imagem {modoEdicao && "(deixe vazio para manter a atual)"}
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImagem(e.target.files?.[0] || null)}
              />
            </Form.Group>

            <Button type="submit" variant="warning" className="w-100 mb-3">
              {modoEdicao ? "Atualizar Produto" : "Cadastrar Produto"}
            </Button>

            {modoEdicao && (
              <Button
                variant="secondary"
                className="w-100"
                onClick={fecharModal}
              >
                Cancelar Edição
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>

      <h4 className="mb-3">Produtos Cadastrados</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Tema</th>
            <th>Descrição</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>
                <Image
                  src={produto.imagemUrl}
                  alt={produto.nome || "Produto"}
                  width={80}
                  height={80}
                  className="rounded"
                  style={{ objectFit: "cover" }}
                />
              </td>
              <td>{produto.nome || "-"}</td>
              <td>{produto.tema || "-"}</td>
              <td>{produto.descricao || "-"}</td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => editarProduto(produto)}
                    title="Editar"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() =>
                      excluirProduto(produto.id, produto.imagemPath)
                    }
                    title="Excluir"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
