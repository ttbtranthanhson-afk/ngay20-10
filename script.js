// ===================================================================================
// ==================== GIAI ĐOẠN 1: BÔNG HOA VẼ VÀ HIỆU ỨNG ========================
// ===================================================================================

const roseT = document.getElementById('rose-t');
const textClick = document.getElementById('text-click');
const myAudio = document.getElementById('myAudio'); 

const rosePaths = document.querySelectorAll('#rose-t svg path');
var leafOne = document.querySelector('.leafOne');
var stickLine = document.querySelector('.stickLine');
var leafTwo = document.querySelector('.leafTwo');
var leafS1 = document.querySelector('.leafS1');
var rose1 = document.querySelector('.rose1');
var rose2 = document.querySelector('.rose2');
var rose3 = document.querySelector('.rose3');
var rose4 = document.querySelector('.rose4');

// Animation vẽ đường nét và tô màu
var lineDrawing = anime({
    targets: rosePaths,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutCubic',
    duration: 3500,
    delay: 500,
    begin: function (anim) {
        rosePaths.forEach(path => {
            path.style.fill = 'none';
            path.style.stroke = 'black';
            path.style.strokeWidth = '2';
        });
    },
    complete: function (anim) {
        // Tô màu sau khi vẽ xong
        leafOne.style.fill = "#9CDD05"; leafOne.style.stroke = "none";
        leafTwo.style.fill = "#9CDD05"; leafTwo.style.stroke = "none";
        stickLine.style.fill = "#83AA2E"; stickLine.style.stroke = "none";
        leafS1.style.fill = "#9CDD05"; leafS1.style.stroke = "none";
        rose1.style.fill = "#F37D79"; rose1.style.stroke = "none";
        rose2.style.fill = "#D86666"; rose2.style.stroke = "none";
        rose3.style.fill = "#F37D79"; rose3.style.stroke = "none";
        rose4.style.fill = "#D86666"; rose4.style.stroke = "none";

        // Hiển thị và nhấp nháy "Click me now!"
        textClick.style.display = 'inherit';
        anime({
            targets: textClick,
            opacity: [0, 1],
            scale: [0.9, 1.1],
            duration: 1200,
            easing: 'easeOutQuad',
            loop: true,
            direction: 'alternate',
            delay: 500
        });

        startMagicDust();
    },
    autoplay: true,
});

// Logic Magic Dust (giữ nguyên)
const head = document.getElementsByTagName('head')[0];
let animationId = 1;

function CreateMagicDust(x1, x2, y1, y2, sizeRatio, fallingTime, animationDelay) {
    let dust = document.createElement('span');
    let animation = document.createElement('style');

    animation.innerHTML = `
        @keyframes blink${animationId}{
            0% { top: ${x1}px; left: ${y1}px; width: ${2 * sizeRatio}px; height: ${2 * sizeRatio}px; opacity: .4 }
            20% { width: ${4 * sizeRatio}px; height: ${4 * sizeRatio}px; opacity: .8 }
            35% { width: ${2 * sizeRatio}px; height: ${2 * sizeRatio}px; opacity: .5 }
            55% { width: ${3 * sizeRatio}px; height: ${3 * sizeRatio}px; opacity: .7 }
            80% { width: ${sizeRatio}px; height: ${sizeRatio}px; opacity: .3 }
            100% { top: ${x2}px; left: ${y2}px; width: 0px; height: 0px; opacity: .1 }
        }
    `;
    head.appendChild(animation);
    dust.classList.add('dustDef');
    dust.setAttribute('style', `animation: blink${animationId++} ${fallingTime}s cubic-bezier(.71, .11, .68, .83) infinite ${animationDelay}s`);
    document.getElementById('rose-t').appendChild(dust);
}

const magicDustData = [
    [200, 205, 100, 95, .3, 2.5, .1], [280, 275, 80, 75, .4, 2, .2], [350, 355, 120, 115, .5, 2.3, .3],
    [150, 145, 150, 140, .35, 1.8, .4], [400, 405, 160, 155, .45, 2.1, .5], [250, 255, 200, 190, .3, 2.2, .6],
    [300, 305, 220, 210, .5, 2.4, .7], [100, 95, 250, 240, .4, 1.9, .8], [380, 385, 280, 270, .35, 2.0, .9],
    [220, 215, 300, 290, .45, 2.6, 1.0], [250, 250, 350, 300, .25, 3, 1.2], [270, 270, 380, 320, .2, 3.5, 1.5],
];

