import { useEffect, useRef } from "react";

const MAX_DPR = 2;

const VERT_SRC = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime, uDpr, uCell, uDot;
uniform float uPeak, uHeight, uThick, uFall;
uniform vec3  uBg, uBase, uAccent, uHigh;
uniform vec2  uMouse;
uniform float uMouseRadius, uMouseStrength;
uniform float uMouseActive;
uniform float uTransparent;

void main(){
  float cs = max(uCell, 2.0);
  vec2 ci = floor(gl_FragCoord.xy / cs);
  vec2 cc = (ci + 0.5) * cs;               // cell centre, device px

  // CSS pixels: coordinate space runs from top-left (0,0) to bottom-right (w,h)
  float x = cc.x / uDpr;
  float y = (uRes.y - cc.y) / uDpr;        // canvas y runs down from top (0 at top, h at bottom)
  float w = uRes.x / uDpr;
  float h = uRes.y / uDpr;

  float normX = (x - w * 0.5) / (w * 0.75);
  float curveY = h * uPeak + normX * normX * (h * uHeight);

  // Smooth pointer bend deformation:
  // Pull curveY toward uMouse.y using Gaussian falloff based on horizontal distance
  float mdx = x - uMouse.x;
  float influence = uMouseStrength * exp(-(mdx * mdx) / (2.0 * uMouseRadius * uMouseRadius + 1.0));
  curveY = mix(curveY, uMouse.y, influence);

  // 2D distance to mouse for interactive brightness, highlight glow & 3D depth illusion
  float dMouse = length(vec2(x - uMouse.x, y - uMouse.y));
  float mouseProximity = uMouseActive * exp(-(dMouse * dMouse) / (2.0 * (uMouseRadius * 0.85) * (uMouseRadius * 0.85) + 1.0));

  float dist = abs(y - curveY);
  float th = (140.0 + (1.0 - abs(normX)) * 80.0) * uThick;

  vec4 finalCol = (uTransparent > 0.5) ? vec4(0.0, 0.0, 0.0, 0.0) : vec4(uBg, 1.0);

  if (dist < th) {
    float i = 1.0 - dist / th;
    float waveX = sin(x * 0.015 + uTime);
    float waveY = cos(y * 0.02 + uTime);
    i = i * 0.7 + waveX * waveY * 0.3 * i;
    i *= max(0.0, 1.0 - pow(abs(normX), uFall));

    // Dynamic brightness boost near cursor
    i = clamp(i + mouseProximity * 0.32, 0.0, 1.0);

    if (i > 0.02) {
      // Square dot, centred in its cell, side carrying the intensity
      // Subtle 3D particle scale increase near pointer
      float side = uDot * i * uDpr * (1.0 + mouseProximity * 0.28);
      vec2 d = abs(gl_FragCoord.xy - cc);
      float cov = 1.0 - smoothstep(side * 0.5 - 1.0, side * 0.5 + 1.0, max(d.x, d.y));

      vec3 ink = mix(uBase, uAccent, clamp(pow(i, 1.1), 0.0, 1.0));

      // Darken the back side of the predictive arc (upper/receding side where y < curveY)
      if (y < curveY) {
        float backDepth = clamp((curveY - y) / th, 0.0, 1.0);
        ink = mix(ink, uBase * 0.65, backDepth * 0.65);
      }

      // Add gentle champagne-gold highlight (uHigh) around interaction region
      float highMix = clamp(smoothstep(0.70, 1.0, i) + mouseProximity * 0.55, 0.0, 1.0);
      ink = mix(ink, uHigh, highMix);

      float alpha = cov * clamp(i * 1.6, 0.0, 1.0);

      if (uTransparent > 0.5) {
        finalCol = vec4(ink, alpha);
      } else {
        finalCol = vec4(mix(uBg, ink, alpha), 1.0);
      }
    }
  }
  gl_FragColor = finalCol;
}
`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("PredictiveArc shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function parseColor(input, fb) {
  if (!input) return fb;
  const str = String(input).trim();
  if (str.charAt(0) === "#") {
    let hex = str.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r / 255, g / 255, b / 255];
    }
    return fb;
  }
  const m = str.match(/[\d.]+/g);
  if (m && m.length >= 3) {
    return [
      Math.min(255, parseFloat(m[0])) / 255,
      Math.min(255, parseFloat(m[1])) / 255,
      Math.min(255, parseFloat(m[2])) / 255,
    ];
  }
  return fb;
}

function num(v, fb) {
  return typeof v === "number" && isFinite(v) ? v : fb;
}

function clampN(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

const ARCH_DEFAULTS = { peak: 35, archHeight: 70, thickness: 100, falloff: 250 };
const POINTER_DEFAULTS = { enabled: true, radius: 280, strength: 85 };

export default function PredictiveArc({
  style,
  background = "#030303",
  baseColor = "#FF0000",
  accentColor = "#FF9898",
  highlight = "#FF0000",
  density = 78,
  dotSize = 102,
  speed = 100,
  arch,
  pointer,
  width,
  height,
  transparent = false,
  interactiveTargetRef,
}) {
  const arch_ = { ...ARCH_DEFAULTS, ...(arch || {}) };
  const pointer_ = { ...POINTER_DEFAULTS, ...(pointer || {}) };

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  sizeRef.current = { w: num(width, 0), h: num(height, 0) };

  const vRef = useRef({});
  vRef.current = {
    bg: background,
    base: baseColor,
    accent: accentColor,
    high: highlight,
    density: Math.round(clampN(num(density, 160), 40, 320)),
    dotSize: clampN(num(dotSize, 100), 20, 400) / 100,
    speed: clampN(num(speed, 50), 0, 100) / 50,
    peak: clampN(num(arch_.peak, 35), 0, 100) / 100,
    archHeight: clampN(num(arch_.archHeight, 70), 0, 300) / 100,
    thickness: clampN(num(arch_.thickness, 100), 20, 400) / 100,
    falloff: clampN(num(arch_.falloff, 250), 50, 600) / 100,
    pointerEnabled: pointer_.enabled !== false,
    pointerRadius: clampN(num(pointer_.radius, 280), 40, 600),
    pointerStrength: clampN(num(pointer_.strength, 85), 0, 100) / 100,
    transparent: Boolean(transparent),
  };

  const pointerStateRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: 0,
    targetActive: 0,
  });

  const handlePointerMove = (e) => {
    if (!vRef.current.pointerEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top; // Match shader's CSS y (0 at top, h at bottom)
    const ps = pointerStateRef.current;
    ps.targetX = x;
    ps.targetY = y;
    ps.targetActive = 1;
  };

  const handlePointerLeave = () => {
    pointerStateRef.current.targetActive = 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize pointer coordinates to center
    const initialW = sizeRef.current.w || canvas.clientWidth || 1200;
    const initialH = sizeRef.current.h || canvas.clientHeight || 800;
    const ps = pointerStateRef.current;
    ps.x = initialW * 0.5;
    ps.targetX = initialW * 0.5;
    ps.y = initialH * vRef.current.peak;
    ps.targetY = initialH * vRef.current.peak;

    const isTransparent = Boolean(transparent);
    const gl = canvas.getContext("webgl", {
      alpha: isTransparent,
      antialias: false,
      depth: false,
      premultipliedAlpha: true,
    });

    if (!gl) {
      console.warn("PredictiveArc: WebGL unavailable");
      return;
    }

    if (isTransparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("PredictiveArc link:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const locs = {};
    const u = (name) => {
      if (!(name in locs)) locs[name] = gl.getUniformLocation(prog, name);
      return locs[name];
    };

    let raf = 0;
    let last = performance.now();
    let clock = 0;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const render = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const v = vRef.current;

      const motionMultiplier = prefersReducedMotion ? 0.15 : 1.0;
      clock = (clock + dt * 0.9 * v.speed * motionMultiplier) % 6283;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const container = containerRef.current;
      const cw = sizeRef.current.w || (container ? container.clientWidth : canvas.clientWidth) || 1200;
      const ch = sizeRef.current.h || (container ? container.clientHeight : canvas.clientHeight) || 800;
      const bw = Math.max(1, Math.round(cw * dpr));
      const bh = Math.max(1, Math.round(ch * dpr));

      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      gl.viewport(0, 0, bw, bh);

      if (v.transparent) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }

      const pitchCss = Math.min(bw, bh) / dpr / v.density;

      // Smooth pointer tracking and easing
      const posLerp = Math.min(1, dt * 10);
      const activeLerp = Math.min(1, dt * 6);
      ps.x += (ps.targetX - ps.x) * posLerp;
      ps.y += (ps.targetY - ps.y) * posLerp;
      ps.active += (ps.targetActive - ps.active) * activeLerp;

      gl.uniform2f(u("uRes"), bw, bh);
      gl.uniform1f(u("uTime"), clock);
      gl.uniform1f(u("uDpr"), dpr);
      gl.uniform1f(u("uCell"), Math.max(2, pitchCss * dpr));
      gl.uniform1f(u("uDot"), pitchCss * 1.2 * v.dotSize);
      gl.uniform1f(u("uPeak"), v.peak);
      gl.uniform1f(u("uHeight"), v.archHeight);
      gl.uniform1f(u("uThick"), v.thickness);
      gl.uniform1f(u("uFall"), v.falloff);
      gl.uniform2f(u("uMouse"), ps.x, ps.y);
      gl.uniform1f(u("uMouseRadius"), v.pointerRadius);
      gl.uniform1f(
        u("uMouseStrength"),
        v.pointerEnabled ? v.pointerStrength * ps.active : 0
      );
      gl.uniform1f(u("uMouseActive"), v.pointerEnabled ? ps.active : 0);
      gl.uniform1f(u("uTransparent"), v.transparent ? 1.0 : 0.0);

      const cg = parseColor(v.bg, [0.012, 0.012, 0.012]);
      const cb = parseColor(v.base, [0.169, 0.055, 0.369]);
      const ca = parseColor(v.accent, [0.627, 0.314, 1.0]);
      const chh = parseColor(v.high, [1, 1, 1]);
      gl.uniform3f(u("uBg"), cg[0], cg[1], cg[2]);
      gl.uniform3f(u("uBase"), cb[0], cb[1], cb[2]);
      gl.uniform3f(u("uAccent"), ca[0], ca[1], ca[2]);
      gl.uniform3f(u("uHigh"), chh[0], chh[1], chh[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    // Event listener connection for interactive target (hero section or container)
    const targetEl =
      (interactiveTargetRef && interactiveTargetRef.current) ||
      canvas.closest("section") ||
      containerRef.current ||
      canvas;

    const onTargetMove = (e) => {
      handlePointerMove(e);
    };

    const onTargetLeave = () => {
      handlePointerLeave();
    };

    if (targetEl) {
      targetEl.addEventListener("pointermove", onTargetMove, { passive: true });
      targetEl.addEventListener("pointerleave", onTargetLeave, { passive: true });
      targetEl.addEventListener("pointercancel", onTargetLeave, { passive: true });
    }
    window.addEventListener("pointerleave", onTargetLeave, { passive: true });

    // ResizeObserver for responsive canvas updates without overflow
    let ro = null;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        // Size updates read container size in next requestAnimationFrame
      });
      ro.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(raf);
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (targetEl) {
        targetEl.removeEventListener("pointermove", onTargetMove);
        targetEl.removeEventListener("pointerleave", onTargetLeave);
        targetEl.removeEventListener("pointercancel", onTargetLeave);
      }
      window.removeEventListener("pointerleave", onTargetLeave);
      if (ro) ro.disconnect();
      if (buf) gl.deleteBuffer(buf);
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      if (prog) gl.deleteProgram(prog);
    };
  }, [transparent, interactiveTargetRef]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        overflow: "hidden",
        width: typeof width === "number" && width > 0 ? width : "100%",
        height: typeof height === "number" && height > 0 ? height : "100%",
        touchAction: "none",
        ...style,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}

PredictiveArc.displayName = "PredictiveArc";
