"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Container, Row, Col, Card } from "react-bootstrap";

interface Video {
  id: string;
  videoUrl: string;
}

export default function VideosPublicos() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const buscarVideos = async () => {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const lista: Video[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        lista.push({ id: doc.id, ...data } as Video);
      });

      setVideos(lista);
    };

    buscarVideos();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Vídeos e Bastidores 🎥</h1>
      <p className="text-center text-muted">
        Conheça os encantos por trás dos nossos mini donuts 🍩
      </p>

      <Row>
        {videos.map((video) => (
          <Col md={6} lg={4} className="mb-4" key={video.id}>
            <Card className="shadow-sm h-100">
              <video
                src={video.videoUrl}
                controls
                autoPlay
                muted
                playsInline
                loop
                width="100%"
                style={{ borderRadius: "0.3rem" }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