function startMagicDust() {
    magicDustData.forEach((o) => CreateMagicDust(...o));
}

// ===================================================================================
// ==================== GIAI ĐOẠN 2: CHUYỂN CẢNH VÀ HIỆU ỨNG 20/10 ==================
// ===================================================================================

let isParticlesReady = false; 

roseT.addEventListener('click', function() {
    anime.remove(rosePaths);
    anime.remove(textClick);
    
    anime({
        targets: '#rose-t',
        scale: 0, 
        opacity: 0,
        duration: 1200, 
        easing: 'easeInBack', 
        complete: function() {
            roseT.style.display = 'none'; 
            document.getElementById('main-content').style.zIndex = 1;
            document.getElementById('main-content').style.opacity = 1;
            
            // Bắt đầu phát nhạc ngay lập tức
            myAudio.play().catch(e => console.error("Lỗi: Không thể phát âm thanh tự động. Vui lòng tương tác lần đầu để trình duyệt cho phép."));

            start2010Effects();
        }
    });
});


// ==================== HẠT TRÁI TIM (Responsive Fix) ====================
let particles = [];
const heartPoints = [];
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

function heartFunction(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x, y };
}

for (let i = 0; i < Math.PI * 2; i += 0.01) heartPoints.push(heartFunction(i));

