const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ringImage = new Image();
ringImage.src = 'images/allora (1).png';
const preview = document.getElementById('preview');

function drawImageFitted(img) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const canvasSize = canvas.width;
  const circleRadius = canvasSize / 2 - 40;

  const scale = Math.min(1, (circleRadius * 1.6) / img.width, (circleRadius * 1.6) / img.height);

  const drawWidth = img.width * scale;
  const drawHeight = img.height * scale;
  const x = (canvasSize - drawWidth) / 2;
  const y = (canvasSize - drawHeight) / 2;

  ctx.save();
  ctx.beginPath();
  ctx.arc(canvasSize / 2, canvasSize / 2, circleRadius, 0, Math.PI * 2);
  ctx.clip();

  ctx.drawImage(img, x, y, drawWidth, drawHeight);
  ctx.restore();

  ctx.drawImage(ringImage, 0, 0, canvasSize, canvasSize);

  preview.src = canvas.toDataURL();
}

function handleImage(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = () => drawImageFitted(img);
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

upload.addEventListener('change', function () {
  handleImage(this.files[0]);
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'allora-badge.png';
  link.href = canvas.toDataURL();
  link.click();
});

document.getElementById('tweetBtn').addEventListener('click', () => {
  const tweetText = encodeURIComponent(
    'Just made my @AlloraNetwork Support Badge. Join the movement for decentralized AI. I support the Allora thing'
  );
  const tweetURL = `https://twitter.com/intent/tweet?text=${tweetText}`;
  window.open(tweetURL, '_blank');
});
