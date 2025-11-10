document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const gift = document.getElementById('gift').value;
            const message = document.getElementById('message').value;
            
            // Construct WhatsApp message
            const waMessage = `New Order:\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nGift: ${gift}\nMessage: ${message}`;
            const encodedMessage = encodeURIComponent(waMessage);
            
            // Replace with your WhatsApp number
            const waUrl = `https://wa.me/+923045961066?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(waUrl, '_blank');
            
            // Optional: Reset form with animation
            orderForm.reset();
            orderForm.classList.add('submitted');
            setTimeout(() => orderForm.classList.remove('submitted'), 1000);
        });
    }
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple confetti effect on button click (pure JS)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return; // For links
            createConfetti(e.clientX, e.clientY);
        });
    });

    function createConfetti(x, y) {
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
            
            const vx = (Math.random() - 0.5) * 20;
            const vy = (Math.random() - 0.5) * 20 - 10;
            let opacity = 1;
            
            const animate = () => {
                x += vx * 0.05;
                y += vy * 0.05;
                vy += 0.1; // Gravity
                opacity -= 0.01;
                
                confetti.style.left = `${x}px`;
                confetti.style.top = `${y}px`;
                confetti.style.opacity = opacity;
                
                if (opacity > 0) requestAnimationFrame(animate);
                else confetti.remove();
            };
            animate();
        }
    }
});

// Add to CSS for confetti
const style = document.createElement('style');
style.innerHTML = `
.confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    pointer-events: none;
    z-index: 9999;
    border-radius: 50%;
}

#orderForm.submitted {
    animation: shake 0.5s;
}

@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}
`;

document.head.appendChild(style);
