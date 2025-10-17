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

// Hạt trái tim
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

for (let i = 0; i < Math.PI * 2; i += 0.01) {
    heartPoints.push(heartFunction(i));
}

function createParticles() {
    particles = [];
    const box = document.getElementById("messageBox").getBoundingClientRect();
    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;
    
    // Tỷ lệ trái tim hạt (giữ nguyên tối ưu mobile)
    const scaleFactor = window.innerWidth > 600 ? 0.6 : 0.35; 
    const scale = Math.min(window.innerWidth, window.innerHeight) * scaleFactor;

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

// Dùng một đối tượng duy nhất để xử lý cả chuột và chạm
const pointer = { x: undefined, y: undefined, radius: 90 };

window.addEventListener("mousemove", (e) => {
    pointer.x = e.x;
    pointer.y = e.y;
});

// Xử lý chạm (touch) trên thiết bị di động
window.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    pointer.x = touch.clientX;
    pointer.y = touch.clientY;
});

window.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    pointer.x = touch.clientX;
    pointer.y = touch.clientY;
    e.preventDefault(); 
});

window.addEventListener("touchend", () => {
    pointer.x = undefined; 
    pointer.y = undefined;
});


function animateParticles() {
    const hasPointerInteraction = pointer.x !== undefined && pointer.y !== undefined;

    for (let p of particles) {
        if (hasPointerInteraction) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance < pointer.radius) {
                // Đẩy hạt ra xa
                p.x -= dx / 10;
                p.y -= dy / 10;
            } else {
                // Hạt trở về vị trí ban đầu
                p.x += (p.baseX - p.x) * 0.05;
                p.y += (p.baseY - p.y) * 0.05;
            }
        } else {
            // Luôn đảm bảo hạt trở về vị trí ban đầu khi không có tương tác
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

// Ảnh trái tim
const container = document.getElementById("imageContainer");
const imageHeartPoints = [];

for (let i = 0; i < Math.PI * 2; i += (2 * Math.PI) / imageUrls.length) {
    imageHeartPoints.push(heartFunction(i));
}

// Tăng tỷ lệ scale để ảnh cách xa lời chúc hơn
const imageScale = window.innerWidth > 600 ? 18 : 12; // Tăng từ 15 -> 18 và 8 -> 12

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
            { transform: `translate(-50%, -50%) translateY(-5px)` }, 
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



