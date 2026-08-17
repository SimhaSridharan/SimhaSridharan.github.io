// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Generate a small node network in the hero SVG — a nod to protein-surface
// interaction graphs. Purely decorative, respects reduced-motion.
(function () {
  const svg = document.getElementById('network');
  if (!svg) return;

  const W = 420, H = 420;
  const N = 14;
  const nodes = [];

  for (let i = 0; i < N; i++) {
    nodes.push({
      x: 40 + Math.random() * (W - 80),
      y: 40 + Math.random() * (H - 80),
      r: 3 + Math.random() * 4
    });
  }

  const edgesGroup = svg.querySelector('.edges');
  const nodesGroup = svg.querySelector('.nodes');

  // Connect each node to its 2 nearest neighbors
  nodes.forEach((n, i) => {
    const dists = nodes
      .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);

    dists.forEach(({ j }) => {
      const m = nodes[j];
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', n.x);
      line.setAttribute('y1', n.y);
      line.setAttribute('x2', m.x);
      line.setAttribute('y2', m.y);
      edgesGroup.appendChild(line);
    });
  });

  nodes.forEach((n, i) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', n.x);
    circle.setAttribute('cy', n.y);
    circle.setAttribute('r', n.r);
    circle.style.animation = `pulse 3.5s ease-in-out ${(i * 0.15).toFixed(2)}s infinite`;
    nodesGroup.appendChild(circle);
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 0.75; }
      50% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
})();
