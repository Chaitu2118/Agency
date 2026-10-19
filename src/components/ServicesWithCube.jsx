import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleCube from "./effects/ParticleCube";
import ParticleCodeSymbol from "./effects/ParticleCodeSymbol";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// REAL, RECOGNIZABLE TECHNOLOGY LOGOS (CLEAN SVG ICONS)
// ============================================================================

function ReactLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23 23 20.46" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NextjsLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.8 17.65-6.57-8.49v8.49H9.4V6.35h1.83l6.57 8.49V6.35h1.83v11.3h-1.83z" />
    </svg>
  );
}

function TypeScriptLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M11.5 8.5H6.5V10.2H8.1V17H9.9V10.2H11.5V8.5Z" fill="white" />
      <path d="M17.5 10.7C17.1 10.2 16.4 9.9 15.4 9.9C14.4 9.9 13.6 10.4 13.6 11.2C13.6 12 14.2 12.4 15.3 12.8C16.8 13.3 17.8 13.9 17.8 15.2C17.8 16.6 16.6 17.3 15.1 17.3C13.8 17.3 12.7 16.7 12.2 15.7L13.7 14.8C14 15.4 14.5 15.8 15.2 15.8C15.8 15.8 16.2 15.5 16.2 15C16.2 14.4 15.7 14.1 14.8 13.7C13.5 13.2 12.3 12.6 12.3 11.3C12.3 10 13.4 8.5 15.3 8.5C16.4 8.5 17.3 9 17.8 9.7L17.5 10.7Z" fill="white" />
    </svg>
  );
}

function ReactNativeLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23 23 20.46" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#38BDF8" />
      <g stroke="#38BDF8" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function FlutterLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M14.31 2.5L3.89 12.92l3.22 3.22 13.64-13.64H14.31z" fill="#02569B" />
      <path d="M14.29 11.66L8.85 17.1l3.22 3.22 2.22-2.22 5.44-5.44h-5.44z" fill="#0175C2" />
      <path d="M11.07 19.32l2.22 2.22h6.42l-5.42-5.44-3.22 3.22z" fill="#29B6F6" />
    </svg>
  );
}

function SwiftLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M21.5 16.8C18.2 21.8 11.7 23.3 6.3 19.8C5.2 19.1 4.2 18.2 3.3 17.3C6.3 18.9 9.9 18.9 12.9 17.2C8.3 16.4 4.8 13.1 3.8 8.6C4.8 9.8 6.1 10.7 7.5 11.2C5.3 8.7 4.7 5 6 1.9C7.8 4.7 10.5 6.9 13.7 8.1C13.6 7.6 13.5 7.1 13.5 6.6C13.6 3.7 15.8 1.4 18.7 1.2C17.4 3.1 17.2 5.5 18.2 7.6C19.7 8.2 21.4 8.5 23 8.5C21.8 9.8 20.3 10.8 18.7 11.4C20.6 12.8 21.6 15 21.5 16.8Z" fill="#F05138" />
    </svg>
  );
}

function PostgreSQLLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.5 2 6 4 6 7c0 1.8.8 3.3 2 4.2V13c-2.5.5-4 2-4 4.5 0 2.8 2.5 4.5 6 4.5s5-1.5 5.5-3.5c1.5.3 3-.2 3.8-1.5.8-1.2.7-2.7-.2-3.8.5-.8.9-1.8.9-2.7 0-4-3.5-8-8-8zm-2 5c0-1.7 1.5-3 3-3s3 1.3 3 3c0 .8-.3 1.5-.8 2-.6.6-1.4.9-2.2.9s-1.6-.3-2.2-.9c-.5-.5-.8-1.2-.8-2zm6.2 8.8c-.4.7-1.3 1.1-2.2.9v-.9c0-1.2-.6-2.3-1.6-2.9 1.1-.3 2.1-.8 2.8-1.6.6.6.9 1.4.9 2.3 0 .8-.3 1.6-.9 2.2z" fill="#336791" />
    </svg>
  );
}

function PythonLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M11.87 2c-3.15 0-2.95 1.37-2.95 1.37l.03 1.42h3.01v.43H6.04S4 4.98 4 8.16c0 3.17 1.78 3.06 1.78 3.06h1.06v-1.5c0-1.7 1.47-1.66 1.47-1.66h2.95c1.43 0 1.44-1.38 1.44-1.38V3.39S12.98 2 11.87 2zM9.54 3.44a.63.63 0 1 1 0 1.25.63.63 0 0 1 0-1.25z" fill="#3776AB" />
      <path d="M12.13 22c3.15 0 2.95-1.37 2.95-1.37l-.03-1.42h-3.01v-.43h5.92s2.04.24 2.04-2.94c0-3.17-1.78-3.06-1.78-3.06h-1.06v1.5c0 1.7-1.47 1.66-1.47 1.66h-2.95c-1.43 0-1.44 1.38-1.44 1.38v3.29s-.28 1.39.83 1.39zm2.33-1.44a.63.63 0 1 1 0-1.25.63.63 0 0 1 0 1.25z" fill="#FFD43B" />
    </svg>
  );
}

function FastAPILogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#009688" />
      <path d="M12.5 4L6 13h5l-1.5 7L18 11h-5.5l1.5-7z" fill="white" />
    </svg>
  );
}

function PyTorchLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M13.2 3.1c-.2.2-.4.4-.5.7L11.5 6c-.3.7-.6 1.5-.7 2.3-.2 1.4.1 2.8.9 3.9l.4.5-.5.4c-1.1.9-1.8 2.2-1.9 3.6-.1 1.4.4 2.8 1.4 3.8 1 1 2.3 1.5 3.7 1.5s2.7-.5 3.7-1.5c1-1 1.5-2.3 1.5-3.7 0-1.4-.6-2.7-1.6-3.7l-4.7-4.7c-.4-.4-.5-1-.2-1.4.2-.3.6-.5 1-.4.4 0 .7.3 1 .6l3.3 3.3c.4.4 1 .4 1.4 0s.4-1 0-1.4l-3.3-3.3c-.8-.8-1.9-1.3-3-1.2-1.1.1-2.1.8-2.6 1.7zm1.6 1.9c.4.4.4 1 0 1.4s-1 .4-1.4 0-.4-1 0-1.4 1-.4 1.4 0z" fill="#EE4C2C" />
    </svg>
  );
}

function ESP32Logo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#E7352C" strokeWidth="1.8">
      <rect x="5" y="5" width="14" height="14" rx="2" fill="#E7352C" fillOpacity="0.15" />
      <path d="M9 9h6v6H9z" fill="#E7352C" />
      <path d="M2 9h3m-3 6h3m14-6h3m-3 6h3M9 2v3m6-3v3m-6 14v3m6-3v3" />
    </svg>
  );
}

function MQTTLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L3 8v8l9 5 9-5V8l-9-5zm0 2.2l6.8 3.8L12 12.8 5.2 9 12 5.2zm-7 5.2l6 3.4v6.8l-6-3.4v-6.8zm8 10.2v-6.8l6-3.4v6.8l-6 3.4z" fill="#7C3AED" />
      <circle cx="12" cy="12" r="2.5" fill="#C084FC" />
    </svg>
  );
}

function ThreejsLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5L2 20h20L12 2.5zm0 4.2L18.5 18H5.5L12 6.7z" />
    </svg>
  );
}

function WebGLLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <polygon points="12 2 22 8 22 16 12 22 2 16 2 8" stroke="#990000" strokeWidth="2" fill="#990000" fillOpacity="0.2" />
      <line x1="12" y1="2" x2="12" y2="22" stroke="#990000" strokeWidth="1.5" />
      <line x1="12" y1="12" x2="22" y2="8" stroke="#990000" strokeWidth="1.5" />
      <line x1="12" y1="12" x2="2" y2="8" stroke="#990000" strokeWidth="1.5" />
    </svg>
  );
}

function GSAPLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#0AE448" />
      <path d="M7 12a5 5 0 0 1 8.5-3.5L14 10a3 3 0 1 0 0 4l1.5 1.5A5 5 0 0 1 7 12z" fill="#000" />
      <path d="M14 12h3v2h-3z" fill="#000" />
    </svg>
  );
}

function JavaLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12.8 2.2c-.8 1-1.2 2-1 3.2.2 1.2 1.2 2.2 2 3.2.8.8 1.5 1.8 1.2 2.8-.3 1-1.2 1.8-2.2 2 1.2-.3 2.2-1.2 2.5-2.4.3-1.2-.2-2.4-1-3.2-.8-.8-1.8-1.8-1.8-3 .1-1.2.7-2 1.3-2.6-.4-.2-.7 0-1 0z" fill="#E76F00" />
      <path d="M10.2 4.8c-.6.8-.8 1.7-.6 2.5.2 1 .9 1.8 1.5 2.6.7.7 1.2 1.5 1 2.3-.2.8-1 1.5-1.8 1.7 1-.3 1.8-1 2-2 .2-1-.2-2-.8-2.7-.6-.7-1.4-1.5-1.4-2.5.1-1 .5-1.7 1-2.2-.4-.1-.6.1-.9.3z" fill="#E76F00" />
      <path d="M9.5 14.5c3.5.4 7-.3 7.8-1.8.8-1.5-1.2-2.5-3.5-2.2-2.3.3-3.8 1.7-4.3 4z" fill="#5382A1" />
      <path d="M4 17.5c2.5 1.5 8 1.5 12 0 1-.4 2-.9 2-.9s-1 .6-2.5.9c-3.5.7-8.5.7-11.5 0C3 17.1 2 16.5 2 16.5s.8.6 2 1z" fill="#5382A1" />
      <path d="M6 19.8c2.5 1 7.5 1 10.5 0 .8-.3 1.5-.7 1.5-.7s-.8.5-2 .7c-3 .5-7 .5-10 0-1.2-.2-1.8-.5-1.8-.5s.6.3 1.8.5z" fill="#5382A1" />
    </svg>
  );
}

function SpringBootLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2.2L3.8 7v9.6L12 21.4l8.2-4.8V7L12 2.2z" fill="#6DB33F" fillOpacity="0.22" stroke="#6DB33F" strokeWidth="1.6" />
      <path d="M12 6.5c-3.04 0-5.5 2.46-5.5 5.5 0 2.2 1.3 4.1 3.2 4.9l1.2-2.1c-1-.4-1.7-1.4-1.7-2.6 0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7c0 1.2-.7 2.2-1.7 2.6l1.2 2.1c1.9-.8 3.2-2.7 3.2-4.9 0-3.04-2.46-5.5-5.3-5.5z" fill="#6DB33F" />
      <rect x="10.9" y="10.2" width="2.2" height="6.2" rx="1.1" fill="#6DB33F" />
    </svg>
  );
}

function KafkaLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
      <circle cx="5" cy="7.5" r="2.2" fill="#FFFFFF" />
      <circle cx="5" cy="16.5" r="2.2" fill="#FFFFFF" />
      <circle cx="19" cy="6.5" r="2.2" fill="#FFFFFF" />
      <circle cx="19" cy="17.5" r="2.2" fill="#FFFFFF" />
      <path d="M6.8 8.6L9.6 10.5M6.8 15.4L9.6 13.5M14.4 10.5L17.2 7.6M14.4 13.5L17.2 16.4" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MicroservicesLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8">
      <rect x="3" y="3" width="6" height="6" rx="1.5" fill="#A78BFA" fillOpacity="0.25" />
      <rect x="15" y="3" width="6" height="6" rx="1.5" fill="#A78BFA" fillOpacity="0.25" />
      <rect x="3" y="15" width="6" height="6" rx="1.5" fill="#A78BFA" fillOpacity="0.25" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" fill="#A78BFA" fillOpacity="0.25" />
      <path d="M9 6h6M9 18h6M6 9v6M18 9v6" stroke="#A78BFA" strokeDasharray="1.5 1.5" strokeLinecap="round" />
    </svg>
  );
}

function RaspberryPiLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2c.8 0 1.5.7 1.5 1.5S12.8 5 12 5s-1.5-.7-1.5-1.5S11.2 2 12 2z" fill="#75A928" />
      <path d="M14.5 4.5c.6-.4 1.5-.2 1.9.4.4.6.2 1.5-.4 1.9-.6.4-1.5.2-1.9-.4-.4-.6-.2-1.5.4-1.9zM9.5 4.5c-.6-.4-1.5-.2-1.9.4-.4.6-.2 1.5.4 1.9.6.4 1.5.2 1.9-.4.4-.6.2-1.5-.4-1.9z" fill="#75A928" />
      <circle cx="9" cy="9.5" r="2.2" fill="#C51A4A" />
      <circle cx="15" cy="9.5" r="2.2" fill="#C51A4A" />
      <circle cx="12" cy="11.5" r="2.4" fill="#C51A4A" />
      <circle cx="8" cy="13.5" r="2" fill="#C51A4A" />
      <circle cx="16" cy="13.5" r="2" fill="#C51A4A" />
      <circle cx="10" cy="16.5" r="2.2" fill="#C51A4A" />
      <circle cx="14" cy="16.5" r="2.2" fill="#C51A4A" />
      <circle cx="12" cy="19.5" r="2" fill="#C51A4A" />
    </svg>
  );
}

function ZigbeeLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16L4 18h16" />
      <circle cx="4" cy="6" r="1.5" fill="#F15A24" />
      <circle cx="20" cy="18" r="1.5" fill="#F15A24" />
    </svg>
  );
}

function LoRaWANLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M4 14a10 10 0 0 1 16 0M7 16a6 6 0 0 1 10 0M10 18a2 2 0 0 1 4 0" stroke="#00B4D8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="20" r="1.5" fill="#00B4D8" />
    </svg>
  );
}

function CppLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M14 6.5A6 6 0 1 0 14 17.5" stroke="#00599C" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M17 10v4m-2-2h4m3-2v4m-2-2h4" stroke="#659AD2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArduinoLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="7.5" cy="12" r="5" stroke="#00979D" strokeWidth="2" fill="#00979D" fillOpacity="0.15" />
      <circle cx="16.5" cy="12" r="5" stroke="#00979D" strokeWidth="2" fill="#00979D" fillOpacity="0.15" />
      <path d="M6 12h3M7.5 10.5v3M15 12h3" stroke="#00979D" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BLELogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#0082FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7l10 10-5 5V2l5 5L7 17" />
    </svg>
  );
}

function TailwindLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#38BDF8">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.914.228 1.568.89 2.291 1.623C13.67 10.6 15.086 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.914-.228-1.568-.89-2.291-1.623C16.331 6.2 14.916 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.914.228 1.568.89 2.291 1.623C7.67 17.8 9.086 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.914-.228-1.568-.89-2.291-1.623C10.331 13.4 8.916 12 6.001 12z" />
    </svg>
  );
}

function NodeLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" stroke="#68A063" strokeWidth="2" fill="#68A063" fillOpacity="0.2" />
      <path d="M12 7l4 2.3v4.7L12 16.3 8 14V9.3L12 7z" stroke="#68A063" strokeWidth="1.5" />
    </svg>
  );
}

function KotlinLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M21 21H3V3h18l-9 9 9 9z" fill="#7F52FF" />
      <path d="M3 12l9-9H3v9z" fill="#C757BC" />
      <path d="M12 3L3 12v9l9-9 9-9h-9z" fill="#0095D5" fillOpacity="0.4" />
    </svg>
  );
}

function FirebaseLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M4.5 18.5L6.8 4.2c.1-.5.7-.7 1-.3l3.2 5.9-6.5 8.7z" fill="#FFA000" />
      <path d="M14.2 8.1l-2.7-5.1c-.2-.4-.8-.4-1 0L4.5 18.5l9.7-10.4z" fill="#F57C00" />
      <path d="M12.8 19.8l6.7-3.8-5.3-7.9-9.7 10.4 7.2 4c.7.4 1.5.4 2.1 0l-1-2.7z" fill="#FFCA28" />
    </svg>
  );
}

function LangChainLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round">
      <circle cx="8" cy="12" r="4" fill="#10B981" fillOpacity="0.2" />
      <circle cx="16" cy="12" r="4" fill="#10B981" fillOpacity="0.2" />
      <path d="M11 12h2" />
    </svg>
  );
}

function OpenAILogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.28 9.57a5.9 5.9 0 0 0-.52-4.94 6.06 6.06 0 0 0-4.18-2.92 5.95 5.95 0 0 0-5.14 1.25A5.96 5.96 0 0 0 8.05 2 6.04 6.04 0 0 0 3.3 4.67 5.95 5.95 0 0 0 2 9.77a5.9 5.9 0 0 0 .52 4.94 6.06 6.06 0 0 0 4.18 2.92 5.95 5.95 0 0 0 5.14-1.25A5.96 5.96 0 0 0 16 19.33a6.04 6.04 0 0 0 4.75-2.67 5.95 5.95 0 0 0 1.53-7.09zM12 14.5a2.5 2.5 0 1 1 2.5-2.5 2.5 2.5 0 0 1-2.5 2.5z" />
    </svg>
  );
}

function GLSLLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" fill="#A78BFA" fillOpacity="0.15" />
      <path d="M12 12l8-4.5M12 12v10M12 12L4 7.5" />
    </svg>
  );
}

function BlenderLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="14" r="5" stroke="#EA7600" strokeWidth="2" fill="#EA7600" fillOpacity="0.25" />
      <circle cx="12" cy="14" r="2" fill="#225B99" />
      <path d="M12 9V3M8.5 10.5L4 7M15.5 10.5L20 7" stroke="#EA7600" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ============================================================================
// DOTTED HALFTONE MATRIX PATTERN (STANDARDIZED DECORATION ACROSS ALL CARDS)
// ============================================================================

function DotMatrix({ className = "" }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
    >
      {Array.from({ length: 7 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => {
          const factor = (row + col) / 12;
          const opacity = Math.max(0.04, Math.pow(factor, 2) * 0.70);
          return (
            <circle
              key={`${row}-${col}`}
              cx={col * 18 + 9}
              cy={row * 18 + 9}
              r={1.75}
              fill="#C7C0FF"
              fillOpacity={opacity}
            />
          );
        })
      )}
    </svg>
  );
}

// ============================================================================
// STANDARDIZED SERVICES DATA — EXACT 6 CATEGORIES WITH BALANCED TECH STACK
// ============================================================================

const servicesData = [
  {
    num: "01",
    title: "Websites & Digital Experiences",
    desc: "Strategic, responsive websites and high-performance digital platforms built to strengthen your brand, elevate user experience, and drive measurable customer conversion.",
    techStack: [
      { name: "React", icon: <ReactLogo /> },
      { name: "Next.js", icon: <NextjsLogo /> },
      { name: "TypeScript", icon: <TypeScriptLogo /> },
      { name: "Tailwind", icon: <TailwindLogo /> },
      { name: "Node.js", icon: <NodeLogo /> },
    ],
    initialBg: "#37356D",
    initialBorder: "rgba(255, 255, 255, 0.25)",
  },
  {
    num: "02",
    title: "Mobile App Development",
    desc: "Scalable Android, iOS, and cross-platform mobile applications engineered around fluid gestures, native reliability, and genuine business objectives.",
    techStack: [
      { name: "React Native", icon: <ReactNativeLogo /> },
      { name: "Flutter", icon: <FlutterLogo /> },
      { name: "Swift", icon: <SwiftLogo /> },
      { name: "Kotlin", icon: <KotlinLogo /> },
      { name: "Firebase", icon: <FirebaseLogo /> },
    ],
    initialBg: "transparent",
    initialBorder: "rgba(255, 255, 255, 0.12)",
  },
  {
    num: "03",
    title: "Product Engineering & Dashboards",
    desc: "Mission-critical SaaS platforms, operational analytics dashboards, and scalable microservices architectures engineered to streamline workflows and power enterprise growth.",
    techStack: [
      { name: "Java", icon: <JavaLogo /> },
      { name: "Spring Boot", icon: <SpringBootLogo /> },
      { name: "Kafka", icon: <KafkaLogo /> },
      { name: "Microservices", icon: <MicroservicesLogo /> },
      { name: "PostgreSQL", icon: <PostgreSQLLogo /> },
      { name: "React", icon: <ReactLogo /> },
    ],
    initialBg: "transparent",
    initialBorder: "rgba(255, 255, 255, 0.12)",
  },
  {
    num: "04",
    title: "AI & Intelligent Automation",
    desc: "Production-grade AI integrations, autonomous agent pipelines, and intelligent workflow automations that reduce repetitive overhead and accelerate critical decisions.",
    techStack: [
      { name: "Python", icon: <PythonLogo /> },
      { name: "FastAPI", icon: <FastAPILogo /> },
      { name: "PyTorch", icon: <PyTorchLogo /> },
      { name: "LangChain", icon: <LangChainLogo /> },
      { name: "OpenAI", icon: <OpenAILogo /> },
    ],
    initialBg: "transparent",
    initialBorder: "rgba(255, 255, 255, 0.12)",
  },
  {
    num: "05",
    title: "IoT & Smart Systems",
    desc: "Connected sensor deployments, embedded hardware interfaces, and real-time Kafka & MQTT event pipelines linking physical devices seamlessly to cloud platforms.",
    techStack: [
      { name: "ESP32", icon: <ESP32Logo /> },
      { name: "Raspberry Pi", icon: <RaspberryPiLogo /> },
      { name: "Arduino", icon: <ArduinoLogo /> },
      { name: "MQTT", icon: <MQTTLogo /> },
      { name: "Zigbee", icon: <ZigbeeLogo /> },
      { name: "LoRaWAN", icon: <LoRaWANLogo /> },
      { name: "C++", icon: <CppLogo /> },
      { name: "BLE", icon: <BLELogo /> },
    ],
    initialBg: "transparent",
    initialBorder: "rgba(255, 255, 255, 0.12)",
  },
  {
    num: "06",
    title: "Immersive 3D Experiences",
    desc: "Interactive WebGL graphics, custom GLSL shader simulations, and scroll-synchronized 3D physics that turn digital products into memorable visual spectacles.",
    techStack: [
      { name: "Three.js", icon: <ThreejsLogo /> },
      { name: "WebGL", icon: <WebGLLogo /> },
      { name: "GSAP", icon: <GSAPLogo /> },
      { name: "GLSL", icon: <GLSLLogo /> },
      { name: "Blender", icon: <BlenderLogo /> },
    ],
    initialBg: "transparent",
    initialBorder: "rgba(255, 255, 255, 0.12)",
  },
];

