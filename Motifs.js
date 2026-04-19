function useCanvasSetup(ref, logicalW, logicalH) {
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = logicalW * dpr;
    canvas.height = logicalH * dpr;
    ctx.scale(dpr, dpr);
  }, [ref, logicalW, logicalH]);
}
function TurtleMotif() {
  const ref = React.useRef(null);
  const raf = React.useRef(0);
  const W = 280, H = 180;
  useCanvasSetup(ref, W, H);
  React.useEffect(() => {
    const ctx = ref.current.getContext("2d");
    const start = performance.now();
    function draw(now) {
      const t = (now - start) / 1e3;
      const breath = Math.sin(t * 1.1);
      const swim = Math.sin(t * 2.2);
      const swim2 = Math.sin(t * 2.2 + Math.PI);
      const bobPhase = t % 5 / 5;
      const bob = bobPhase < 0.15 ? Math.sin(bobPhase * Math.PI / 0.15) : 0;
      const head = 1 + breath * 0.35 + bob * 0.15;
      const frontFlip = swim * 28;
      const backFlip = swim2 * 16;
      const bodyLift = breath * 1.5;
      const headTilt = bob * 8 + breath * 3;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "#1C1D1F";
      ctx.lineWidth = 1.1;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      const cx = W / 2 - 20, cy = H / 2 + 10 - bodyLift;
      ctx.beginPath();
      ctx.moveTo(cx - 64, cy);
      ctx.bezierCurveTo(cx - 64, cy - 58, cx + 60, cy - 58, cx + 60, cy);
      ctx.bezierCurveTo(cx + 60, cy + 8, cx - 64, cy + 8, cx - 64, cy);
      ctx.stroke();
      ctx.save();
      ctx.strokeStyle = "#55585D";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(cx - 40, cy - 28);
      ctx.lineTo(cx + 38, cy - 30);
      ctx.stroke();
      const cols = [-42, -18, 4, 28];
      cols.forEach((x) => {
        ctx.beginPath();
        ctx.moveTo(cx + x, cy - 28);
        ctx.lineTo(cx + x - 2, cy - 2);
        ctx.stroke();
      });
      [-52, -28, -4, 22, 46].forEach((x) => {
        ctx.beginPath();
        ctx.moveTo(cx + x, cy - 2);
        ctx.quadraticCurveTo(cx + x, cy + 4, cx + x - 2, cy + 2);
        ctx.stroke();
      });
      ctx.restore();
      const headAnchorX = cx - 64;
      const headAnchorY = cy - 6;
      ctx.save();
      ctx.translate(headAnchorX, headAnchorY);
      ctx.rotate(headTilt * Math.PI / 180);
      const headReach = 16 * head;
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.bezierCurveTo(-headReach + 10, -12, -headReach - 4, 0, -headReach, 8);
      ctx.bezierCurveTo(-headReach + 2, 16, 6, 10, 0, 8);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-headReach + 4, 4, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "#1C1D1F";
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.translate(cx - 38, cy + 4);
      ctx.rotate(frontFlip * Math.PI / 180);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-18, 14, -26, 26, -18, 34);
      ctx.bezierCurveTo(-10, 30, -4, 14, 0, 0);
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.translate(cx + 40, cy + 4);
      ctx.rotate(backFlip * Math.PI / 180);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(12, 12, 18, 22, 10, 28);
      ctx.bezierCurveTo(4, 22, 0, 12, 0, 0);
      ctx.stroke();
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(cx + 58, cy - 1);
      ctx.quadraticCurveTo(cx + 68, cy + 2, cx + 74, cy + 6);
      ctx.stroke();
      if (!reduced) raf.current = requestAnimationFrame(draw);
    }
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      draw(start);
    } else {
      raf.current = requestAnimationFrame(draw);
    }
    return () => cancelAnimationFrame(raf.current);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "motif motif-park", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("canvas", { ref }));
}
function TeamsGroundsMotif() {
  const ref = React.useRef(null);
  const raf = React.useRef(0);
  const W = 640, H = 140;
  useCanvasSetup(ref, W, H);
  React.useEffect(() => {
    const ctx = ref.current.getContext("2d");
    const start = performance.now();
    const groundY = 84;
    const margin = 30;
    const innerW = W - margin * 2;
    const grounds12 = Array.from({ length: 12 }, (_, i) => margin + (i + 0.5) * (innerW / 12));
    const grounds6 = Array.from({ length: 6 }, (_, i) => margin + (i + 0.5) * (innerW / 6));
    const teams = [];
    for (let i = 0; i < 40; i++) {
      teams.push({
        beforeGround: i % 6,
        afterGround: i % 12,
        orbit: i * 137.5 % 360
        // golden-angle spread around ground
      });
    }
    const ease = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const CYCLE = 1e4;
    function draw(now) {
      const elapsed = now - start;
      const t = elapsed % CYCLE / CYCLE;
      let k;
      if (t < 0.35) k = 0;
      else if (t < 0.5) k = ease((t - 0.35) / 0.15);
      else if (t < 0.85) k = 1;
      else k = 1 - ease((t - 0.85) / 0.15);
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "#D9D7D0";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(margin, groundY + 18);
      ctx.lineTo(W - margin, groundY + 18);
      ctx.stroke();
      ctx.strokeStyle = "#1C1D1F";
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        const isNew = i >= 6;
        const alpha = isNew ? k : 1;
        const x = grounds12[i];
        const baseX = i < 6 ? grounds6[i] + (grounds12[i] - grounds6[i]) * k : x;
        if (alpha < 0.02) continue;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(baseX, groundY + 18, 5.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(baseX, groundY + 12);
        ctx.lineTo(baseX, groundY - 2);
        ctx.strokeStyle = "#D9D7D0";
        ctx.stroke();
        ctx.strokeStyle = "#1C1D1F";
        ctx.restore();
      }
      ctx.fillStyle = "#3E6B7A";
      teams.forEach((team, i) => {
        const beforeGX = grounds6[team.beforeGround] + (grounds12[team.beforeGround] - grounds6[team.beforeGround]) * k;
        const afterGX = grounds12[team.afterGround];
        const gx = beforeGX + (afterGX - beforeGX) * k;
        const r = 8 + i % 3 * 2.5;
        const ang = (team.orbit + elapsed * 0.02) * Math.PI / 180;
        const x = gx + Math.cos(ang) * r;
        const y = groundY + 18 + Math.sin(ang) * r * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.font = "600 10px 'Inter', sans-serif";
      ctx.fillStyle = "#72767C";
      ctx.textAlign = "left";
      const beforeTeams = 40, beforeGrounds = 6;
      const afterTeams = 40, afterGrounds = 12;
      const ratio = beforeTeams / beforeGrounds + (afterTeams / afterGrounds - beforeTeams / beforeGrounds) * k;
      ctx.fillText(`TEAMS PER GROUND:`, margin, 22);
      ctx.font = "600 18px 'Inter', sans-serif";
      ctx.fillStyle = "#1C1D1F";
      ctx.fillText(ratio.toFixed(1), margin + 146, 24);
      ctx.font = "600 10px 'Inter', sans-serif";
      ctx.fillStyle = "#72767C";
      ctx.textAlign = "right";
      ctx.fillText("GROUNDS", W - margin, 22);
      const gCount = beforeGrounds + (afterGrounds - beforeGrounds) * k;
      ctx.font = "600 18px 'Inter', sans-serif";
      ctx.fillStyle = "#1C1D1F";
      ctx.fillText(gCount.toFixed(0), W - margin, 42);
      if (!reduced) raf.current = requestAnimationFrame(draw);
    }
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      draw(start);
    } else {
      raf.current = requestAnimationFrame(draw);
    }
    return () => cancelAnimationFrame(raf.current);
  }, []);
  return /* @__PURE__ */ React.createElement("figure", { className: "motif motif-demand", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("canvas", { ref }), /* @__PURE__ */ React.createElement("figcaption", { className: "motif-label" }, "Before and after: 40 teams across 6 grounds (today) \u2192 12 grounds (with six new pitches)."));
}
function PaddleBatMotif() {
  const ref = React.useRef(null);
  const raf = React.useRef(0);
  const W = 260, H = 240;
  useCanvasSetup(ref, W, H);
  React.useEffect(() => {
    const ctx = ref.current.getContext("2d");
    const start = performance.now();
    const cx = W / 2, cy = H / 2 + 10;
    const N = 160;
    const paddle = [];
    function paddlePoint(t) {
      const handleHalfW = 8, handleHeight = 50;
      const headR = 44;
      const handleBottomY = cy + 80;
      const headCenterY = cy + 80 - handleHeight - headR + 8;
      if (t < 0.05) {
        const u2 = t / 0.05;
        return [cx + (u2 - 0.5) * 2 * handleHalfW, handleBottomY];
      }
      if (t < 0.2) {
        const u2 = (t - 0.05) / 0.15;
        return [cx + handleHalfW, handleBottomY - u2 * handleHeight];
      }
      if (t < 0.8) {
        const u2 = (t - 0.2) / 0.6;
        const ang = -Math.PI / 2 + u2 * (Math.PI * 2 - 0.6) + 0.3;
        return [cx + Math.sin(ang) * headR, headCenterY - Math.cos(ang) * headR];
      }
      if (t < 0.95) {
        const u2 = (t - 0.8) / 0.15;
        return [cx - handleHalfW, handleBottomY - (1 - u2) * handleHeight];
      }
      const u = (t - 0.95) / 0.05;
      return [cx - handleHalfW + u * handleHalfW * 2 * 0.5 - handleHalfW * 0.5, handleBottomY];
    }
    function batPoint(t) {
      const handleHalfW = 5, handleHeight = 70;
      const bladeHalfW = 20, bladeHeight = 96;
      const bladeBottomY = cy + 92;
      const bladeTopY = bladeBottomY - bladeHeight;
      const handleTopY = bladeTopY - handleHeight;
      if (t < 0.04) {
        const u2 = t / 0.04;
        return [cx + (u2 - 0.5) * 2 * handleHalfW, handleTopY];
      }
      if (t < 0.22) {
        const u2 = (t - 0.04) / 0.18;
        return [cx + handleHalfW, handleTopY + u2 * handleHeight];
      }
      if (t < 0.28) {
        const u2 = (t - 0.22) / 0.06;
        return [cx + handleHalfW + u2 * (bladeHalfW - handleHalfW), bladeTopY];
      }
      if (t < 0.45) {
        const u2 = (t - 0.28) / 0.17;
        return [cx + bladeHalfW, bladeTopY + u2 * (bladeHeight - 10)];
      }
      if (t < 0.55) {
        const u2 = (t - 0.45) / 0.1;
        const ang = -Math.PI / 2 + u2 * Math.PI;
        return [cx + Math.cos(ang) * bladeHalfW + 0, bladeBottomY - 10 + Math.sin(ang) * 10];
      }
      if (t < 0.72) {
        const u2 = (t - 0.55) / 0.17;
        return [cx - bladeHalfW, bladeBottomY - 10 - u2 * (bladeHeight - 10)];
      }
      if (t < 0.78) {
        const u2 = (t - 0.72) / 0.06;
        return [cx - bladeHalfW - u2 * (handleHalfW - bladeHalfW), bladeTopY];
      }
      if (t < 0.96) {
        const u2 = (t - 0.78) / 0.18;
        return [cx - handleHalfW, bladeTopY - u2 * handleHeight];
      }
      const u = (t - 0.96) / 0.04;
      return [cx - handleHalfW + u * handleHalfW, handleTopY];
    }
    const paddlePath = [], batPath = [];
    for (let i = 0; i < N; i++) {
      const t = i / N;
      paddlePath.push(paddlePoint(t));
      batPath.push(batPoint(t));
    }
    const ease = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const CYCLE = 12e3;
    function draw(now) {
      const elapsed = now - start;
      const t = elapsed % CYCLE / CYCLE;
      let k;
      if (t < 0.35) k = 0;
      else if (t < 0.5) k = ease((t - 0.35) / 0.15);
      else if (t < 0.85) k = 1;
      else k = 1 - ease((t - 0.85) / 0.15);
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "#1C1D1F";
      ctx.lineWidth = 1.2;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const a = paddlePath[i], b = batPath[i];
        const x = a[0] + (b[0] - a[0]) * k;
        const y = a[1] + (b[1] - a[1]) * k;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.font = "600 9px 'Inter', sans-serif";
      ctx.fillStyle = "#72767C";
      ctx.textAlign = "center";
      const paddleA = 1 - k, batA = k;
      ctx.save();
      ctx.globalAlpha = paddleA;
      ctx.fillText("PICKLEBALL \xB7 2018\u20132023", cx, H - 10);
      ctx.globalAlpha = batA;
      ctx.fillText("CRICKET \xB7 2025\u2013", cx, H - 10);
      ctx.restore();
      if (!reduced) raf.current = requestAnimationFrame(draw);
    }
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      draw(start);
    } else {
      raf.current = requestAnimationFrame(draw);
    }
    return () => cancelAnimationFrame(raf.current);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "motif motif-precedent", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("canvas", { ref }));
}
Object.assign(window, { TurtleMotif, TeamsGroundsMotif, PaddleBatMotif });
