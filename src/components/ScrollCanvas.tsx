import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 238;

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let dpr = 1;
    let targetFrame = 0;
    let currentFrame = 0;
    let lastDrawnFrame = -1;
    let animationFrameId: number;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;

    function getFramePath(index: number) {
      const frameNum = String(index + 1).padStart(3, '0');
      return `${baseUrl}images/ezgif-frame-${frameNum}.jpg`;
    }

    function getClosestLoadedFrame(index: number) {
      if (images[index] && images[index].complete && images[index].naturalWidth > 0) {
        return images[index];
      }
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = index - offset;
        if (prev >= 0 && images[prev] && images[prev].complete && images[prev].naturalWidth > 0) {
          return images[prev];
        }
        const next = index + offset;
        if (next < TOTAL_FRAMES && images[next] && images[next].complete && images[next].naturalWidth > 0) {
          return images[next];
        }
      }
      return images[0] && images[0].complete && images[0].naturalWidth > 0 ? images[0] : null;
    }

    function drawFrame(index: number) {
      const img = getClosestLoadedFrame(index);
      if (!img || !canvas || !ctx) return;

      const iw = img.naturalWidth || 1280;
      const ih = img.naturalHeight || 720;

      // Full-bleed cover scale: fills the entire viewport edge-to-edge
      const scale = Math.max(canvas.width / iw, canvas.height / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (canvas.width - dw) / 2;
      const dy = (canvas.height - dh) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssWidth = window.innerWidth;
      const cssHeight = window.innerHeight;

      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      lastDrawnFrame = -1;
      drawFrame(Math.min(Math.max(Math.round(currentFrame), 0), TOTAL_FRAMES - 1));
    }

    function onScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      targetFrame = progress * (TOTAL_FRAMES - 1);
    }

    function loop() {
      const delta = targetFrame - currentFrame;
      if (Math.abs(delta) > 0.0005) {
        currentFrame += delta * 0.15;
      } else {
        currentFrame = targetFrame;
      }

      const frameToDraw = Math.min(Math.max(Math.round(currentFrame), 0), TOTAL_FRAMES - 1);
      if (frameToDraw !== lastDrawnFrame) {
        drawFrame(frameToDraw);
        lastDrawnFrame = frameToDraw;
      }

      animationFrameId = requestAnimationFrame(loop);
    }

    // Preload all 238 frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      if (i === 0) {
        if (img.complete) {
          resize();
          drawFrame(0);
        } else {
          img.onload = () => {
            resize();
            drawFrame(0);
          };
        }
      }
      if (img.decode) {
        img.decode().catch(() => {});
      }
      images[i] = img;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });

    resize();
    onScroll();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden bg-black">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* High-end glossy vignette overlays for contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />
    </div>
  );
}

