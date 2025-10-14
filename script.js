const imageUrls = [
  "YenNhi.jpg","VietHa.jpg","VanKhanh.jpg","TuAnh.jpg","TueBinh.jpg","TramAnh.jpg",
  "ThaoNguyen.jpg","Thanh.jpg","ThanhHa.jpg","QuynhAnh.jpg","QuynhChi.jpg","PhamKhanhHuyen.jpg",
  "PhuongAnh.jpg","PhuongNhi.jpg","NgocHa.jpg","MinhNguyet.jpg","MinhAnh.jpg","MaiHongNgoc.jpeg",
  "ly.jpg","Khanh.jpg","KhanhLinh.jpg","hoa.jpg","Chi.jpg","BichNgoc.jpg"
];

// === HIỆU ỨNG HẠT TRÁI TIM ===
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const heartPoints = [];

function heartFunction(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
  return {x, y};
}

// Giảm mật độ hạt (đỡ lag trên điện thoại)
for (let i = 0; i < Math.PI * 2; i += 0.05) {
  heartPoints.push(heartFunction(i));
}

function createParticles() {
  particles = [];
  const box = document.getElementById("messageBox").getBoundingClientRect();
  const centerX = box.left + box.width / 2;
  const centerY = box.top + box.height / 2;
  const scale = Math.min(box.width, box.height) * 0.9;

  for (let p of heartPoints) {
    const px = centerX + p.x * (scale / 16);
    const py = centerY - p.y * (scale / 16);
    particles.push({
      x: px,
      y: py,
      baseX: px,
      baseY: py,
      size: Math.random() * 2 + 0.5,
      color: `rgba(255,${100 + Math.random()*120},${150 + Math.random()*105},0.9)`
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
}

const mouse = { x: undefined, y: undefined, radius: 80 };
window.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  mouse.x = touch.clientX;
  mouse.y = touch.clientY;
});
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function animateParticles() {
  for (let p of particles) {
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius) {
      p.x -= dx / 10;
      p.y -= dy / 10;
    } else {
      p.x += (p.baseX - p.x) * 0.05;
      p.y += (p.baseY - p.y) * 0.05;
    }
  }
  drawParticles();
  requestAnimationFrame(animateParticles);
}

createParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
});

// === HIỂN THỊ ẢNH ===
const container = document.getElementById("imageContainer");
const imageHeartPoints = [];
for (let i = 0; i < Math.PI * 2; i += (2 * Math.PI) / imageUrls.length) {
  imageHeartPoints.push(heartFunction(i));
}

const imageScale = window.innerWidth < 600 ? 14 : 20;
imageUrls.forEach((url, i) => {
  const img = document.createElement("img");
  img.src = url;

  const p = imageHeartPoints[i];
  const x = p.x * imageScale;
  const y = -p.y * imageScale;

  img.style.left = `${x}px`;
  img.style.top = `${y}px`;
  img.style.transform = `translate(-50%, -50%)`;

  img.animate(
    [
      { transform: `translate(-50%, -50%) translateY(0px)` },
      { transform: `translate(-50%, -50%) translateY(-10px)` },
      { transform: `translate(-50%, -50%) translateY(0px)` }
    ],
    {
      duration: 3000 + Math.random() * 2000,
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );

  container.appendChild(img);
});

// === ÂM NHẠC (tương thích mobile) ===
const playBtn = document.getElementById("playBtn");
const music = document.getElementById("bgMusic");
playBtn.addEventListener("click", () => {
  music.play();
  playBtn.style.display = "none";
});
// --- Thêm đoạn này vào cuối script.js ---

// Danh sách lời chúc của bạn
const customGreetings = [
  "Chúc bạn luôn xinh đẹp, tự tin và rạng rỡ như những bông hoa ngày 20/10.<br> Mong rằng mỗi ngày của bạn đều ngập tràn niềm vui, tiếng cười và yêu thương.<br> Cảm ơn bạn vì đã luôn mang đến năng lượng tích cực cho mọi người xung quanh!",
  "Nhân ngày Phụ nữ Việt Nam, chúc bạn luôn hạnh phúc và gặp nhiều điều tốt đẹp trong cuộc sống.<br> Mỗi bước đi đều là một hành trình tỏa sáng, mỗi nụ cười đều là niềm vui lan tỏa.<br> Hãy luôn là chính mình – mạnh mẽ, dịu dàng và đầy cuốn hút!",
  "Chúc bạn có một ngày 20/10 thật ý nghĩa, được yêu thương và trân trọng hết mình.<br> Hy vọng mọi ước mơ của bạn đều sớm trở thành hiện thực.<br> Cảm ơn bạn vì đã khiến thế giới này trở nên tươi đẹp hơn chỉ bằng sự hiện diện của bạn!"
];

let greetingIndex = 0;
const GREETING = document.getElementById('greetingBox');

// Gán lời chúc đầu tiên
GREETING.innerHTML = customGreetings[greetingIndex];

// Đổi lời chúc mỗi 30 giây
setInterval(() => {
  greetingIndex = (greetingIndex + 1) % customGreetings.length;
  GREETING.innerHTML = customGreetings[greetingIndex];
}, 30000);

