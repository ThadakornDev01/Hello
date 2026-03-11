window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    // เมื่อโหลดทุกอย่างเสร็จ (CSS, รูป, ดาว) ให้เพิ่มคลาสเพื่อจางหายไป
    loader.classList.add("loader-hidden");
});

function changePage(url) {
    // 1. สั่งให้ตัว loader โผล่ขึ้นมา (Fade in)
    const loader = document.getElementById("loader");
    loader.classList.remove("loader-hidden");

    // 2. รอให้อนิเมชัน Fade in ทำงานเสร็จ (เช่น 0.5 วินาที) แล้วค่อยไปหน้าใหม่
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

