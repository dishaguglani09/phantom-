"use client";

import { useEffect, useRef, useState } from "react";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scanA, setScanA] = useState<string | null>(null);
  const [scanB, setScanB] = useState<string | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera access denied:", error);
      }
    }

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg");

    if (!scanA) {
      setScanA(image);
    } else {
      setScanB(image);
    }
  }

  const currentScan = !scanA ? "SCAN A" : "SCAN B";

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6">

      {/* Current Scan */}
      <p className="text-sm tracking-[0.2em] text-gray-400">
        {scanB ? "SCAN COMPLETE" : currentScan}
      </p>

      {/* Camera */}
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-gray-700 bg-gray-950">

        {!scanA ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
        ) : !scanB ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={scanB}
            alt="Captured Scan B"
            className="h-full w-full object-cover"
          />
        )}

      </div>

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Capture button */}
      {!scanB && (
        <button
          onClick={capturePhoto}
          className="rounded-xl bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200"
        >
          CAPTURE {currentScan}
        </button>
      )}

      {/* Scan status */}
      <div className="flex gap-4 text-sm">
        <span className={scanA ? "text-green-400" : "text-gray-500"}>
          {scanA ? "✓" : "○"} Scan A
        </span>

        <span className={scanB ? "text-green-400" : "text-gray-500"}>
          {scanB ? "✓" : "○"} Scan B
        </span>
      </div>

    </div>
  );
}