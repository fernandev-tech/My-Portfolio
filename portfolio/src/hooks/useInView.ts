"use client";

import { useEffect, useRef, useState } from "react";

export function useInView() {
  /*Criando a caixinha que será preenchida mais tarde pelo React de forma automática. Ela começa vazia. Ele guarda a referência de um elemento HTML*/
  const ref = useRef<HTMLElement>(null)
  /*"Quanto o elemento já avançou no seu percurso de entrada?". A animação ainda não começou (0).*/
  const [progress, setProgress] = useState(0);

  /*O useEffect roda depois que o React desenha os componentes na tela*/
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      /*Como obter a altura da tela?*/
      const rect = ref.current.getBoundingClientRect();

      console.log(rect.top);

      const viewportHeight = window.innerHeight;
      /*Como calcular start?*/
      const start = viewportHeight * 0.9;
      /*Como calcular end?*/
      const end = viewportHeight * 0.3;
      /*Como calcular progress?
       Medir o avanço.*/
      const rawProgress = (start - rect.top) / (start - end)
      /*Como limitar progress entre 0 e 1?
      garante que esse avanço fique dentro do intervalo que queremos.*/
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
      setProgress(clampedProgress);

    };


    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { ref, progress };

}
