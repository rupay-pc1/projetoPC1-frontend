import { Html5QrcodeScanner } from 'html5-qrcode';
import { useState, useEffect } from 'react';

export default function QrCodeValidation() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const defaultCameraId = 'your_camera_id_here';

    const config = {
      qrbox: {
        width: 500,
        height: 500,
      },
      fps: 5,
      cameraId: defaultCameraId,
    };

    const scanner = new Html5QrcodeScanner('reader', config);

    scanner.render(success, error);

    return () => {
      scanner.clear();
    };
  }, []);

  function success(result) {
    setScanResult(result);
  }

  function error(err) {
    console.log(err);
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-2xl">
          Validação de QRCode
        </h1>
      </div>
      <div className="justify-center rounded-lg border shadow-sm p-6">
        <div>
          <div className="flex flex-col items-center mt-4">
            <div className="w-full max-w-md">
              <div>
                {scanResult ? (
                  <div>
                    Success: <a href={"http://" + scanResult}> {scanResult} </a>
                  </div>
                ) : (
                  <div id="reader"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