// ============================================================================
// MAIN SERVICES SECTION COMPONENT (WITH DEDICATED PARTICLE VISUAL CENTERPIECE)
// ============================================================================

export default function ServicesWithCube() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const cubeWrapRef = useRef(null);
  const codeSymbolWrapRef = useRef(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet (>= 768px): Pinned Horizontal Scroll with Dynamic Spotlight Color Change
    mm.add("(min-width: 768px)", () => {
      const getScrollShift = () => {
        const container = track.parentElement;
        if (!container) return 0;
        // Shift so Card 06 lands comfortably in full view in the spotlight area:
        const maxShift = track.scrollWidth - container.clientWidth + 48;
        return Math.max(0, maxShift);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollShift() + 100}`,
          pin: true,
          scrub: 1.1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Smooth horizontal translation of the cards track
      tl.to(track, {
        x: () => -getScrollShift(),
        ease: "none",
        duration: 1,
      });

      // Standardized Card Choreography:
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // 1. DYNAMIC COLOR CHANGE:
        // First card starts with signature #37356D.
        // Subsequent cards start transparent and smoothly transition into #37356D as they enter spotlight.
        if (i > 0) {
          gsap.fromTo(
            card,
            {
              backgroundColor: "rgba(14, 15, 24, 0)",
              borderColor: "rgba(255, 255, 255, 0.12)",
            },
            {
              backgroundColor: "#37356D",
              borderColor: "rgba(255, 255, 255, 0.28)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: "left 74%",
                end: "left 46%",
                scrub: true,
              },
            }
          );
        }

        // 2. VANISHING EFFECT:
        // As cards 01..05 move past the left edge, they dissolve cleanly.
        // Card 06 (the destination card) NEVER dissolves — it remains fully visible & readable!
        if (i < cardsRef.current.length - 1) {
          gsap.to(card, {
            opacity: 0,
            scale: 0.90,
            ease: "power1.in",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 36%",
              end: "left 15%",
              scrub: true,
            },
          });
        }
      });

      // ======================================================================
      // 3. SCROLL-SYNCHRONIZED VISUAL CROSSFADE:
      // Services 1–3: ParticleCube
      // Services 4–6: ParticleCodeSymbol (</>)
      // Crossfades smoothly as Card 4 travels into the active view
      // ======================================================================
      const card4 = cardsRef.current[3];
      if (card4 && cubeWrapRef.current && codeSymbolWrapRef.current) {
        gsap.fromTo(
          cubeWrapRef.current,
          { opacity: 1, scale: 1.0, filter: "blur(0px)" },
          {
            opacity: 0,
            scale: 0.94,
            filter: "blur(6px)",
            ease: "sine.inOut",
            scrollTrigger: {
              trigger: card4,
              containerAnimation: tl,
              start: "left 90%",
              end: "left 45%",
              scrub: true,
              onUpdate: (self) => {
                if (cubeWrapRef.current) {
                  cubeWrapRef.current.style.pointerEvents =
                    self.progress >= 0.5 ? "none" : "auto";
                }
              },
            },
          }
        );

        gsap.fromTo(
          codeSymbolWrapRef.current,
          { opacity: 0, scale: 0.94, filter: "blur(6px)" },
          {
            opacity: 1,
            scale: 1.0,
            filter: "blur(0px)",
            ease: "sine.inOut",
            scrollTrigger: {
              trigger: card4,
              containerAnimation: tl,
              start: "left 90%",
              end: "left 45%",
              scrub: true,
              onUpdate: (self) => {
                if (codeSymbolWrapRef.current) {
                  codeSymbolWrapRef.current.style.pointerEvents =
                    self.progress >= 0.5 ? "auto" : "none";
                }
              },
            },
          }
        );
      }

      ScrollTrigger.refresh();
    });

    // Mobile (< 768px): Touch-friendly swipe without pinned traps
    mm.add("(max-width: 767px)", () => {
      gsap.set(track, { clearProps: "all" });

      const handleMobileScroll = () => {
        if (!track) return;
        const scrollLeft = track.scrollLeft;
        const cardWidth = 320;
        const activeIdx = Math.min(5, Math.max(0, Math.round(scrollLeft / cardWidth)));
        setMobileActiveIndex(activeIdx);

        if (!cubeWrapRef.current || !codeSymbolWrapRef.current) return;
        if (activeIdx >= 3) {
          cubeWrapRef.current.style.opacity = "0";
          cubeWrapRef.current.style.pointerEvents = "none";
          codeSymbolWrapRef.current.style.opacity = "1";
          codeSymbolWrapRef.current.style.pointerEvents = "auto";
        } else {
          cubeWrapRef.current.style.opacity = "1";
          cubeWrapRef.current.style.pointerEvents = "auto";
          codeSymbolWrapRef.current.style.opacity = "0";
          codeSymbolWrapRef.current.style.pointerEvents = "none";
        }
      };

      track.addEventListener("scroll", handleMobileScroll, { passive: true });
      return () => track.removeEventListener("scroll", handleMobileScroll);
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full min-h-screen md:h-screen flex flex-col justify-center overflow-hidden select-text py-16 md:py-0"
      style={{
        backgroundColor: "#050508",
        color: "#F5F4FF",
      }}
    >
      {/* Background radial spotlight falloff */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 60%, rgba(5, 5, 8, 0.95) 100%)",
        }}
      />

      <div className="w-full h-full max-w-[1720px] mx-auto flex flex-col lg:flex-row items-center px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* ========================================================= */}
        {/* 1. LEFT ZONE: DEDICATED 3D PARTICLE VISUAL CENTERPIECE    */}
        {/* Services 1–3: ParticleCube | Services 4–6: ParticleCodeSymbol */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[38vw] lg:min-w-[400px] h-[300px] sm:h-[360px] lg:h-full flex items-center justify-center shrink-0 relative pt-4 sm:pt-8 lg:pt-20 z-20">
          <div className="group relative flex items-center justify-center cursor-default">
            {/* Atmospheric Violet Glow behind 3D Particle Visual */}
            <div
              aria-hidden="true"
              className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] rounded-full blur-[100px] opacity-40 select-none pointer-events-none transition-opacity duration-700 ease-out group-hover:opacity-60"
              style={{
                background:
                  "radial-gradient(circle, #5848FF 0%, #221A65 45%, transparent 70%)",
              }}
            />

            {/* Shared Visual Container: Seamless crossfade between Cube and Code Symbol */}
            <div className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px] aspect-square flex items-center justify-center relative z-10">
              
              {/* Visual 1: 3D Particle Cube (Services 1–3) */}
              <div
                ref={cubeWrapRef}
                className="absolute inset-0 flex items-center justify-center will-change-[opacity,transform,filter]"
                style={{ opacity: 1, pointerEvents: "auto" }}
              >
                <ParticleCube className="w-full h-full aspect-square" />
              </div>

              {/* Visual 2: 3D Particle Code Symbol </> (Services 4–6) */}
              <div
                ref={codeSymbolWrapRef}
                className="absolute inset-0 flex items-center justify-center will-change-[opacity,transform,filter]"
                style={{ opacity: 0, pointerEvents: "none" }}
              >
                <ParticleCodeSymbol className="w-full h-full aspect-square" />
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. RIGHT ZONE: HEADER + STANDARDIZED CARDS TRACK          */}
        {/* ========================================================= */}
        <div className="flex-1 w-full h-full min-w-0 flex flex-col justify-between pt-8 sm:pt-12 lg:pt-28 pb-5 sm:pb-7 lg:pb-8 pl-0 lg:pl-4 relative">
          
          {/* Top Section Header */}
          <div className="w-full flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6 pb-4 sm:pb-5 lg:pb-7 border-b border-white/10">
            <div>
              <h2 className="font-sans text-[32px] sm:text-[42px] lg:text-[48px] font-semibold text-white tracking-tight leading-none">
                Our Services
              </h2>
            </div>

            <div className="max-w-[420px]">
              <p className="font-sans text-[13px] sm:text-[14px] text-[#A1A0B5] font-normal leading-[1.6]">
                We build scalable digital platforms, modern intelligent systems, and connected products that solve tangible problems and accelerate business value.
              </p>
            </div>
          </div>

          {/* Cards Track Container with Left-Edge Dissolve Mask on Desktop */}
          <div
            className="w-full my-auto py-3 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory md:snap-none"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 60px, black calc(100% - 40px), transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 60px, black calc(100% - 40px), transparent 100%)",
            }}
          >
            <div
              ref={trackRef}
              className="flex gap-5 sm:gap-6 lg:gap-7 items-stretch min-w-max pl-4 sm:pl-8 pr-12 sm:pr-24 will-change-transform"
            >
              {servicesData.map((service, index) => {
                return (
                  <div
                    key={service.num}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="service-card group relative w-[310px] sm:w-[350px] lg:w-[380px] h-[500px] sm:h-[520px] lg:h-[540px] rounded-[28px] border p-6 sm:p-7 lg:p-8 flex flex-col shrink-0 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(55,53,109,0.35)] will-change-transform text-white overflow-hidden snap-center"
                    style={{
                      backgroundColor: service.initialBg,
                      borderColor: service.initialBorder,
                      boxShadow: index === 0 ? "0 24px 60px rgba(0, 0, 0, 0.45)" : "none",
                    }}
                  >
                    {/* Dotted Decorative Artwork in lower corner (preserved across all cards) */}
                    <div className="absolute right-0 bottom-0 pointer-events-none opacity-40 group-hover:opacity-65 transition-opacity duration-300 overflow-hidden">
                      <DotMatrix />
                    </div>

                    {/* 1. TOP: Service Number (01–06) and Arrow Icon */}
                    <div className="relative z-10 flex items-center justify-between w-full h-10 shrink-0">
                      <span className="font-sans text-[26px] sm:text-[28px] lg:text-[30px] font-semibold text-white/90 tracking-tight leading-none">
                        {service.num}
                      </span>
                      <a
                        href="#contact"
                        aria-label={`Inquire about ${service.title}`}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 group-hover:bg-[#8E83FF] flex items-center justify-center text-[15px] sm:text-[16px] font-medium text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 border border-white/10 group-hover:border-transparent"
                      >
                        ↗
                      </a>
                    </div>

                    {/* 2 & 3. MIDDLE: Service Title and Concise Description */}
                    <div className="relative z-10 flex-1 flex flex-col justify-start pt-4 sm:pt-5 pb-3">
                      <h3 className="font-sans text-[21px] sm:text-[22px] lg:text-[24px] font-semibold text-white tracking-tight leading-[1.25] min-h-[52px] sm:min-h-[56px] lg:min-h-[60px] flex items-start">
                        {service.title}
                      </h3>
                      <p className="font-sans text-[13px] sm:text-[13.5px] text-white/80 font-normal leading-[1.6] mt-2.5 sm:mt-3 line-clamp-3">
                        {service.desc}
                      </p>
                    </div>

                    {/* 4 & 5. LOWER: Divider & Labeled Technology Stack Row (Fixed Baseline Across All Cards) */}
                    <div className="relative z-10 w-full shrink-0 h-[148px] sm:h-[152px] lg:h-[156px] pt-3.5 sm:pt-4 border-t border-white/15 flex flex-col justify-start">
                      <span className="block font-sans text-[10.5px] sm:text-[11px] font-mono uppercase tracking-[0.14em] text-[#C7C0FF]/80 mb-2 sm:mb-2.5">
                        Core Tech Stack
                      </span>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap content-start">
                        {service.techStack.map((tech) => (
                          <div
                            key={tech.name}
                            className="inline-flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 transition-colors"
                            title={tech.name}
                          >
                            <span className="shrink-0 flex items-center justify-center">
                              {tech.icon}
                            </span>
                            <span className="font-sans text-[10.5px] sm:text-[11.5px] font-medium text-white/90 whitespace-nowrap">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Footer Info Bar */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-[#8E8E9F]/60 pt-3 border-t border-white/10">
            <span>TAVQO DIGITAL STUDIO</span>
            <span className="hidden sm:inline">SCROLL TO NAVIGATE ALL SERVICES</span>
            <span>06 CAPABILITIES</span>
          </div>

        </div>

      </div>
    </section>
  );
}

