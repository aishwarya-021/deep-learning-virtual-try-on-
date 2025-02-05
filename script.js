let stream = null; // Variable to hold the webcam stream
let webcamActive = false; // Variable to track webcam status

async function toggleWebcam() {
    const constraints = {
        video: true,
    };

    if (!webcamActive) {
        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            const video = document.getElementById('webcam-video');
            video.srcObject = stream;
            document.getElementById('webcam-container').style.display = 'block';
            document.getElementById('tryon-btn').textContent = 'Hide Webcam';
            webcamActive = true;
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }
    } else {
        discardWebcam();
    }
}

function discardWebcam() {
    const video = document.getElementById('webcam-video');
    video.srcObject = null;  // Stop the webcam feed
    stream.getTracks().forEach(track => track.stop());  // Stop all tracks in the stream
    document.getElementById('webcam-container').style.display = 'none';
    document.getElementById('tryon-btn').textContent = 'Try On';
    webcamActive = false;
}
