"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Container, Row, Col, Card } from "react-bootstrap";
import WaveDivider from "./components/WaveDivider";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
}

interface Video {
  id: string;
  videoUrl: string;
  descricao?: string;
}

export default function HomePage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [grupoIndex, setGrupoIndex] = useState<number>(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const carregar = async () => {
      const prodSnap = await getDocs(collection(db, "produtos"));
      const vidSnap = await getDocs(collection(db, "videos"));

      const listaProdutos: Produto[] = prodSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Produto[];

      const listaVideos: Video[] = vidSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Video[];

      const videosAleatorios = listaVideos
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      setProdutos(listaProdutos);
      setVideos(videosAleatorios);
    };

    carregar();
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setGrupoIndex((prev) =>
        produtos.length > 0 ? (prev + 1) % Math.ceil(produtos.length / 3) : 0
      );
    }, 5000);
    return () => clearInterval(intervalo);
  }, [produtos]);

  const grupoProdutos = produtos.slice(grupoIndex * 3, grupoIndex * 3 + 3);

  return (
    <>
      <section
        className="text-center py-5 position-relative mb-3"
        style={{
          background: "linear-gradient(135deg, #fff6f0, #ffe8dc)",
          overflow: "hidden",
        }}
        data-aos="fade-down"
      >
        <div className="container">
          <h1
            className="mb-3 fw-bold"
            style={{ fontSize: "2.8rem", color: "#d17e53" }}
          >
            3 Amores 🍩
          </h1>
          <p className="lead text-muted" style={{ fontSize: "1.25rem" }}>
            Mini donuts com carinho e sabor
          </p>

          <a
            href="https://wa.me/5521996696713"
            target="_blank"
            rel="noopener noreferrer"
            className="d-inline-block fw-semibold mb-4"
            style={{
              backgroundColor: "#f5b3c3",
              color: "#fff",
              padding: "0.6rem 1.4rem",
              borderRadius: "2rem",
              textDecoration: "none",
              fontSize: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              animation: "pulse 2s infinite",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <i className="bi bi-whatsapp me-2"></i> Fale Conosco
          </a>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "80px",
            background:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1440 320' xmlns='http://www.w3.org/2000/svg'><path fill='%23fff' fill-opacity='1' d='M0,192L48,176C96,160,192,128,288,117.3C384,107,480,117,576,122.7C672,128,768,128,864,117.3C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path></svg>\")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
      </section>

      <WaveDivider />

      <section
        className="py-5 text-center"
        style={{ backgroundColor: "#f5b3c3" }}
        data-aos="fade-up"
      >
        <h2 className="mb-4" style={{ color: "#8b4513" }}>
          Sobre Juliana Defante
        </h2>
        <Container>
          <p className="mx-auto" style={{ maxWidth: 700, color: "#fff" }}>
            Juliana é a alma por trás da 3 Amores. Com amor pela confeitaria e
            atenção aos detalhes, ela transforma cada mini donut em uma
            experiência doce e memorável. Tudo é feito com carinho, cuidado e um
            toque artesanal único. 💕
          </p>
        </Container>
      </section>

      <WaveDivider flip />

      <section className="py-5" style={{ backgroundColor: "#f5b3c3" }}>
        <h2 className="mb-4" style={{ color: "#8b4513", textAlign: "center" }}>
          Destaques do Catálogo
        </h2>
        <Container>
          <Row className="justify-content-center">
            {grupoProdutos.map((produto) => (
              <Col
                md={4}
                sm={6}
                key={produto.id}
                className="mb-4"
                data-aos="zoom-in"
              >
                <Card className="h-100 shadow-sm text-center">
                  <Card.Img
                    variant="top"
                    src={produto.imagemUrl}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{produto.nome}</Card.Title>
                    <Card.Text>{produto.descricao}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4" data-aos="fade-up">
            <a href="/catalogo">
              <button
                style={{
                  backgroundColor: "#fff",
                  color: "#8b2c43",
                  border: "2px solid #f5b3c3",
                  borderRadius: "30px",
                  padding: "10px 25px",
                  fontWeight: "bold",
                  animation: "pulse 2s infinite",
                }}
              >
                Ver Catálogo Completo
              </button>
            </a>
          </div>
        </Container>

        <style>{`
    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(139, 44, 67, 0.6);
      }
      70% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(139, 44, 67, 0);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(139, 44, 67, 0);
      }
    }
  `}</style>
      </section>

      <WaveDivider />

      <section className="py-5 bg-white text-center">
        <h2 className="mb-4" style={{ color: "#8b4513", textAlign: "center" }}>
          Nossos vídeos
        </h2>
        <Container>
          <Row className="justify-content-center">
            {videos.map((video) => (
              <Col md={4} key={video.id} className="mb-4" data-aos="fade-up">
                <div className="ratio ratio-16x9">
                  <video
                    src={video.videoUrl}
                    controls
                    autoPlay
                    muted
                    playsInline
                    loop
                  />
                </div>
                {video.descricao && <p className="mt-2">{video.descricao}</p>}
              </Col>
            ))}
          </Row>

          <div className="mt-4">
            <a href="/videos">
              <button
                style={{
                  backgroundColor: "#f5b3c3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "30px",
                  padding: "10px 25px",
                  fontWeight: "bold",
                  animation: "pulse 2s infinite",
                }}
              >
                Veja todos os nossos vídeos
              </button>
            </a>
          </div>
        </Container>

        <style>{`
    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(245, 179, 195, 0.6);
      }
      70% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(245, 179, 195, 0);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(245, 179, 195, 0);
      }
    }
  `}</style>
      </section>

      <WaveDivider flip />

      <a
        href="https://wa.me/5521988359825"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <i className="bi bi-whatsapp fs-2 text-white"></i>
      </a>

      <style jsx>{`
        .whatsapp-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          background-color: #25d366;
          border-radius: 50%;
          z-index: 9999;
          animation: pulse 1.5s infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6);
          }
          70% {
            transform: scale(1.1);
            box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
      `}</style>
    </>
  );
}
