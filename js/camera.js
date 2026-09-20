let streamCamera = null;

async function iniciarCamera(videoElement) {
    try {
        streamCamera = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
            audio: false
        });

        videoElement.srcObject = streamCamera;

        return true;
    } catch (erro) {
        console.error("Erro ao acessar a câmera:", erro);
        return false;
    }
}

function pararCamera() {
    if (!streamCamera) {
        return;
    }

    streamCamera.getTracks().forEach(track => {
        track.stop();
    });

    streamCamera = null;
}

function capturarFoto(videoElement) {
    if (!videoElement.videoWidth || !videoElement.videoHeight) {
        return null;
    }

    const canvas = document.createElement("canvas");

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const contexto = canvas.getContext("2d");

    contexto.drawImage(
        videoElement,
        0,
        0,
        canvas.width,
        canvas.height
    );

    return canvas.toDataURL("image/jpeg", 0.8);
}