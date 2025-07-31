"use client";

import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QRScanner({ onScanSuccess }) {
  const scannerRef = useRef(null);
  const isStartedRef = useRef(false);

  useEffect(() => {
    const scanner = new Html5Qrcode("reader", { verbose: false });
    scannerRef.current = scanner;

    let isMounted = true;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices.length && isMounted && !isStartedRef.current) {
          const cameraId = devices[0].id;

          scanner
            .start(
              cameraId,
              {
                fps: 10,
                qrbox: (w, h) => {
                  const minEdge = Math.min(w, h);
                  const boxSize = Math.floor(minEdge * 0.7);
                  return { width: boxSize, height: boxSize };
                },
                aspectRatio: 1.0,
              },
              (decodedText) => {
                if (isStartedRef.current) {
                  isStartedRef.current = false;
                  onScanSuccess(decodedText);

                  scanner
                    .stop()
                    .then(() => scanner.clear())
                    .catch((err) =>
                      console.warn("Stop error (ignored):", err.message)
                    );
                }
              },
              () => {}
            )
            .then(() => {
              isStartedRef.current = true;
            })
            .catch((err) => {
              console.error("Start camera error:", err.message);
            });
        }
      })
      .catch((err) => {
        console.error("Camera access error:", err.message);
      });

    return () => {
      isMounted = false;

      if (scannerRef.current && isStartedRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current.clear();
            isStartedRef.current = false;
          })
          .catch((err) => {
            if (!err.message.includes("not running")) {
              console.warn("Unmount stop error:", err.message);
            }
          });
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 px-4">
      <div
        id="reader"
        className="w-full max-w-md aspect-square rounded-xl overflow-hidden border border-blue-500 shadow-lg"
      />
    </div>
  );
}
