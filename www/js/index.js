document.addEventListener('deviceready', function () {
  console.log('Device is ready!');

  // --- Device Plugin ---
  const deviceInfo = document.getElementById('device-info');
  deviceInfo.querySelector('p').innerHTML = `
    <b>Device:</b> ${device.model} <br>
    <b>Platform:</b> ${device.platform} <br>
    <b>Version:</b> ${device.version} <br>
    <b>UUID:</b> ${device.uuid}
  `;

  // --- Vibration Plugin ---
  const vibrateBtn = document.getElementById('vibrate-btn');
  vibrateBtn.addEventListener('click', () => {
    navigator.vibrate([200, 100, 200]);
  });

  // --- Battery Status Plugin ---
  const batteryInfo = document.getElementById('battery-info');
  window.addEventListener('batterystatus', function (status) {
    batteryInfo.querySelector('p').innerHTML = `<b>Battery:</b> ${status.level}% ${status.isPlugged ? '(Charging)' : ''}`;
  }, false);

  // --- Camera Plugin ---
  const cameraBtn = document.getElementById('camera-btn');
  const cameraPhoto = document.getElementById('camera-photo');

  cameraBtn.addEventListener('click', () => {
    navigator.camera.getPicture(
      function (imageData) {
        cameraPhoto.innerHTML = `<h2>Camera</h2><img src="data:image/jpeg;base64,${imageData}" />`;
      },
      function (err) {
        alert('Camera error: ' + err);
      },
      {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
      }
    );
  });

}, false);
