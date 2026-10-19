import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * TAVQO — Volumetric 3D Particle Code Symbol </> Centerpiece
 * 
 * Features:
 * - Exact Match to User Reference: Volumetric starry stardust ribbons forming </>.
 * - Circular Repulsion Ring Hover Effect: When the pointer hovers over any arm,
 *   particles directly under the cursor are repelled radially into a clear circular hole,
 *   forming a dense, brilliant white-hot luminous rim around the pointer (exactly like reference).
 * - Dimensions & Zero Clipping: Calibrated to ParticleCube's bounding box (span ~1.44 x 1.24 units).
 *   Leaves >45% safe buffer to canvas boundaries so it never overflows or cuts off anywhere.
 * - Uniform Luminosity: All 5 arms (< top/btm, /, > top/btm) have identical radiant white-lavender
 *   cores (#FFFFFF / #F5F2FF) and electric violet halos (#A592FF).
 * - Butter-smooth Critically Damped Transitions: Silky hover enter, move, and leave dynamics.
 */
export default function ParticleCodeSymbol({
  className = "w-full h-full",
  totalParticles = 14000,
  scale = 1.0,
}) {
  const containerRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check WebGL availability
    let canvas;
    try {
      canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) throw new Error("WebGL not supported");
    } catch (e) {
      console.warn("[ParticleCodeSymbol] WebGL unavailable:", e);
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 420;

    // 1. Scene & Perspective Camera Setup (Matches ParticleCube)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    // 2. High-performance WebGL Renderer with Transparent Canvas
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 3. Crisp, Delicate Circular Soft-Glow Dot Texture (Matches ParticleCube)
    const dotCanvas = document.createElement("canvas");
    dotCanvas.width = 64;
    dotCanvas.height = 64;
    const dotCtx = dotCanvas.getContext("2d");
    if (dotCtx) {
      const gradient = dotCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0.00, "rgba(255, 255, 255, 1.0)");
      gradient.addColorStop(0.22, "rgba(255, 255, 255, 0.95)");
      gradient.addColorStop(0.48, "rgba(238, 232, 255, 0.55)");
      gradient.addColorStop(0.72, "rgba(185, 168, 255, 0.18)");
      gradient.addColorStop(0.90, "rgba(125, 100, 250, 0.04)");
      gradient.addColorStop(1.00, "rgba(0, 0, 0, 0.0)");
      dotCtx.fillStyle = gradient;
      dotCtx.beginPath();
      dotCtx.arc(32, 32, 32, 0, Math.PI * 2);
      dotCtx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(dotCanvas);

    // 4. Geometry Generation: Calibrated to Exact Cube Bounding Footprint
    const isMobile = window.innerWidth < 768;
    const actualTotal = prefersReducedMotion
      ? Math.floor(totalParticles * 0.35)
      : isMobile
        ? Math.floor(totalParticles * 0.65)
        : totalParticles;

    const positions = new Float32Array(actualTotal * 3);
    const basePositions = new Float32Array(actualTotal * 3);
    const colors = new Float32Array(actualTotal * 3);
    const baseColors = new Float32Array(actualTotal * 3);
    const phases = new Float32Array(actualTotal);

    // Uniformly Radiant Color Palette (Matches ParticleCube & User Reference):
    const colHighlight = new THREE.Color("#FFFFFF"); // Pure luminous white core / ring highlight
    const colTopSpine  = new THREE.Color("#F6F3FF"); // Brilliant white-lavender spine
    const colLavender  = new THREE.Color("#E2D8FF"); // Luminous pale lavender
    const colViolet    = new THREE.Color("#A592FF"); // Electric violet halo
    const colPeriwinkle= new THREE.Color("#826CFF"); // Radiant periwinkle edge

    let idx = 0;

    const addParticle = (x, y, z, colorObj) => {
      if (idx >= actualTotal) return;
      const i3 = idx * 3;
      positions[i3]     = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      basePositions[i3]     = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;

      colors[i3]     = colorObj.r;
      colors[i3 + 1] = colorObj.g;
      colors[i3 + 2] = colorObj.b;
      baseColors[i3]     = colorObj.r;
      baseColors[i3 + 1] = colorObj.g;
      baseColors[i3 + 2] = colorObj.b;

      phases[idx] = Math.random() * Math.PI * 2;
      idx++;
    };

    // Helper: Distribute particles along a 3D line segment with volumetric Gaussian cylinder cross-section
    const addSegmentParticles = (p1, p2, count, beamRadius, depthZ, baseColorA, baseColorB) => {
      const vDir = new THREE.Vector3().subVectors(p2, p1);
      vDir.normalize();

      const up = Math.abs(vDir.y) < 0.99 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
      const vPerp1 = new THREE.Vector3().crossVectors(vDir, up).normalize();
      const vPerp2 = new THREE.Vector3().crossVectors(vDir, vPerp1).normalize();

      for (let k = 0; k < count; k++) {
        const t = Math.random();
        const centerPos = new THREE.Vector3().lerpVectors(p1, p2, t);

        // Volumetric radial cross-section (dense core spine with soft radial falloff)
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.pow(Math.random(), 0.68) * beamRadius;
        const r1 = Math.cos(angle) * rad;
        const r2 = Math.sin(angle) * rad;

        // Controlled 3D depth in Z
        const zJitter = (Math.random() - 0.5) * depthZ;

        const px = centerPos.x + vPerp1.x * r1 + vPerp2.x * r2;
        const py = centerPos.y + vPerp1.y * r1 + vPerp2.y * r2;
        const pz = centerPos.z + vPerp1.z * r1 + vPerp2.z * r2 + zJitter;

        // Balanced luminous gradient with glowing white central spine
        const zNorm = (pz + depthZ * 0.5) / depthZ;
        const col = new THREE.Color().copy(baseColorA).lerp(baseColorB, zNorm);
        if (rad < beamRadius * 0.42) {
          col.lerp(colHighlight, 0.72); // Crisp brilliant spine
        }

        addParticle(px, py, pz, col);
      }
    };

    // Helper: Add rounded terminal node at vertex tips
    const addTipNode = (center, count, radius, baseColor) => {
      for (let k = 0; k < count; k++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.pow(Math.random(), 0.65) * radius;

        const px = center.x + r * Math.sin(phi) * Math.cos(theta);
        const py = center.y + r * Math.sin(phi) * Math.sin(theta);
        const pz = center.z + r * Math.cos(phi);

        const col = new THREE.Color().copy(baseColor);
        if (r < radius * 0.45) col.lerp(colHighlight, 0.80);
        addParticle(px, py, pz, col);
      }
    };

    // Calibrated Dimensions (Matching ParticleCube Footprint, Zero Frustum Clipping):
    // Total horizontal span = 1.44 units (X in [-0.72, +0.72]).
    // Total vertical span   = 1.24 units (Y in [-0.62, +0.62]).
    // Camera frustum extent at Z=0 is +/- 1.584 units, giving >45% safe padding on all borders!
    const S = scale * 1.0;
    const beamRad = 0.056 * S;        // Refined, airy, elegant volumetric stroke
    const depthExtrusion = 0.18 * S;  // Balanced 3D depth relief

    // --- 1. Left Bracket '<' ---
    // Outer tip: (-0.72 * S, 0.0)
    // Inner top: (-0.28 * S, +0.52 * S)
    // Inner btm: (-0.28 * S, -0.52 * S)
    const leftBracketTip = new THREE.Vector3(-0.72 * S, 0.0, 0.0);
    const leftBracketTop = new THREE.Vector3(-0.28 * S, 0.52 * S, 0.0);
    const leftBracketBtm = new THREE.Vector3(-0.28 * S, -0.52 * S, 0.0);

    const armCount = Math.floor(actualTotal * 0.175);
    const tipCount = Math.floor(actualTotal * 0.035);

    addSegmentParticles(leftBracketTip, leftBracketTop, armCount, beamRad, depthExtrusion, colLavender, colTopSpine);
    addSegmentParticles(leftBracketTip, leftBracketBtm, armCount, beamRad, depthExtrusion, colViolet, colTopSpine);
    addTipNode(leftBracketTip, tipCount, beamRad * 1.25, colTopSpine);
    addTipNode(leftBracketTop, Math.floor(tipCount * 0.7), beamRad * 1.15, colTopSpine);
    addTipNode(leftBracketBtm, Math.floor(tipCount * 0.7), beamRad * 1.15, colLavender);

    // --- 2. Forward Slash '/' ---
    // Slanted beam: (-0.10 * S, -0.62 * S) to (+0.10 * S, +0.62 * S)
    const slashStart = new THREE.Vector3(-0.10 * S, -0.62 * S, 0.0);
    const slashEnd   = new THREE.Vector3(+0.10 * S, +0.62 * S, 0.0);
    const slashCount = Math.floor(actualTotal * 0.28);

    addSegmentParticles(slashStart, slashEnd, slashCount, beamRad * 1.05, depthExtrusion * 1.05, colViolet, colTopSpine);
    addTipNode(slashEnd, Math.floor(tipCount * 0.8), beamRad * 1.2, colTopSpine);
    addTipNode(slashStart, Math.floor(tipCount * 0.8), beamRad * 1.2, colPeriwinkle);

    // --- 3. Right Bracket '>' (Uniformly Luminous & Symmetrical) ---
    // Inner top: (+0.28 * S, +0.52 * S)
    // Inner btm: (+0.28 * S, -0.52 * S)
    // Outer tip: (+0.72 * S, 0.0)
    const rightBracketTip = new THREE.Vector3(+0.72 * S, 0.0, 0.0);
    const rightBracketTop = new THREE.Vector3(+0.28 * S, 0.52 * S, 0.0);
    const rightBracketBtm = new THREE.Vector3(+0.28 * S, -0.52 * S, 0.0);

    addSegmentParticles(rightBracketTop, rightBracketTip, armCount, beamRad, depthExtrusion, colLavender, colTopSpine);
    addSegmentParticles(rightBracketBtm, rightBracketTip, armCount, beamRad, depthExtrusion, colViolet, colTopSpine);
    addTipNode(rightBracketTip, tipCount, beamRad * 1.25, colTopSpine);
    addTipNode(rightBracketTop, Math.floor(tipCount * 0.7), beamRad * 1.15, colTopSpine);
    addTipNode(rightBracketBtm, Math.floor(tipCount * 0.7), beamRad * 1.15, colLavender);

    // Distribute any remainder evenly across the slash
    while (idx < actualTotal) {
      addSegmentParticles(slashStart, slashEnd, 1, beamRad, depthExtrusion, colLavender, colTopSpine);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // 5. Points Material: Delicate, Luminous Particles with Additive Blending (Matches ParticleCube)
    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.038 : 0.044,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.95,
    });

    const symbolPoints = new THREE.Points(geometry, material);
    // Subtle 3D Isometric View (tiltX = 0.14, tiltY = 0.18)
    symbolPoints.rotation.x = 0.14;
    symbolPoints.rotation.y = 0.18;
    scene.add(symbolPoints);

    // 6. Smooth Pointer Tracking & Line-of-Sight Raycasting
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(999, 999);
    let isPointerOver = false;
    let hoverFactor = 0;

    const updatePointerNDC = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onPointerMove = (e) => {
      updatePointerNDC(e.clientX, e.clientY);
      isPointerOver = true;
    };

    const onPointerEnter = (e) => {
      updatePointerNDC(e.clientX, e.clientY);
      isPointerOver = true;
    };

    const onPointerLeave = () => {
      isPointerOver = false;
    };

    // Touch support
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updatePointerNDC(e.touches[0].clientX, e.touches[0].clientY);
        isPointerOver = true;
      }
    };

    const onTouchEnd = () => {
      isPointerOver = false;
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    // 7. 60fps Animation Loop: Holographic Floating with Circular Repulsion Ring Physics
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth hoverFactor easing (0 -> 1 on enter, 1 -> 0 on leave without sudden jumps)
      const targetHover = isPointerOver && !prefersReducedMotion ? 1.0 : 0.0;
      hoverFactor += (targetHover - hoverFactor) * 0.065;

      // Holographic Floating: Dignified subtle yaw and pitch, front-facing 3D presence
      if (!prefersReducedMotion) {
        const idlePitch = Math.sin(elapsedTime * 0.40) * 0.016 + 0.14;
        const idleYaw   = Math.sin(elapsedTime * 0.30) * 0.028 + 0.18;
        const idleRoll  = Math.cos(elapsedTime * 0.25) * 0.008;

        const targetTiltX = idlePitch - pointerNDC.y * 0.12 * hoverFactor;
        const targetTiltY = idleYaw + pointerNDC.x * 0.16 * hoverFactor;
        const targetTiltZ = idleRoll;

        symbolPoints.rotation.x += (targetTiltX - symbolPoints.rotation.x) * 0.055;
        symbolPoints.rotation.y += (targetTiltY - symbolPoints.rotation.y) * 0.055;
        symbolPoints.rotation.z += (targetTiltZ - symbolPoints.rotation.z) * 0.055;
      }
      symbolPoints.updateMatrixWorld();

      // Transform Camera Mouse Ray into symbol's local rotating coordinate space
      let hasLocalRay = false;
      const rayOriginLocal = new THREE.Vector3();
      const rayDirLocal = new THREE.Vector3();

      if (hoverFactor > 0.002) {
        raycaster.setFromCamera(pointerNDC, camera);
        const invMat = symbolPoints.matrixWorld.clone().invert();

        rayOriginLocal.copy(raycaster.ray.origin).applyMatrix4(invMat);
        rayDirLocal.copy(raycaster.ray.direction).transformDirection(invMat).normalize();
        hasLocalRay = true;
      }

      // Update particle positions with circular repulsion ring physics
      const posAttr = geometry.attributes.position;
      const colAttr = geometry.attributes.color;
      const posArr = posAttr.array;
      const colArr = colAttr.array;

      // Hover Repulsion Ring Parameters (Matches User Reference Image):
      // repelRadius: The clear circular hole under cursor (~45px radius)
      // outerInfluence: The boundary where the ring blends back into undisturbed particles
      const repelRadius = 0.20 * S;
      const outerInfluence = 0.52 * S;
      const outerRadiusSq = outerInfluence * outerInfluence;

      // Gentle breathing material luminosity
      material.opacity = 0.94 + Math.sin(elapsedTime * 1.4) * 0.03 + hoverFactor * 0.05;

      const smoothSpeed = 0.11;

      for (let i = 0; i < actualTotal; i++) {
        const i3 = i * 3;

        // Base coordinate with smooth thermal idle drift
        const phase = phases[i];
        const driftSpeed = 1.25;
        const driftAmp = 0.0055 * (1.0 + hoverFactor * 0.3);
        const flutterX = Math.sin(elapsedTime * driftSpeed + phase) * driftAmp;
        const flutterY = Math.cos(elapsedTime * (driftSpeed * 0.85) + phase) * driftAmp;
        const flutterZ = Math.sin(elapsedTime * (driftSpeed * 1.1) + phase) * driftAmp;

        const hx = basePositions[i3] + flutterX;
        const hy = basePositions[i3 + 1] + flutterY;
        const hz = basePositions[i3 + 2] + flutterZ;

        let targetX = hx;
        let targetY = hy;
        let targetZ = hz;
        let agitation = 0;

        // Perpendicular Line-of-Sight Distance to Mouse Ray:
        if (hasLocalRay && hoverFactor > 0.005) {
          const vx = hx - rayOriginLocal.x;
          const vy = hy - rayOriginLocal.y;
          const vz = hz - rayOriginLocal.z;

          const t = vx * rayDirLocal.x + vy * rayDirLocal.y + vz * rayDirLocal.z;

          const cx = rayOriginLocal.x + t * rayDirLocal.x;
          const cy = rayOriginLocal.y + t * rayDirLocal.y;
          const cz = rayOriginLocal.z + t * rayDirLocal.z;

          const dx = hx - cx;
          const dy = hy - cy;
          const dz = hz - cz;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < outerRadiusSq) {
            const dist = Math.max(0.0001, Math.sqrt(distSq));
            const ux = dx / dist;
            const uy = dy / dist;
            const uz = dz / dist;

            const activeHole = repelRadius * hoverFactor;

            if (dist < activeHole) {
              // ==============================================================
              // INSIDE REPULSION HOLE:
              // Particles are pushed cleanly outward to the perimeter of the ring,
              // creating the hollow circular clearing shown in the reference image.
              // ==============================================================
              const pushOut = (activeHole - dist) + 0.034;
              
              // Tangential swirl along the ring rim
              const swirl = 0.06 * hoverFactor;
              const sx = -uy * swirl;
              const sy = ux * swirl;

              targetX = hx + ux * pushOut + sx;
              targetY = hy + uy * pushOut + sy;
              targetZ = hz + uz * pushOut;

              // Maximum brilliant white highlight at the ring edge
              agitation = 1.0 * hoverFactor;
            } else {
              // ==============================================================
              // AT & JUST OUTSIDE THE RING RIM:
              // Particles compress into a dense, glowing circular ring with soft outward falloff.
              // ==============================================================
              const rimNorm = (dist - activeHole) / (outerInfluence - activeHole);
              const rimFalloff = Math.max(0, 1 - rimNorm);

              // Harmonic fluid wave ripple
              const ripple = Math.sin(rimNorm * Math.PI * 3.0 - elapsedTime * 4.6) * 0.032 * rimFalloff;
              const pushRim = (rimFalloff * 0.07 + ripple) * hoverFactor;

              // Fluid tangential vortex
              const swirl = 0.08 * rimFalloff * hoverFactor;
              const sx = -uy * swirl;
              const sy = ux * swirl;

              targetX = hx + ux * pushRim + sx;
              targetY = hy + uy * pushRim + sy;
              targetZ = hz + uz * pushRim;

              agitation = Math.pow(rimFalloff, 1.3) * hoverFactor;
            }
          }
        }

        // Critically Damped Position Lerp:
        posArr[i3]     += (targetX - posArr[i3]) * smoothSpeed;
        posArr[i3 + 1] += (targetY - posArr[i3 + 1]) * smoothSpeed;
        posArr[i3 + 2] += (targetZ - posArr[i3 + 2]) * smoothSpeed;

        // Luminous Color Transition on Hover (Pure glowing white at the ring rim)
        const br = baseColors[i3];
        const bg = baseColors[i3 + 1];
        const bb = baseColors[i3 + 2];

        const highlightIntensity = Math.min(1.0, hoverFactor * 0.12 + agitation * 0.92);

        if (highlightIntensity > 0.005) {
          const targetR = br + (colHighlight.r - br) * highlightIntensity;
          const targetG = bg + (colHighlight.g - bg) * highlightIntensity;
          const targetB = bb + (colHighlight.b - bb) * highlightIntensity;

          colArr[i3]     += (targetR - colArr[i3]) * 0.09;
          colArr[i3 + 1] += (targetG - colArr[i3 + 1]) * 0.09;
          colArr[i3 + 2] += (targetB - colArr[i3 + 2]) * 0.09;
        } else {
          colArr[i3]     += (br - colArr[i3]) * 0.06;
          colArr[i3 + 1] += (bg - colArr[i3 + 1]) * 0.06;
          colArr[i3 + 2] += (bb - colArr[i3 + 2]) * 0.06;
        }
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 9. Resource Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [totalParticles, scale]);

  if (!hasWebGL) {
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        aria-hidden="true"
      >
        <div
          className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-2xl blur-[50px] opacity-55"
          style={{
            background: "radial-gradient(circle, #8275FF 0%, #11112C 60%, transparent 80%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square flex items-center justify-center overflow-visible select-none cursor-default ${className}`}
      aria-hidden="true"
    />
  );
}
