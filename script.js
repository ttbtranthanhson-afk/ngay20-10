const GREETING = document.getElementById('greetingBox');
const SPARKLE_CONTAINER = document.getElementById('sparkleContainer');
const defaultSize = 96;

// 🖼️ Danh sách ảnh — bạn có thể thay URL ảnh tùy ý
const imageUrls = [
  "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg",
  "img6.jpg", "img7.jpg", "img8.jpg", "img9.jpg", "img10.jpg",
  "img11.jpg", "img12.jpg", "img13.jpg", "img14.jpg", "img15.jpg",
  "img16.jpg", "img17.jpg", "img18.jpg", "img19.jpg", "img20.jpg",
  "img21.jpg", "img22.jpg", "img23.jpg", "img24.jpg"
];

// 💌 Lời chúc — đổi ngẫu nhiên mỗi 30 giây
const greetings = [
  "Chúc bạn luôn xinh đẹp, tự tin và rạng rỡ như những bông hoa ngày 20/10.<br> Mong rằng mỗi ngày của bạn đều ngập tràn niềm vui, tiếng cười và yêu thương.<br> Cảm ơn bạn vì đã luôn mang đến năng lượng tích cực cho mọi người xung quanh!",
  "Nhân ngày Phụ nữ Việt Nam, chúc bạn luôn hạnh phúc và gặp nhiều điều tốt đẹp trong cuộc sống.<br> Mỗi bước đi đều là một hành trình tỏa sáng, mỗi nụ cười đều là niềm vui lan tỏa.<br> Hãy luôn là chính mình – mạnh mẽ, dịu dàng và đầy cuốn hút!",
  "Chúc bạn có một ngày 20/10 thật ý nghĩa, được yêu thương và trân trọng hết mình.<br> Hy vọng mọi ước mơ của bạn đều sớm trở thành hiện thực.<br> Cảm ơn bạn vì đã khiến thế giới này trở nên tươi đẹp hơn chỉ bằng sự hiện diện của bạn!"
];

// 🌟 Tạo ảnh xung quanh lời chúc
function createImages() {
  const stage = document.getElementById('stage');
  const stageWidth = stage.clientWidth;
  const stageHeight = stage.clientHeight;

  imageUrls.forEach((url, i) => {
    const img = document.createElement('img');
    img.src = url;
    img.className = 'sparkle';

    // Sắp xếp ảnh xung quanh
    const angle = (i / imageUrls.length) * 2 * Math.PI;
    const radius = Math.min(stageWidth, stageHeight) / 2.2;

    const x = stageWidth / 2 + radius * Math.cos(angle) - 50;
    const y = stageHeight / 2 + radius * Math.sin(angle) - 50;

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    SPARKLE_CONTAINER.appendChild(img);
  });
}

// 💬 Đổi lời chúc mỗi 30 giây
function startGreetingCycle() {
  let index = 0;
  GREETING.innerHTML = greetings[index];
  setInterval(() => {
    index = (index + 1) % greetings.length;
    GREETING.innerHTML = greetings[index];
  }, 30000);
}

// 🚀 Khởi động
window.onload = () => {
  createImages();
  startGreetingCycle();
};
