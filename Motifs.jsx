/* Line-drawn canvas motifs sprinkled through the report. */

function useCanvasSetup(ref, logicalW, logicalH) {
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = logicalW * dpr;
    canvas.height = logicalH * dpr;
    ctx.scale(dpr, dpr);
  }, [ref, logicalW, logicalH]);
}

// ========================================================================
// Turtle — park motif. A loose, hand-drawn turtle with a slow "breathing"
// motion on head/flipper extension to signal it is alive, not a logo.
// ========================================================================
function TurtleMotif() {
  const ref = React.useRef(null);
  const raf = React.useRef(0);
  const W = 280, H = 180;
  useCanvasSetup(ref, W, H);

  React.useEffect(() => {
    const ctx = ref.current.getContext('2d');
    const start = performance.now();

    function draw(now) {
      const t = (now - start) / 1000;
      // Multi-rate motion: breathing, swimming cycle, and occasional head-bob.
      const breath = Math.sin(t * 1.1);           // slow, body scale / head extend
      const swim = Math.sin(t * 2.2);             // faster, flipper stroke
      const swim2 = Math.sin(t * 2.2 + Math.PI);  // back flipper, counter-phase
      // periodic head bob — small sharp nod every ~5s
      const bobPhase = (t % 5) / 5;
      const bob = bobPhase < 0.15 ? Math.sin(bobPhase * Math.PI / 0.15) : 0;

      const head = 1 + breath * 0.35 + bob * 0.15;  // head extension (±35%)
      const frontFlip = swim * 28;                   // ±28° flipper swing
      const backFlip = swim2 * 16;                   // ±16°
      const bodyLift = breath * 1.5;                 // whole body subtly rises/falls
      const headTilt = bob * 8 + breath * 3;         // ±11°

      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = '#1C1D1F';
      ctx.lineWidth = 1.1;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      const cx = W / 2 - 20, cy = H / 2 + 10 - bodyLift;

      // SHELL — a gentle dome
      ctx.beginPath();
      // top curve
      ctx.moveTo(cx - 64, cy);
      ctx.bezierCurveTo(cx - 64, cy - 58, cx + 60, cy - 58, cx + 60, cy);
      // bottom (plastron edge)
      ctx.bezierCurveTo(cx + 60, cy + 8, cx - 64, cy + 8, cx - 64, cy);
      ctx.stroke();

      // Shell scutes — irregular hex tiles, drawn as thin strokes.
      ctx.save();
      ctx.strokeStyle = '#55585D';
      ctx.lineWidth = 0.7;
      // central line
      ctx.beginPath();
      ctx.moveTo(cx - 40, cy - 28); ctx.lineTo(cx + 38, cy - 30);
      ctx.stroke();
      // vertical dividers
      const cols = [-42, -18, 4, 28];
      cols.forEach(x => {
        ctx.beginPath();
        ctx.moveTo(cx + x, cy - 28);
        ctx.lineTo(cx + x - 2, cy - 2);
        ctx.stroke();
      });
      // lower row — subtle curves back to the rim
      [-52, -28, -4, 22, 46].forEach(x => {
        ctx.beginPath();
        ctx.moveTo(cx + x, cy - 2);
        ctx.quadraticCurveTo(cx + x, cy + 4, cx + x - 2, cy + 2);
        ctx.stroke();
      });
      ctx.restore();

      // HEAD — extends from left side, with tilt
      const headAnchorX = cx - 64;
      const headAnchorY = cy - 6;
      ctx.save();
      ctx.translate(headAnchorX, headAnchorY);
      ctx.rotate((headTilt * Math.PI) / 180);
      const headReach = 16 * head;
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.bezierCurveTo(-headReach + 10, -12, -headReach - 4, 0, -headReach, 8);
      ctx.bezierCurveTo(-headReach + 2, 16, 6, 10, 0, 8);
      ctx.stroke();

      // eye
      ctx.beginPath();
      ctx.arc(-headReach + 4, 4, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#1C1D1F';
      ctx.fill();
      ctx.restore();

      // FRONT FLIPPER
      ctx.save();
      ctx.translate(cx - 38, cy + 4);
      ctx.rotate((frontFlip * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-18, 14, -26, 26, -18, 34);
      ctx.bezierCurveTo(-10, 30, -4, 14, 0, 0);
      ctx.stroke();
      ctx.restore();

      // BACK FLIPPER
      ctx.save();
      ctx.translate(cx + 40, cy + 4);
      ctx.rotate((backFlip * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(12, 12, 18, 22, 10, 28);
      ctx.bezierCurveTo(4, 22, 0, 12, 0, 0);
      ctx.stroke();
      ctx.restore();

      // TAIL — small stub on right
      ctx.beginPath();
      ctx.moveTo(cx + 58, cy - 1);
      ctx.quadraticCurveTo(cx + 68, cy + 2, cx + 74, cy + 6);
      ctx.stroke();

      if (!reduced) raf.current = requestAnimationFrame(draw);
    }
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { draw(start); } else { raf.current = requestAnimationFrame(draw); }
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div className="motif motif-park" aria-hidden="true">
      <canvas ref={ref}/>
    </div>
  );
}

// ========================================================================
// TeamsGrounds — demand section. A line-drawn chart: six grounds as
// circles, with 40 team-dots arriving to saturate them (the "6.7 per
// ground today"), then redistributing across 12 grounds (the 3.3 after).
// Slow 10s loop.
// ========================================================================
function TeamsGroundsMotif() {
  const ref = React.useRef(null);
  const raf = React.useRef(0);
  const W = 640, H = 140;
  useCanvasSetup(ref, W, H);

  React.useEffect(() => {
    const ctx = ref.current.getContext('2d');
    const start = performance.now();

    // 12 ground positions across the width (6 used in "before", 12 in "after")
    const groundY = 84;
    const margin = 30;
    const innerW = W - margin * 2;
    const grounds12 = Array.from({length: 12}, (_, i) => margin + (i + 0.5) * (innerW / 12));
    const grounds6 = Array.from({length: 6}, (_, i) => margin + (i + 0.5) * (innerW / 6));

    // 40 teams — assign each a "home" ground index for both states.
    // In "before": distributed across 6 grounds with ~6–7 teams each.
    // In "after": distributed across 12 grounds with ~3–4 teams each.
    const teams = [];
    for (let i = 0; i < 40; i++) {
      teams.push({
        beforeGround: i % 6,
        afterGround: i % 12,
        orbit: (i * 137.5) % 360, // golden-angle spread around ground
      });
    }

    const ease = (x) => x < 0.5 ? 4*x*x*x : 1 - Math.pow(-2*x+2, 3)/2;
    const CYCLE = 10000;

    function draw(now) {
      const elapsed = now - start;
      const t = (elapsed % CYCLE) / CYCLE;
      let k; // 0 = before (6 grounds), 1 = after (12 grounds)
      if (t < 0.35) k = 0;
      else if (t < 0.5) k = ease((t - 0.35) / 0.15);
      else if (t < 0.85) k = 1;
      else k = 1 - ease((t - 0.85) / 0.15);

      ctx.clearRect(0, 0, W, H);

      // Axis
      ctx.strokeStyle = '#D9D7D0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(margin, groundY + 18);
      ctx.lineTo(W - margin, groundY + 18);
      ctx.stroke();

      // Draw grounds as small circles. During morph, grounds 6..11 fade in.
      ctx.strokeStyle = '#1C1D1F';
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        // Position interpolates from grounds6[i%6] to grounds12[i]
        const isNew = i >= 6;
        const alpha = isNew ? k : 1;
        const x = grounds12[i];
        // For existing (0..5) grounds: slide from grounds6 position to grounds12 position
        const baseX = i < 6 ? grounds6[i] + (grounds12[i] - grounds6[i]) * k : x;
        if (alpha < 0.02) continue;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(baseX, groundY + 18, 5.5, 0, Math.PI * 2);
        ctx.stroke();
        // Vertical tick stem
        ctx.beginPath();
        ctx.moveTo(baseX, groundY + 12);
        ctx.lineTo(baseX, groundY - 2);
        ctx.strokeStyle = '#D9D7D0';
        ctx.stroke();
        ctx.strokeStyle = '#1C1D1F';
        ctx.restore();
      }

      // Draw 40 team dots as small filled circles, each orbiting its assigned ground.
      ctx.fillStyle = '#3E6B7A';
      teams.forEach((team, i) => {
        const beforeGX = grounds6[team.beforeGround] + (grounds12[team.beforeGround] - grounds6[team.beforeGround]) * k;
        const afterGX = grounds12[team.afterGround];
        const gx = beforeGX + (afterGX - beforeGX) * k;

        // Orbit radius and position
        const r = 8 + (i % 3) * 2.5;
        const ang = (team.orbit + elapsed * 0.02) * Math.PI / 180;
        const x = gx + Math.cos(ang) * r;
        const y = groundY + 18 + Math.sin(ang) * r * 0.5; // squashed
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Header labels
      ctx.font = "600 10px 'Inter', sans-serif";
      ctx.fillStyle = '#72767C';
      ctx.textAlign = 'left';
      // left label: current ratio
      const beforeTeams = 40, beforeGrounds = 6;
      const afterTeams = 40, afterGrounds = 12;
      const ratio = (beforeTeams / beforeGrounds) + ((afterTeams / afterGrounds) - (beforeTeams / beforeGrounds)) * k;
      ctx.fillText(`TEAMS PER GROUND:`, margin, 22);
      ctx.font = "600 18px 'Inter', sans-serif";
      ctx.fillStyle = '#1C1D1F';
      ctx.fillText(ratio.toFixed(1), margin + 146, 24);
      // right label: ground count
      ctx.font = "600 10px 'Inter', sans-serif";
      ctx.fillStyle = '#72767C';
      ctx.textAlign = 'right';
      ctx.fillText('GROUNDS', W - margin, 22);
      const gCount = beforeGrounds + (afterGrounds - beforeGrounds) * k;
      ctx.font = "600 18px 'Inter', sans-serif";
      ctx.fillStyle = '#1C1D1F';
      ctx.fillText(gCount.toFixed(0), W - margin, 42);

      if (!reduced) raf.current = requestAnimationFrame(draw);
    }
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { draw(start); } else { raf.current = requestAnimationFrame(draw); }
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <figure className="motif motif-demand" aria-hidden="true">
      <canvas ref={ref}/>
      <figcaption className="motif-label">Before and after: 40 teams across 6 grounds (today) → 12 grounds (with six new pitches).</figcaption>
    </figure>
  );
}

// ========================================================================
// Paddle ↔ Bat — precedent section. A single line-drawn implement that
// morphs from a pickleball paddle (round, short handle) to a cricket bat
// (flat, long blade). Same stroke path, same 160 points.
// ========================================================================
function PaddleBatMotif() {
  const ref = React.useRef(null);
  const raf = React.useRef(0);
  const W = 260, H = 240;
  useCanvasSetup(ref, W, H);

  React.useEffect(() => {
    const ctx = ref.current.getContext('2d');
    const start = performance.now();
    const cx = W / 2, cy = H / 2 + 10;
    const N = 160;

    // Build perimeter for paddle (symmetric): handle + round head.
    const paddle = [];
    // Handle: rectangle bottom (narrow). Head: circle on top.
    // Total perimeter: bottom-left of handle -> bottom-right -> up right -> around circle -> down left -> back to start.
    // Simplify with parametric: for i in [0,N), build a smooth closed shape.
    // We'll trace it as (angle-parameterized) custom path.
    function paddlePoint(t) {
      // t in 0..1 around perimeter
      // Define segments by fraction of total perim:
      // 0..0.1 bottom of handle
      // 0.1..0.25 right side of handle going up
      // 0.25..0.75 head (half circle arc — but full because handle meets head)
      // 0.75..0.9 left side of handle going down
      // 0.9..1.0 bottom (mirror)
      const handleHalfW = 8, handleHeight = 50;
      const headR = 44;
      const handleBottomY = cy + 80;
      const headCenterY = cy + 80 - handleHeight - headR + 8; // slight overlap
      if (t < 0.05) {
        const u = t / 0.05;
        return [cx + (u - 0.5) * 2 * handleHalfW, handleBottomY];
      }
      if (t < 0.2) {
        const u = (t - 0.05) / 0.15;
        return [cx + handleHalfW, handleBottomY - u * handleHeight];
      }
      if (t < 0.8) {
        const u = (t - 0.2) / 0.6;
        // Arc around head, starting at right side going up and over, finishing at left side
        const ang = -Math.PI / 2 + u * (Math.PI * 2 - 0.6) + 0.3;
        return [cx + Math.sin(ang) * headR, headCenterY - Math.cos(ang) * headR];
      }
      if (t < 0.95) {
        const u = (t - 0.8) / 0.15;
        return [cx - handleHalfW, handleBottomY - (1 - u) * handleHeight];
      }
      const u = (t - 0.95) / 0.05;
      return [cx - handleHalfW + u * handleHalfW * 2 * 0.5 - handleHalfW * 0.5, handleBottomY];
    }

    function batPoint(t) {
      // Bat: flat blade (rectangle with rounded bottom) + long handle on top.
      const handleHalfW = 5, handleHeight = 70;
      const bladeHalfW = 20, bladeHeight = 96;
      const bladeBottomY = cy + 92;
      const bladeTopY = bladeBottomY - bladeHeight;
      const handleTopY = bladeTopY - handleHeight;
      if (t < 0.04) {
        const u = t / 0.04;
        return [cx + (u - 0.5) * 2 * handleHalfW, handleTopY];
      }
      if (t < 0.22) {
        const u = (t - 0.04) / 0.18;
        return [cx + handleHalfW, handleTopY + u * handleHeight];
      }
      if (t < 0.28) {
        // shoulder transition handle to blade
        const u = (t - 0.22) / 0.06;
        return [cx + handleHalfW + u * (bladeHalfW - handleHalfW), bladeTopY];
      }
      if (t < 0.45) {
        const u = (t - 0.28) / 0.17;
        return [cx + bladeHalfW, bladeTopY + u * (bladeHeight - 10)];
      }
      if (t < 0.55) {
        // rounded bottom of blade
        const u = (t - 0.45) / 0.10;
        const ang = -Math.PI / 2 + u * Math.PI;
        return [cx + Math.cos(ang) * bladeHalfW + 0, bladeBottomY - 10 + Math.sin(ang) * 10];
      }
      if (t < 0.72) {
        const u = (t - 0.55) / 0.17;
        return [cx - bladeHalfW, bladeBottomY - 10 - u * (bladeHeight - 10)];
      }
      if (t < 0.78) {
        const u = (t - 0.72) / 0.06;
        return [cx - bladeHalfW - u * (handleHalfW - bladeHalfW), bladeTopY];
      }
      if (t < 0.96) {
        const u = (t - 0.78) / 0.18;
        return [cx - handleHalfW, bladeTopY - u * handleHeight];
      }
      const u = (t - 0.96) / 0.04;
      return [cx - handleHalfW + u * handleHalfW, handleTopY];
    }

    // Precompute both paths.
    const paddlePath = [], batPath = [];
    for (let i = 0; i < N; i++) {
      const t = i / N;
      paddlePath.push(paddlePoint(t));
      batPath.push(batPoint(t));
    }

    const ease = (x) => x < 0.5 ? 4*x*x*x : 1 - Math.pow(-2*x+2, 3)/2;
    const CYCLE = 12000;

    function draw(now) {
      const elapsed = now - start;
      const t = (elapsed % CYCLE) / CYCLE;
      let k; // 0 = paddle, 1 = bat
      if (t < 0.35) k = 0;
      else if (t < 0.5) k = ease((t - 0.35) / 0.15);
      else if (t < 0.85) k = 1;
      else k = 1 - ease((t - 0.85) / 0.15);

      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = '#1C1D1F';
      ctx.lineWidth = 1.2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const a = paddlePath[i], b = batPath[i];
        const x = a[0] + (b[0] - a[0]) * k;
        const y = a[1] + (b[1] - a[1]) * k;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Small label at bottom
      ctx.font = "600 9px 'Inter', sans-serif";
      ctx.fillStyle = '#72767C';
      ctx.textAlign = 'center';
      const paddleA = 1 - k, batA = k;
      ctx.save();
      ctx.globalAlpha = paddleA;
      ctx.fillText('PICKLEBALL · 2018–2023', cx, H - 10);
      ctx.globalAlpha = batA;
      ctx.fillText('CRICKET · 2025–', cx, H - 10);
      ctx.restore();

      if (!reduced) raf.current = requestAnimationFrame(draw);
    }
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { draw(start); } else { raf.current = requestAnimationFrame(draw); }
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div className="motif motif-precedent" aria-hidden="true">
      <canvas ref={ref}/>
    </div>
  );
}

Object.assign(window, { TurtleMotif, TeamsGroundsMotif, PaddleBatMotif });
