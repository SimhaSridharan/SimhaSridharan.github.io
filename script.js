// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form — submit via fetch so the person stays on the page
(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    status.textContent = 'Sending…';
    status.className = 'form-status';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        status.textContent = 'Message sent — thanks, I\'ll get back to you soon.';
        status.className = 'form-status success';
        form.reset();
      } else {
        status.textContent = 'Something went wrong. Please try again or email me directly.';
        status.className = 'form-status error';
      }
    } catch (err) {
      status.textContent = 'Something went wrong. Please try again or email me directly.';
      status.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
    }
  });
})();

// Generate a cluster of colorful, gently overlapping circles in the hero
// SVG — a nod to emulsion droplets, the actual subject of a lot of this
// research. Purely decorative, respects reduced-motion.
(function () {
  const svg = document.getElementById('droplets');
  if (!svg) return;

  const W = 420, H = 420;
  const palette = ['#4B7A3D', '#E89A34', '#8C2F5C', '#6E9A5C', '#EFC17A'];
  const droplets = [];
  const N = 11;

  for (let i = 0; i < N; i++) {
    droplets.push({
      x: 90 + Math.random() * (W - 180),
      y: 90 + Math.random() * (H - 180),
      r: 22 + Math.random() * 55,
      color: palette[i % palette.length],
      delay: (Math.random() * 3).toFixed(2)
    });
  }

  // Largest circles first so smaller ones sit visually on top
  droplets.sort((a, b) => b.r - a.r);

  droplets.forEach((d) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', d.x);
    circle.setAttribute('cy', d.y);
    circle.setAttribute('r', d.r);
    circle.setAttribute('fill', d.color);
    circle.setAttribute('opacity', '0.82');
    circle.style.mixBlendMode = 'multiply';
    circle.style.animation = `float 6s ease-in-out ${d.delay}s infinite`;
    svg.appendChild(circle);
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(0, -8px); }
    }
    #droplets circle { transform-box: fill-box; transform-origin: center; }
  `;
  document.head.appendChild(style);
})();