function createParticles(instant = false) { 
    particles = [];
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;

    const box = document.getElementById("messageBox").getBoundingClientRect();
    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;
    
    // Tối ưu hóa: Thay đổi scaleFactor dựa trên kích thước màn hình
    let scaleFactor = 0.55; 
    if (window.innerWidth <= 600) {
        scaleFactor = 0.43; // Nhỏ hơn cho điện thoại
    }
    
    const scale = Math.min(window.innerWidth, window.innerHeight) * scaleFactor; 

    for (let i = 0; i < heartPoints.length; i++) {
        const p = heartPoints[i];
        const finalX = centerX + p.x * (scale / 16); 
        const finalY = centerY - p.y * (scale / 16); 
        
        let startX = instant ? finalX : centerX; 
        let startY = instant ? finalY : centerY; 

        particles.push({
            x: startX, y: startY, 
            baseX: finalX, baseY: finalY,
            size: Math.random() * 3 + 0.8,
            color: `rgba(255,${120 + Math.random() * 100},${150 + Math.random() * 105},0.9)`,
            delay: i * 3
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

const pointer = { x: undefined, y: undefined, radius: 90 };
window.addEventListener("mousemove", e => { pointer.x = e.x; pointer.y = e.y; });
window.addEventListener("touchmove", e => {
    const t = e.touches[0];
    pointer.x = t.clientX; pointer.y = t.clientY; e.preventDefault();
});
window.addEventListener("touchend", () => { pointer.x = undefined; pointer.y = undefined; });

function animateParticles() {
    // Chỉ kích hoạt tương tác khi isParticlesReady là true
    const hasPointer = isParticlesReady && pointer.x !== undefined && pointer.y !== undefined;

    for (let p of particles) {
        if (hasPointer) {
            const dx = pointer.x - p.x, dy = pointer.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < pointer.radius) {
                p.x -= dx / 10; p.y -= dy / 10;
            } else {
                p.x += (p.baseX - p.x) * 0.05;
                p.y += (p.baseY - p.y) * 0.05;
            }
        } else {
            p.x += (p.baseX - p.x) * 0.05;
            p.y += (p.baseY - p.y) * 0.05;
        }
    }
    drawParticles();
    requestAnimationFrame(animateParticles);
}

function animateParticleMotion() {
    if (particles.length === 0) createParticles(); 

    const lastParticle = particles[particles.length - 1];

    particles.forEach(p => {
        anime({
            targets: p,
            x: p.baseX,
            y: p.baseY,
            delay: p.delay,
            duration: 1500,
            easing: 'easeOutQuart',
            complete: function() {
                if (p === lastParticle && !isParticlesReady) { 
                    isParticlesReady = true; 
                }
            }
        });
    });
    animateParticles(); 
}

// ==================== ẢNH LUÂN PHIÊN NỔI BẬT (Responsive) ====================
const container = document.getElementById("imageContainer");
const imageUrls = [
    "YenNhi.jpg", "VietHa.jpg", "VanKhanh.jpg", "TuAnh.jpg", "TueBinh.jpg",
    "TramAnh.jpg", "ThaoNguyen.jpg", "Thanh.jpg", "ThanhHa.jpg", "QuynhAnh.jpg",
    "QuynhChi.jpg", "PhamKhanhHuyen.jpg", "PhuongAnh.jpg", "PhuongNhi.jpg",
    "NgocHa.jpg", "MinhNguyet.jpg", "MinhAnh.jpg", "MaiHongNgoc.jpeg",
    "ly.jpg", "Khanh.jpg", "KhanhLinh.jpg", "hoa.jpg", "Chi.jpg", "BichNgoc.jpg"
];
const imageHeartPoints = [];
for (let i = 0; i < Math.PI * 2; i += (2 * Math.PI) / imageUrls.length) imageHeartPoints.push(heartFunction(i));

const imgElements = [];

function setupImages() {
    // Tối ưu hóa: Tính toán imageScale ngay tại thời điểm setup
    const imageScale = window.innerWidth > 600 ? 16 : 12; 
    
    container.innerHTML = '';
    imgElements.length = 0;

    imageUrls.forEach((url, i) => {
        const img = document.createElement("img");
        img.src = url;

        const p = imageHeartPoints[i];
        const x = p.x * imageScale;
        const y = -p.y * imageScale;

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        
        container.appendChild(img);
        imgElements.push(img);
        
        anime({
            targets: img,
            opacity: 1,
            scale: 1,
            delay: 1000 + i * 100, 
            duration: 800,
            easing: 'easeOutBack'
        });
        
        img.animate([
            { transform: `translate(-50%, -50%) scale(1) translateY(0px)` },
            { transform: `translate(-50%, -50%) scale(1) translateY(-5px)` },
            { transform: `translate(-50%, -50%) scale(1) translateY(0px)` }
        ], {
            duration: 3000 + Math.random() * 2000,
            iterations: Infinity,
            easing: "ease-in-out"
        });
    });
}

let currentIndex = 0;
function highlightNextImage() {
    if (imgElements.length === 0) return;

    const currentImg = imgElements[currentIndex];
    currentImg.style.zIndex = 5;
    currentImg.style.transform = "translate(-50%, -50%) scale(1.5)";
    currentImg.style.boxShadow = "0 0 25px 10px rgba(255, 105, 180, 0.8)";
    currentImg.style.filter = "brightness(1.3)";

    setTimeout(() => {
        currentImg.style.transform = "translate(-50%, -50%) scale(1)";
        currentImg.style.boxShadow = "none";
        currentImg.style.filter = "none";
        currentImg.style.zIndex = 2;
        currentIndex = (currentIndex + 1) % imgElements.length;
        setTimeout(highlightNextImage, 1000);
    }, 1000);
}

// ==================== KHỞI CHẠY CHÍNH CỦA HIỆU ỨNG 20/10 ====================

function start2010Effects() {
    setupImages();
    setTimeout(highlightNextImage, 1000 + imageUrls.length * 100 + 500);

    createParticles();
    animateParticleMotion();

    setInterval(createFallingHeart, 200);
}

// Bắt đầu các sự kiện liên quan đến resize 
window.addEventListener("resize", () => {
    if (document.getElementById('main-content').style.opacity == 1) {
        // Fix: Dừng animation và đặt lại vị trí tức thời khi resize
        anime.remove(particles);
        
        // Tạo lại hạt và đặt chúng NGAY LẬP TỨC vào vị trí cuối cùng mới (true = instant)
        createParticles(true); 
        
        // Cần setupImages lại để hình ảnh xếp đúng vị trí mới
        setupImages();

        // Tiếp tục vòng lặp vẽ/tương tác
        animateParticles(); 
    }
});

// ==================== TRÁI TIM RƠI ====================
const heartContainer = document.getElementById("fallingHearts");
function createFallingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 14 + 10 + "px";
    heart.style.animationDuration = 4 + Math.random() * 4 + "s";
    heart.style.opacity = Math.random() * 0.5 + 0.2;
    heart.style.color = `rgba(255, ${80 + Math.random() * 80}, ${120 + Math.random() * 80}, 0.3)`;

    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
}



