"use client";
import Head from "next/head";

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

      const videosAleatorios = listaVideos.sort(() => Math.random() - 0.5);

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
      <Head>
        <title>Mini Donuts para Festas em Campo Grande - RJ | 3 Amores</title>
        <meta
          name="description"
          content="Mini donuts personalizados para festas e eventos em Campo Grande, Rio de Janeiro. Encomende agora nossos mini cake donuts artesanais!"
        />
        <meta
          name="keywords"
          content="mini donuts, doces personalizados, festa infantil, casamento, Campo Grande, Rio de Janeiro, mini cake donuts, 3 Amores"
        />
        <meta name="author" content="3 Amores Doces Artesanais" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="BR-RJ" />
        <meta name="geo.placename" content="Campo Grande, Rio de Janeiro" />
        <meta name="geo.position" content="-22.9014;-43.5616" />
        <meta name="ICBM" content="-22.9014, -43.5616" />
        <link rel="canonical" href="https://3amores.defan.com.br/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Bakery",
              name: "3 Amores Mini Donuts",
              image: "https://3amores.defan.com.br/logo.jpg",
              "@id": "https://3amores.defan.com.br",
              url: "https://3amores.defan.com.br",
              telephone: "+5521996696713",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Campo Grande",
                addressLocality: "Rio de Janeiro",
                postalCode: "23000-000",
                addressCountry: "BR",
              },
              areaServed: "Campo Grande, Rio de Janeiro",
              description:
                "Mini donuts artesanais personalizados para festas, casamentos e eventos. Atendemos Campo Grande e regiões próximas no Rio de Janeiro.",
            }),
          }}
        />
      </Head>

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
          <p
            className="lead"
            style={{
              fontSize: "1.25rem",
              color: "#4B2E1E",
              fontWeight: "bold",
            }}
          >
            Mini cake donuts com carinho e sabor
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
          Sobre Juliana Azevedo
        </h2>
        <Container>
          <p className="mx-auto" style={{ maxWidth: 700, color: "#fff" }}>
            Juliana é a alma por trás da 3 Amores. Com amor pela confeitaria e
            atenção aos detalhes, ela transforma cada mini cake donuts em uma
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
      </section>

      <WaveDivider />

      <section className="py-5 bg-white text-center">
        <h2 className="mb-4" style={{ color: "#8b4513", textAlign: "center" }}>
          Nossos vídeos
        </h2>
        <Container>
          <Row className="justify-content-center">
            {videos.slice(0, 3).map((video) => (
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
      </section>

      <WaveDivider flip />

      <section
        className="py-5 text-center"
        style={{
          background: "linear-gradient(135deg, #ffe8dc, #fff0f5)",
          color: "#8b4513",
        }}
      >
        <Container>
          <h2 className="mb-4 fw-bold" style={{ fontSize: "2.2rem" }}>
            Transforme sua festa em um momento inesquecível 🎉
          </h2>
          <p
            className="mx-auto"
            style={{
              maxWidth: "700px",
              fontSize: "1.1rem",
              color: "#5c3b2e",
            }}
          >
            Encante seus convidados com nossos mini donuts artesanais!
            Personalizamos com o tema da sua festa, entregamos com carinho e
            garantimos aquele “uau” na sua mesa. Ideal para aniversários, chás
            de bebê, eventos corporativos e muito mais!
          </p>

          <div className="mt-4">
            <a
              href="https://wa.me/5521996696713?text=Olá!%20Gostaria%20de%20encomendar%20mini%20donuts%20para%20minha%20festa!"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#f5b3c3",
                color: "#fff",
                border: "none",
                borderRadius: "30px",
                padding: "12px 30px",
                fontWeight: "bold",
                fontSize: "1rem",
                textDecoration: "none",
                animation: "pulse 2s infinite",
              }}
            >
              <i className="bi bi-whatsapp me-2"></i> Quero encantar minha
              festa!
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
        href="https://wa.me/5521996696713"
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
    </>
  );
}
