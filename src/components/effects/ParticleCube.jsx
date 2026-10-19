import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * TAVQO — Volumetric 3D Particle Cube Centerpiece
 * 
 * Features:
 * - Edges & Sides: Broad volumetric particle ribbons (beamRadius = 0.098 * size).
 * - Structure: ONLY edges and sides (~14,500 particles concentrated in the broad beams).
 * - High-Precision Raycast Hover: Perpendicular line-of-sight distance calculation ensures
 *   particles along ANY 3D edge (front, top, side, back) react instantly and vividly to pointer.
 * - Fluid Wave & Swirl: Particles swirl in a luminous vortex and outward harmonic ripple wave.
 * - Luminous White-Lavender Highlights: Particles light up brilliantly under the cursor.
 * - Butter-smooth critically damped spring physics for silky transitions without jitter.
 */
export default function ParticleCube({
  className = "w-full h-full",
  totalParticles = 14500,
  size = 1.66,
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
      console.warn("[ParticleCube] WebGL unavailable:", e);
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 420;

    // 1. Scene & Perspective Camera Setup
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

    // 3. Crisp, Delicate Circular Soft-Glow Dot Texture
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

    // 4. Geometry Generation: Broad Volumetric Edges & Sides Only (Open faces)
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

    // Luminous Color Palette matching Reference:
    const colHighlight = new THREE.Color("#FFFFFF");
    const colTopEdge   = new THREE.Color("#F4F0FF"); // Brilliant white-lavender for top edges
    const colFrontEdge = new THREE.Color("#E0D4FF"); // Luminous lavender for front edges
    const colElectric  = new THREE.Color("#A28EFF"); // Electric violet for vertical side edges
    const colDepth     = new THREE.Color("#6852F0"); // Saturated blue-violet depth for rear/bottom edges

    const H = size * 0.5; // ~0.83
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

    // --- A. 12 Broad Volumetric Edge Ribbons (~86% of particles, ~12,470 particles) ---
    const edgeCount = Math.floor(actualTotal * 0.86);
    const perEdge = Math.floor(edgeCount / 12);
    const beamRadius = 0.098 * size; // Broad volumetric thickness

    for (let e = 0; e < 12; e++) {
      for (let k = 0; k < perEdge; k++) {
        const t = (Math.random() - 0.5) * 2 * H;

        // Volumetric radial cross-section (dense luminous spine with soft outward falloff)
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.pow(Math.random(), 0.68) * beamRadius;
        const d1 = Math.cos(angle) * rad;
        const d2 = Math.sin(angle) * rad;

        let ex = 0, ey = 0, ez = 0;
        let edgeCol = colFrontEdge;

        // 4 Z-parallel edges
        if (e === 0) {
          ex = H + d1; ey = H + d2; ez = t;
          edgeCol = colTopEdge;
        } else if (e === 1) {
          ex = -H + d1; ey = H + d2; ez = t;
          edgeCol = colTopEdge;
        } else if (e === 2) {
          ex = H + d1; ey = -H + d2; ez = t;
          edgeCol = colElectric;
        } else if (e === 3) {
          ex = -H + d1; ey = -H + d2; ez = t;
          edgeCol = colDepth;
        }
        // 4 X-parallel edges
        else if (e === 4) {
          ex = t; ey = H + d1; ez = H + d2;
          edgeCol = colTopEdge;
        } else if (e === 5) {
          ex = t; ey = -H + d1; ez = H + d2;
          edgeCol = colFrontEdge;
        } else if (e === 6) {
          ex = t; ey = H + d1; ez = -H + d2;
          edgeCol = colTopEdge;
        } else if (e === 7) {
          ex = t; ey = -H + d1; ez = -H + d2;
          edgeCol = colDepth;
        }
        // 4 Y-parallel edges (vertical side beams)
        else if (e === 8) {
          ex = H + d1; ey = t; ez = H + d2;
          edgeCol = colFrontEdge;
        } else if (e === 9) {
          ex = -H + d1; ey = t; ez = H + d2;
          edgeCol = colFrontEdge;
        } else if (e === 10) {
          ex = H + d1; ey = t; ez = -H + d2;
          edgeCol = colElectric;
        } else if (e === 11) {
          ex = -H + d1; ey = t; ez = -H + d2;
          edgeCol = colDepth;
        }

        addParticle(ex, ey, ez, edgeCol);
      }
    }

    // --- B. 8 Broad Corner Junctions (~14% of particles, ~2,030 particles) ---
    const cornerCount = actualTotal - idx;
    const perCorner = Math.floor(cornerCount / 8);
    const cornerOffsets = [
      [1, 1, 1], [-1, 1, 1], [1, -1, 1], [-1, -1, 1],
      [1, 1, -1], [-1, 1, -1], [1, -1, -1], [-1, -1, -1],
    ];

    cornerOffsets.forEach(([sx, sy, sz]) => {
      for (let k = 0; k < perCorner; k++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.pow(Math.random(), 0.65) * beamRadius * 1.35;

        const cx = sx * H + r * Math.sin(phi) * Math.cos(theta);
        const cy = sy * H + r * Math.sin(phi) * Math.sin(theta);
        const cz = sz * H + r * Math.cos(phi);

        const isTop = sy > 0;
        const isFront = sz > 0;
        const cornerCol = isTop ? colTopEdge : (isFront ? colFrontEdge : colDepth);

        addParticle(cx, cy, cz, cornerCol);
      }
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // 5. Points Material: Fine, Delicate, Luminous Particles with Additive Blending
    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.038 : 0.044,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.95,
    });

    const cubePoints = new THREE.Points(geometry, material);
    // Initial 3D Isometric View
    cubePoints.rotation.x = 0.44; // ~25 deg tilt
    cubePoints.rotation.y = 0.62; // ~35 deg turn
    scene.add(cubePoints);

    // 6. Smooth Pointer Tracking & Line-of-Sight Raycasting
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(999, 999);
    let isPointerOver = false;
    let hoverFactor = 0; // Smooth 0 -> 1 transition for entering and leaving

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

    // Touch support (gentle responsive touch without stuck hover state)
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

    // 7. 60fps Animation Loop with High-Precision Raycasting & Silky Fluid Dynamics
    let animationFrameId;
    let clock = new THREE.Clock();
    let baseAngleY = 0.62;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth hoverFactor easing (0 -> 1 on enter, 1 -> 0 on leave without sudden jumps)
      const targetHover = isPointerOver && !prefersReducedMotion ? 1.0 : 0.0;
      hoverFactor += (targetHover - hoverFactor) * 0.065;

      // 3D Isometric Continuous Orbit + Subtle Perspective Tilt Toward Pointer
      if (!prefersReducedMotion) {
        baseAngleY += 0.0018;

        const targetTiltX = 0.44 - pointerNDC.y * 0.16 * hoverFactor + Math.sin(elapsedTime * 0.40) * 0.014;
        const targetTiltY = baseAngleY + pointerNDC.x * 0.20 * hoverFactor;
        const targetTiltZ = Math.cos(elapsedTime * 0.32) * 0.010;

        cubePoints.rotation.x += (targetTiltX - cubePoints.rotation.x) * 0.055;
        cubePoints.rotation.y += (targetTiltY - cubePoints.rotation.y) * 0.055;
        cubePoints.rotation.z += (targetTiltZ - cubePoints.rotation.z) * 0.055;
      }
      cubePoints.updateMatrixWorld();

      // Transform the Camera Mouse Ray into the Cube's local rotating coordinate space
      let hasLocalRay = false;
      const rayOriginLocal = new THREE.Vector3();
      const rayDirLocal = new THREE.Vector3();

      if (hoverFactor > 0.002) {
        raycaster.setFromCamera(pointerNDC, camera);
        const invMat = cubePoints.matrixWorld.clone().invert();

        rayOriginLocal.copy(raycaster.ray.origin).applyMatrix4(invMat);
        // Direction vector transformed without translation
        rayDirLocal.copy(raycaster.ray.direction).transformDirection(invMat).normalize();
        hasLocalRay = true;
      }

      // Update particle positions with butter-smooth fluid dynamics
      const posAttr = geometry.attributes.position;
      const colAttr = geometry.attributes.color;
      const posArr = posAttr.array;
      const colArr = colAttr.array;

      // Generous influence radius around mouse ray in cube space
      const influenceRadius = size * 0.48; // ~0.80 units
      const radiusSq = influenceRadius * influenceRadius;

      // Gentle breathing material luminosity
      material.opacity = 0.92 + Math.sin(elapsedTime * 1.4) * 0.03 + hoverFactor * 0.06;

      const smoothSpeed = 0.11; // Lively, responsive, butter-smooth tracking

      for (let i = 0; i < actualTotal; i++) {
        const i3 = i * 3;

        // Base coordinate with smooth thermal idle drift
        const phase = phases[i];
        const driftSpeed = 1.25;
        const driftAmp = 0.006 * (1.0 + hoverFactor * 0.3);
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

        // Exact Perpendicular Line-of-Sight Distance to Mouse Ray:
        if (hasLocalRay && hoverFactor > 0.005) {
          // Vector from ray origin to particle
          const vx = hx - rayOriginLocal.x;
          const vy = hy - rayOriginLocal.y;
          const vz = hz - rayOriginLocal.z;

          // Projection parameter along ray
          const t = vx * rayDirLocal.x + vy * rayDirLocal.y + vz * rayDirLocal.z;

          // Closest point on the mouse ray to this particle
          const cx = rayOriginLocal.x + t * rayDirLocal.x;
          const cy = rayOriginLocal.y + t * rayDirLocal.y;
          const cz = rayOriginLocal.z + t * rayDirLocal.z;

          // Perpendicular displacement vector from ray to particle
          const dx = hx - cx;
          const dy = hy - cy;
          const dz = hz - cz;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < radiusSq && distSq > 0.00001) {
            const dist = Math.sqrt(distSq);
            const normDist = dist / influenceRadius; // 0 (under cursor) to 1 (outer radius)
            const falloff = Math.pow(Math.max(0, 1 - normDist), 1.7);

            // Dynamic fluid wave ripple
            const rippleWave = Math.sin(normDist * Math.PI * 3.0 - elapsedTime * 4.8) * 0.045 * falloff;
            const pushMag = (falloff * 0.18 + rippleWave) * hoverFactor;

            // Fluid tangential swirl around the mouse ray (cross product with ray direction)
            const swirlMag = 0.14 * falloff * hoverFactor;
            // Cross product: (rayDirLocal) x (dx, dy, dz)
            const sx = (rayDirLocal.y * dz - rayDirLocal.z * dy) / dist * swirlMag;
            const sy = (rayDirLocal.z * dx - rayDirLocal.x * dz) / dist * swirlMag;
            const sz = (rayDirLocal.x * dy - rayDirLocal.y * dx) / dist * swirlMag;

            // Target displacement: push outward from ray + tangential fluid vortex
            targetX = hx + (dx / dist) * pushMag + sx;
            targetY = hy + (dy / dist) * pushMag + sy;
            targetZ = hz + (dz / dist) * pushMag + sz;

            agitation = falloff * hoverFactor;
          }
        }

        // Critically Damped Position Lerp:
        posArr[i3]     += (targetX - posArr[i3]) * smoothSpeed;
        posArr[i3 + 1] += (targetY - posArr[i3 + 1]) * smoothSpeed;
        posArr[i3 + 2] += (targetZ - posArr[i3 + 2]) * smoothSpeed;

        // Luminous Color Transition on Hover (Brilliant white-lavender highlights near cursor)
        const br = baseColors[i3];
        const bg = baseColors[i3 + 1];
        const bb = baseColors[i3 + 2];

        const highlightIntensity = Math.min(1.0, hoverFactor * 0.15 + agitation * 0.90);

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
  }, [totalParticles, size]);

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
