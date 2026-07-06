"use client";

import { useEffect, type RefObject } from "react";

/**
 * GSAP kurulumunu bölüm görünüme yaklaşınca (~600px kala) çalıştırır.
 * Amaç TBT düşürmek: içerik her zaman DOM'da, sadece animasyon
 * kurulumu sayfa açılış anından çıkarılır.
 */
export function useDeferredSetup(
  ref: RefObject<HTMLElement | null>,
  setup: () => (() => void) | void,
  deps: readonly unknown[]
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cleanup: (() => void) | void;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          cleanup = setup();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (typeof cleanup === "function") cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
