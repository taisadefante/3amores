"use client";

import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Container, Form, Button, Alert, Table } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Video {
  id: string;
  videoUrl: string;
  videoPath: string;
}

export default function VideosPage() {
  const [video, setVideo] = useState<File | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [mensagem, setMensagem] = useState("");

  const carregarVideos = async () => {
    const querySnapshot = await getDocs(collection(db, "videos"));
    const lista: Video[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      lista.push({ id: doc.id, ...data } as Video);
    });
    setVideos(lista);
  };

  useEffect(() => {
    carregarVideos();
  }, []);

  const resetarFormulario = () => {
    setVideo(null);
    setMensagem("");
  };

  const salvarVideo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!video) {
      setMensagem("O vídeo é obrigatório.");
      return;
    }

    const videoPath = `videos/${uuidv4()}-${video.name}`;
    const videoRef = ref(storage, videoPath);
    await uploadBytes(videoRef, video);
    const videoUrl = await getDownloadURL(videoRef);

    await addDoc(collection(db, "videos"), {
      videoUrl,
      videoPath,
    });

    setMensagem("Vídeo enviado com sucesso!");
    resetarFormulario();
    carregarVideos();
  };

  const excluirVideo = async (id: string, videoPath: string) => {
    await deleteDoc(doc(db, "videos", id));
    await deleteObject(ref(storage, videoPath));
    carregarVideos();
  };

  return (
    <Container className="py-5">
      <h2 className="mb-3 text-start">Cadastro de Vídeos</h2>

      <Form onSubmit={salvarVideo}>
        {mensagem && <Alert variant="success">{mensagem}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Selecionar vídeo (formato .mp4 ou similar)</Form.Label>
          <Form.Control
            type="file"
            accept="video/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setVideo(e.currentTarget.files?.[0] || null)
            }
          />
        </Form.Group>

        <Button type="submit" variant="dark">
          <i className="bi bi-upload me-1"></i> Enviar Vídeo
        </Button>
      </Form>

      <hr className="my-5" />
      <h4 className="mb-3">Vídeos Cadastrados</h4>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Visualização</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>
                <video src={video.videoUrl} width="250" controls />
              </td>
              <td className="text-center">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => excluirVideo(video.id, video.videoPath)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
