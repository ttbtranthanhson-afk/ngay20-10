const imageUrls = [
    "YenNhi.jpg",
    "VietHa.jpg",
    "VanKhanh.jpg",
    "TuAnh.jpg",
    "TueBinh.jpg",
    "TramAnh.jpg",
    "ThaoNguyen.jpg",
    "Thanh.jpg",
    "ThanhHa.jpg",
    "QuynhAnh.jpg",
    "QuynhChi.jpg",
    "PhamKhanhHuyen.jpg",
    "PhuongAnh.jpg",
    "PhuongNhi.jpg",
    "NgocHa.jpg",
    "MinhNguyet.jpg",
    "MinhAnh.jpg",
    "MaiHongNgoc.jpeg",
    "ly.jpg",
    "Khanh.jpg",
    "KhanhLinh.jpg",
    "hoa.jpg",
    "Chi.jpg",
    "BichNgoc.jpg"
];

// ===================== HIỆU ỨNG HẠT TRÁI TIM =====================
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const heartPoints = [];

function heartFunction(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
        13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x, y };
}

// Nhiều hạt hơn
for (let i = 0; i < Math.PI * 2; i += 0.01) {
    heartPoints.push(heartFunction(i));
}

function createParticles() {
    particles = [];
    const box = document.getElementById("messageBox").getBoundingClientRect();
    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;
    // Giảm tỷ lệ scale trên di động để trái tim không quá lớn
    const scale = Math.min(window.innerWidth, window.innerHeight) * 0.55; 

    for (let i = 0; i < heartPoints.length; i++) {
        const p = heartPoints[i];
        const px = centerX + p.x * (scale / 16);
        const py = centerY - p.y * (scale / 16);
        particles.push({
            x: px,
            y: py,
            baseX: px,
            baseY: py,
            size: Math.random() * 3 + 0.8,
            color: `rgba(255,${120 + Math.random() * 100},${150 + Math.random() * 105},0.9)`
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

const mouse = { x: undefined, y: undefined, radius: 90 };
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

// ===================== ẢNH TRÁI TIM =====================
const container = document.getElementById("imageContainer");
const imageHeartPoints = [];

for (let i = 0; i < Math.PI * 2; i += (2 * Math.PI) / imageUrls.length) {
    imageHeartPoints.push(heartFunction(i));
}

const imageScale = 15; // Đã giảm từ 20 xuống 15 để ảnh gần tâm hơn, tối ưu cho mobile
imageUrls.forEach((url, i) => {
    const img = document.createElement("img");
    img.src = url;

    const p = imageHeartPoints[i];
    const x = p.x * imageScale;
    const y = -p.y * imageScale;

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = `translate(-50%, -50%)`;

    // Hiệu ứng lơ lửng
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
