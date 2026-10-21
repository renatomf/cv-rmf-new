"use client";

import { useEffect, useRef, useState } from "react";

// Render at half resolution and ~30fps: the backdrop is soft, so upscaling is
// invisible and it keeps the GPU cost negligible.
const RESOLUTION_SCALE = 0.5;
const FRAME_MS = 1000 / 30;

// gradflow config: type mesh, speed 2.2, scale 1.7, noise 0.05.
const SPEED = 2.2;

// Static approximation of the shader, shown while WebGL loads (or if it's unavailable).
const FALLBACK_BACKGROUND =
  "radial-gradient(ellipse at 50% 40%, #2c2c2c 0%, #161616 60%, #0a0a0a 100%)";

const VERTEX = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

// gradflow's "mesh" (github.com/meerbahadin/gradflow) with its three colors
// swapped for greys: three soft blobs drifting and blending into each other.
const FRAGMENT = `
precision mediump float;
uniform vec2 r;
uniform float t;
// xy: pointer in uv space, z: lens strength
uniform vec3 m;

const vec3 COLOR1 = vec3(0.15);
const vec3 COLOR2 = vec3(0.02);
const vec3 COLOR3 = vec3(0.25);
const float SCALE = 1.7;
const float NOISE = 0.05;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 screenUv = gl_FragCoord.xy / r;
  vec2 uv = screenUv;
  float ratio = r.x / r.y;

  // Follow the pointer: pull the sample point toward it so the pattern
  // swells underneath, like gradflow's interactive lens.
  if (m.z > 0.001) {
    vec2 d = uv - m.xy;
    d.x *= ratio;
    float lens = exp(-dot(d, d) * 7.0) * m.z;
    uv -= (uv - m.xy) * lens * 0.4;
  }

  vec2 p = vec2(uv.x * ratio, uv.y);
  float tt = t * 0.6;

  vec2 c1 = vec2((0.3 + 0.25 * sin(tt * 0.9)) * ratio, 0.4 + 0.3 * cos(tt * 0.7));
  vec2 c2 = vec2((0.7 + 0.25 * cos(tt * 0.8)) * ratio, 0.6 + 0.3 * sin(tt * 1.1));
  vec2 c3 = vec2((0.5 + 0.3 * sin(tt * 0.6 + 2.0)) * ratio, 0.5 + 0.35 * cos(tt * 0.9 + 4.0));

  float falloff = 1.5 + SCALE * 2.5;
  float w1 = exp(-falloff * dot(p - c1, p - c1));
  float w2 = exp(-falloff * dot(p - c2, p - c2));
  float w3 = exp(-falloff * dot(p - c3, p - c3));
  float wBase = 0.08;

  // Soft base so areas far from every blob stay shaded.
  vec3 base = mix(COLOR1, COLOR3, uv.y);
  vec3 col = (COLOR1 * w1 + COLOR2 * w2 + COLOR3 * w3 + base * wBase) / (w1 + w2 + w3 + wBase);

  // Film grain, same formula as gradflow's noise setting.
  float grain = hash(screenUv * 200.0 + t * 0.1);
  col *= 1.0 - NOISE * 0.4 + NOISE * grain * 0.4;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

export default function ShaderBackdrop({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl: WebGLRenderingContext | null = null;
    let raf = 0;
    let last = 0;
    let visible = false;
    let initialized = false;
    let idleHandle = 0;
    let uResolution: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uPointer: WebGLUniformLocation | null = null;
    const start = performance.now();

    // Pointer target (from events) and the eased value sent to the shader, so
    // the lens glides after the cursor and fades in/out instead of popping.
    const target = { x: 0.5, y: 0.5, strength: 0 };
    const pointer = { x: 0.5, y: 0.5, strength: 0 };
    let lastDraw = start;

    const resize = () => {
      if (!gl) return;
      const width = Math.max(1, Math.round(canvas.clientWidth * RESOLUTION_SCALE));
      const height = Math.max(1, Math.round(canvas.clientHeight * RESOLUTION_SCALE));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uResolution, width, height);
    };

    const draw = (now: number) => {
      if (!gl) return;
      const dt = Math.min((now - lastDraw) / 1000, 0.1);
      lastDraw = now;
      const follow = 1 - Math.exp(-dt * 6);
      const fade = 1 - Math.exp(-dt * 3);
      pointer.x += (target.x - pointer.x) * follow;
      pointer.y += (target.y - pointer.y) * follow;
      pointer.strength += (target.strength - pointer.strength) * fade;

      gl.uniform1f(uTime, ((now - start) / 1000) * SPEED);
      gl.uniform3f(uPointer, pointer.x, pointer.y, pointer.strength);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      draw(now);
    };

    const play = () => {
      if (!gl || raf || reducedMotion || !visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };

    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const init = () => {
      gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        powerPreference: "low-power",
      });
      if (!gl) return;

      const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      const program = gl.createProgram();
      if (!vertex || !fragment || !program) return;
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);

      // One oversized triangle covering the viewport.
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, "p");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      uResolution = gl.getUniformLocation(program, "r");
      uTime = gl.getUniformLocation(program, "t");
      uPointer = gl.getUniformLocation(program, "m");

      resize();
      draw(performance.now());
      setReady(true);
      play();
    };

    // Only spin up WebGL once the canvas is actually on screen, and off the
    // critical path so it never competes with the initial page load.
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !initialized) {
        initialized = true;
        idleHandle =
          "requestIdleCallback" in window
            ? window.requestIdleCallback(init, { timeout: 1500 })
            : window.setTimeout(init, 300);
      }
      if (visible) play();
      else pause();
    });
    intersection.observe(canvas);

    // Resizing clears the canvas, so redraw in the same frame to avoid a flash.
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const onVisibilityChange = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibilityChange);

    // The canvas sits behind the content with pointer events off, so track the
    // pointer on the window and map it into the canvas' uv space.
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      target.x = x;
      target.y = y;
      target.strength = x >= 0 && x <= 1 && y >= 0 && y <= 1 ? 1 : 0;
    };
    const onPointerLeave = () => {
      target.strength = 0;
    };
    if (!reducedMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      pause();
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle);
      else window.clearTimeout(idleHandle);
      intersection.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Viewport-sized and anchored right, so the docking hero only crops it
          while scrolling instead of resizing (and clearing) the canvas */}
      <div
        className="absolute right-0 top-0 h-full w-screen"
        style={{ background: FALLBACK_BACKGROUND }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`size-full transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
