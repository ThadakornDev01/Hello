        const button = document.getElementById('runawayBtn');
        let fails = 0;
        let isGameOver = false;

        const runAway = () => {
            if (fails >= 15 || isGameOver) return; 
            const maxWidth = window.innerWidth - button.offsetWidth;
            const maxHeight = window.innerHeight - button.offsetHeight;

            button.style.position = 'fixed';
            button.style.bottom = 'auto';
            button.style.left = `${Math.random() * maxWidth}px`;
            button.style.top = `${Math.random() * maxHeight}px`;
            button.style.transform = 'none';
        };

        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (fails >= 15) {
                isGameOver = true;
                button.classList.add('explode');
                
                setTimeout(() => {
                    const jumpscare = document.getElementById('jumpscare');
                    const scream = document.getElementById('screamSound');
                    
                    jumpscare.style.display = 'block';
                    
                    scream.volume = 1.0;
                    scream.play().catch(err => {
                        console.log("Audio play failed");
                    });

                    if (navigator.vibrate) {
                        navigator.vibrate([500, 100, 500]);
                    }

                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 3500);
                }, 400);
            }
        });

        document.addEventListener('mousedown', (e) => {
            if (isGameOver) return;
            if (e.target.id !== 'runawayBtn') {
                fails++;
                if (fails === 15) {
                    button.style.transition = 'all 0.5s ease';
                    button.innerText = "[ อ๊ะ! ยอมให้กดก็ได้ ]";
                    button.style.backgroundColor = "gold";
                    button.style.color = "black";
                }
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (fails >= 15 || isGameOver) return;
            const btnRect = button.getBoundingClientRect();
            const btnCenterX = btnRect.left + btnRect.width / 2;
            const btnCenterY = btnRect.top + btnRect.height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - btnCenterX, 2) + Math.pow(e.clientY - btnCenterY, 2));
            if (distance < 100) runAway();
        });

        button.addEventListener('touchstart', (e) => {
            if (fails < 15) {
                e.preventDefault();
                runAway();
            }
        });