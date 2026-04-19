function DiamondPitch() {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Logical size
    const W = 680, H = 320;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const cx = W / 2, cy = H / 2 + 8;

    // Build two equal-length point arrays (N points each).
    const N = 160;

    // DIAMOND: a square rotated 45°. Side goes home -> 1st -> 2nd -> 3rd -> home.
    // Size chosen so it fits nicely within H.
    const dHalf = 124; // half-diagonal
    const diamond = [];
    for (let i = 0; i < N; i++) {
      const t = i / N; // 0..1 around the perimeter
      // Four corners: home (bottom), 1st (right), 2nd (top), 3rd (left)
      const seg = Math.floor(t * 4); // 0..3
      const localT = (t * 4) - seg;
      const corners = [
        [cx, cy + dHalf],           // home
        [cx + dHalf, cy],            // 1st
        [cx, cy - dHalf],            // 2nd
        [cx - dHalf, cy],            // 3rd
        [cx, cy + dHalf],           // back to home
      ];
      const a = corners[seg], b = corners[seg + 1];
      diamond.push([a[0] + (b[0] - a[0]) * localT, a[1] + (b[1] - a[1]) * localT]);
    }

    // CRICKET OVAL: an ellipse.
    const rx = 210, ry = 130;
    const oval = [];
    for (let i = 0; i < N; i++) {
      const theta = (i / N) * Math.PI * 2 - Math.PI / 2;
      oval.push([cx + Math.cos(theta) * rx, cy + Math.sin(theta) * ry]);
    }

    // INNER FEATURES
    // Diamond: 4 bases (small squares) + pitcher's mound circle.
    const diamondBases = [
      [cx, cy + dHalf],
      [cx + dHalf, cy],
      [cx, cy - dHalf],
      [cx - dHalf, cy],
    ];

    // Cricket: central strip (pitch) with crease lines + two wickets.
    // Strip is a narrow rectangle vertical through center.
    const stripHalfLen = 70;
    const stripHalfW = 10;

    // ease function
    const ease = (x) => {
      // easeInOutCubic
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };

    // Lerp helper
    const lerp = (a, b, t) => a + (b - a) * t;

    const start = performance.now();
    // 6s diamond -> 2s morph -> 6s cricket -> 2s morph back (total 16s loop)
    const CYCLE = 16000;

    function phase(elapsed) {
      const t = (elapsed % CYCLE) / CYCLE; // 0..1
      // 0   -> 0.375 = diamond hold
      // 0.375 -> 0.5   = morph to cricket
      // 0.5   -> 0.875 = cricket hold
      // 0.875 -> 1     = morph back to diamond
      if (t < 0.375) return { state: 'diamond', k: 0 };
      if (t < 0.5) {
        const raw = (t - 0.375) / 0.125;
        return { state: 'morph', k: ease(raw) };
      }
      if (t < 0.875) return { state: 'cricket', k: 1 };
      const raw = (t - 0.875) / 0.125;
      return { state: 'morph', k: 1 - ease(raw) };
    }

    function draw(now) {
      const elapsed = now - start;
      const p = phase(elapsed);
      const k = p.k; // 0 = diamond, 1 = cricket

      ctx.clearRect(0, 0, W, H);

      // Subtle field fill backing
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = 'rgba(62, 107, 122, 0.045)'; // Rideau wash, very faint
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const d = diamond[i], o = oval[i];
        const x = lerp(d[0], o[0], k);
        const y = lerp(d[1], o[1], k);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Boundary path
      ctx.strokeStyle = '#1C1D1F';
      ctx.lineWidth = 1.1;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const d = diamond[i], o = oval[i];
        const x = lerp(d[0], o[0], k);
        const y = lerp(d[1], o[1], k);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // ---- Inner features, crossfaded between diamond and cricket ----

      // Base paths (diamond only) — connect the 4 bases with fine lines that fade out.
      const diamondAlpha = 1 - k;
      const cricketAlpha = k;

      if (diamondAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = diamondAlpha;

        // Fine foul-line + cross from home through 2nd (visible path lines)
        ctx.strokeStyle = '#55585D';
        ctx.lineWidth = 0.7;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        // home -> 2nd
        ctx.moveTo(diamondBases[0][0], diamondBases[0][1]);
        ctx.lineTo(diamondBases[2][0], diamondBases[2][1]);
        // 1st -> 3rd
        ctx.moveTo(diamondBases[1][0], diamondBases[1][1]);
        ctx.lineTo(diamondBases[3][0], diamondBases[3][1]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Pitcher's mound (small circle in center)
        ctx.strokeStyle = '#1C1D1F';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.stroke();

        // Bases (small squares, rotated 45°)
        ctx.fillStyle = '#F7F5F0';
        diamondBases.forEach(([bx, by], idx) => {
          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(Math.PI / 4);
          const s = idx === 0 ? 8 : 7; // home a bit larger
          ctx.fillRect(-s / 2, -s / 2, s, s);
          ctx.strokeStyle = '#1C1D1F';
          ctx.lineWidth = 1;
          ctx.strokeRect(-s / 2, -s / 2, s, s);
          ctx.restore();
        });

        ctx.restore();
      }

      if (cricketAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = cricketAlpha;

        // Inner circle (30-yard line analogue)
        ctx.strokeStyle = '#55585D';
        ctx.lineWidth = 0.7;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx * 0.55, ry * 0.55, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Central pitch strip (rectangle)
        ctx.strokeStyle = '#1C1D1F';
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - stripHalfW, cy - stripHalfLen, stripHalfW * 2, stripHalfLen * 2);

        // Crease lines (bowling + popping) at each end
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Top end
        ctx.moveTo(cx - stripHalfW - 6, cy - stripHalfLen);
        ctx.lineTo(cx + stripHalfW + 6, cy - stripHalfLen);
        ctx.moveTo(cx - stripHalfW - 6, cy - stripHalfLen + 12);
        ctx.lineTo(cx + stripHalfW + 6, cy - stripHalfLen + 12);
        // Bottom end
        ctx.moveTo(cx - stripHalfW - 6, cy + stripHalfLen);
        ctx.lineTo(cx + stripHalfW + 6, cy + stripHalfLen);
        ctx.moveTo(cx - stripHalfW - 6, cy + stripHalfLen - 12);
        ctx.lineTo(cx + stripHalfW + 6, cy + stripHalfLen - 12);
        ctx.stroke();

        // Wickets: three vertical stumps at each end
        const drawStumps = (sx, sy) => {
          for (let i = -1; i <= 1; i++) {
            ctx.beginPath();
            ctx.moveTo(sx + i * 3, sy - 5);
            ctx.lineTo(sx + i * 3, sy + 5);
            ctx.stroke();
          }
          // bail across the top
          ctx.beginPath();
          ctx.moveTo(sx - 4, sy - 5);
          ctx.lineTo(sx + 4, sy - 5);
          ctx.stroke();
        };
        drawStumps(cx, cy - stripHalfLen + 6);
        drawStumps(cx, cy + stripHalfLen - 6);

        ctx.restore();
      }

      // Labels (fade between "Baseball" and "Cricket") — small, mono
      ctx.save();
      ctx.font = "600 10px 'Inter', sans-serif";
      ctx.fillStyle = '#72767C';
      ctx.textAlign = 'center';
      const labelY = cy + ry + 28;

      ctx.globalAlpha = diamondAlpha;
      ctx.fillText('BASEBALL DIAMOND', cx, labelY);
      ctx.globalAlpha = cricketAlpha;
      ctx.fillText('CRICKET PITCH', cx, labelY);
      ctx.restore();

      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    }

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      draw(start);
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="dp-wrap" aria-hidden="true">
      <canvas ref={canvasRef} className="dp-canvas"/>
    </div>
  );
}

window.DiamondPitch = DiamondPitch;
