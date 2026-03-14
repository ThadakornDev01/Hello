const button = document.getElementById('runawayBtn');
let fails = 0;
let isGameOver = false;

// ซ่อนชื่อไฟล์ด้วย btoa — decode ตอน trigger จริงเท่านั้น
const _a = atob('ZG93bmxvYWQuanBn');   // download.jpg
const _b = atob('c2NyZWFtLm1wMw==');   // scream.mp3

// ซ่อนตัวเลข threshold ให้ดูไม่ออก
const _t = (0xF);  // = 15

const runAway = () => {
    if (fails >= _t || isGameOver) return;
    const maxWidth = window.innerWidth - button.offsetWidth;
    const maxHeight = window.innerHeight - button.offsetHeight;
    button.style.position = 'fixed';
    button.style.bottom = 'auto';
    button.style.left = `${Math.random() * maxWidth}px`;
    button.style.top = `${Math.random() * maxHeight}px`;
    button.style.transform = 'none';
};

const _trigger = () => {
    isGameOver = true;
    button.classList.add('explode');

    setTimeout(() => {
        // สร้าง element ตอน trigger เท่านั้น — ไม่มีใน DOM ตั้งแต่แรก
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;z-index:999999;overflow:hidden;margin:0;padding:0;';

        const img = document.createElement('img');
        img.src = _a;
        img.style.cssText = 'width:100%;height:100%;display:block;object-fit:fill;';

        const aud = new Audio(_b);
        aud.volume = 1.0;

        overlay.appendChild(img);
        document.body.appendChild(overlay);
        aud.play();

        if (navigator.vibrate) navigator.vibrate([500, 100, 500]);

        setTimeout(() => { window.location.href = 'index.html'; }, 3500);
    }, 400);
};

button.addEventListener('click', (e) => {
    e.preventDefault();
    if (fails >= _t) _trigger();
});

document.addEventListener('mousedown', (e) => {
    if (isGameOver) return;
    if (e.target.id !== 'runawayBtn') {
        fails++;
        if (fails === _t) {
            button.style.transition = 'all 0.5s ease';
            button.innerText = "[ อ๊ะ! ยอมให้กดก็ได้ ]";
            button.style.backgroundColor = "gold";
            button.style.color = "black";
        }
    }
});

document.addEventListener('mousemove', (e) => {
    if (fails >= _t || isGameOver) return;
    const r = button.getBoundingClientRect();
    const dist = Math.sqrt(Math.pow(e.clientX - (r.left + r.width/2), 2) + Math.pow(e.clientY - (r.top + r.height/2), 2));
    if (dist < 100) runAway();
});

button.addEventListener('touchstart', (e) => {
    if (fails < _t) { e.preventDefault(); runAway(); }
});