"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { type User } from "firebase/auth";
import { Button, Container } from "react-bootstrap";

export default function PainelAdmin() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      if (usuario) setUser(usuario);
      else router.push("/admin/login");
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <Container className="py-5 text-center">
      <h2 className="mb-4">Painel Administrativo</h2>
      <p>Bem-vindo, {user?.email}</p>
      <Button variant="outline-dark" href="/admin/produtos" className="m-2">
        Gerenciar Produtos
      </Button>
      <Button variant="outline-dark" href="/admin/videos" className="m-2">
        Gerenciar Vídeos
      </Button>
    </Container>
  );
}
