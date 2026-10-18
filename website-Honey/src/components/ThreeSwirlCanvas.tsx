import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MixerSettings } from '../types';

interface ThreeSwirlCanvasProps {
  mode: 'glass-swirl' | 'infinity-loop' | 'vortex-splash';
  mixerSettings?: MixerSettings;
  spinTrigger?: number;
  onHotspotClick?: (name: string) => void;
}

export const ThreeSwirlCanvas: React.FC<ThreeSwirlCanvasProps> = ({
  mode,
  mixerSettings = {
    honeyType: 'caramel',
    viscosity: 7,
    swirlSpeed: 1,
    roastLevel: 3,
    iceLevel: 4,
    glowIntensity: 1.2,
  },
  spinTrigger = 0,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // References for animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mainGroupRef = useRef<THREE.Group | null>(null);
  const ribbonMeshRef = useRef<THREE.Mesh | null>(null);
  const glassGroupRef = useRef<THREE.Group | null>(null);
  const dropletsRef = useRef<THREE.Mesh[]>([]);

  // Drag interaction state
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const mouseParallax = useRef({ x: 0, y: 0 });
  const spinVelocity = useRef(0);

  // Trigger burst rotation when spinTrigger changes
  useEffect(() => {
    if (spinTrigger > 0) {
      spinVelocity.current = 0.35;
    }
  }, [spinTrigger]);

  // Color mapping based on honeyType
  const getLiquidColor = (type: string) => {
    switch (type) {
      case 'mountain':
        return new THREE.Color('#d97706'); // Deep warm amber
      case 'wildflower':
        return new THREE.Color('#f59e0b'); // Golden sun
      case 'acacia':
        return new THREE.Color('#fbbf24'); // Light crystalline gold
      case 'caramel':
      default:
        return new THREE.Color('#c26019'); // Rich burnt caramel honey
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.6);
    cameraRef.current = camera;

    // 3. Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffeedd, 2.4);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffa742, 1.8);
    dirLight2.position.set(-4, -2, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffdf99, 2.0, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // 5. Main Root Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainGroupRef.current = mainGroup;

    // Build the scene depending on the mode
    buildSceneContent(mode);

    // Shadow plane beneath for realistic studio contact shadow
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x1b1614,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.5;
    scene.add(shadowMesh);

    // 6. Build Content Function
    function buildSceneContent(currentMode: 'glass-swirl' | 'infinity-loop' | 'vortex-splash') {
      // Clear previous group children
      while (mainGroup.children.length > 0) {
        const obj = mainGroup.children[0];
        mainGroup.remove(obj);
      }
      dropletsRef.current = [];

      const liquidColor = getLiquidColor(mixerSettings.honeyType);

      // Shared Honey/Caramel physical material
      const honeyMaterial = new THREE.MeshPhysicalMaterial({
        color: liquidColor,
        emissive: liquidColor.clone().multiplyScalar(0.12),
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        transmission: 0.45,
        ior: 1.52,
        reflectivity: 0.9,
      });

      if (currentMode === 'glass-swirl') {
        // --- MODE 1: Glass with Spiral Swirl Ribbon ---
        const glassGroup = new THREE.Group();
        glassGroupRef.current = glassGroup;

        // Faceted crystal glass cylinder
        const glassGeo = new THREE.CylinderGeometry(0.82, 0.7, 2.1, 24, 1, true);
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          roughness: 0.04,
          transmission: 0.92,
          thickness: 0.5,
          ior: 1.5,
          transparent: true,
          opacity: 0.65,
        });
        const glassMesh = new THREE.Mesh(glassGeo, glassMat);
        glassGroup.add(glassMesh);

        // Glass base
        const baseGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.15, 24);
        const baseMesh = new THREE.Mesh(baseGeo, glassMat);
        baseMesh.position.y = -1.0;
        glassGroup.add(baseMesh);

        // Liquid drink inside (caramel coffee + honey gradient)
        const drinkGeo = new THREE.CylinderGeometry(0.78, 0.67, 1.7, 20);
        const drinkMat = new THREE.MeshStandardMaterial({
          color: 0x3d1d0c, // Deep rich espresso cold brew
          roughness: 0.3,
          metalness: 0.05,
        });
        const drinkMesh = new THREE.Mesh(drinkGeo, drinkMat);
        drinkMesh.position.y = -0.15;
        glassGroup.add(drinkMesh);

        // Crema / milk layer floating on top
        const cremaGeo = new THREE.CylinderGeometry(0.79, 0.78, 0.12, 20);
        const cremaMat = new THREE.MeshStandardMaterial({
          color: 0xf2dfc6, // Creamy swirl layer
          roughness: 0.4,
        });
        const cremaMesh = new THREE.Mesh(cremaGeo, cremaMat);
        cremaMesh.position.y = 0.72;
        glassGroup.add(cremaMesh);

        // Floating Ice Cubes inside glass
        const iceMat = new THREE.MeshPhysicalMaterial({
          color: 0xeef7fb,
          roughness: 0.15,
          transmission: 0.85,
          transparent: true,
          opacity: 0.75,
          ior: 1.31,
        });
        const ice1 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), iceMat);
        ice1.position.set(0.15, 0.82, 0.1);
        ice1.rotation.set(0.4, 0.6, 0.2);
        glassGroup.add(ice1);

        const ice2 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.38), iceMat);
        ice2.position.set(-0.25, 0.75, -0.1);
        ice2.rotation.set(-0.3, 0.8, -0.4);
        glassGroup.add(ice2);

        // 3D Swirling Caramel & Honey Ribbon wrapping around the glass!
        // Generates a 3D spline spiral wrapping 2.5 full loops around glass
        const spiralPoints: THREE.Vector3[] = [];
        const numPoints = 80;
        for (let i = 0; i <= numPoints; i++) {
          const t = i / numPoints;
          const angle = t * Math.PI * 5.2 - Math.PI * 0.8;
          // Expanding spiral radius that wraps tight around glass then flows outward
          const radius = 1.05 + Math.sin(t * Math.PI) * 0.45;
          const y = (t - 0.5) * 2.8;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          spiralPoints.push(new THREE.Vector3(x, y, z));
        }

        const curve = new THREE.CatmullRomCurve3(spiralPoints);
        const tubeGeo = new THREE.TubeGeometry(curve, 90, 0.088, 16, false);
        const ribbonMesh = new THREE.Mesh(tubeGeo, honeyMaterial);
        ribbonMeshRef.current = ribbonMesh;
        mainGroup.add(ribbonMesh);

        // Floating honey droplets around the ribbon
        for (let i = 0; i < 18; i++) {
          const dropGeo = new THREE.SphereGeometry(0.04 + Math.random() * 0.045, 12, 12);
          const dropMesh = new THREE.Mesh(dropGeo, honeyMaterial);
          const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.5;
          const dist = 1.3 + Math.random() * 0.7;
          const yPos = (Math.random() - 0.5) * 2.4;
          dropMesh.position.set(Math.cos(angle) * dist, yPos, Math.sin(angle) * dist);
          mainGroup.add(dropMesh);
          dropletsRef.current.push(dropMesh);
        }

        mainGroup.add(glassGroup);
      } else if (currentMode === 'infinity-loop') {
        // --- MODE 2: The Iconic 3D Infinity Ribbon (Lemniscate) from screenshot ---
        const lemniscatePoints: THREE.Vector3[] = [];
        const segments = 120;
        const scaleA = 1.8;

        for (let i = 0; i <= segments; i++) {
          const t = (i / segments) * Math.PI * 2;
          const denom = 1 + Math.sin(t) * Math.sin(t);
          const x = (scaleA * Math.cos(t)) / denom;
          const y = (scaleA * Math.sin(t) * Math.cos(t)) / denom;
          // Add subtle 3D undulation
          const z = Math.sin(t * 2) * 0.38;
          lemniscatePoints.push(new THREE.Vector3(x, y, z));
        }

        const curve = new THREE.CatmullRomCurve3(lemniscatePoints, true);
        const tubeGeo = new THREE.TubeGeometry(curve, 140, 0.12, 20, true);
        const infinityMesh = new THREE.Mesh(tubeGeo, honeyMaterial);
        ribbonMeshRef.current = infinityMesh;
        mainGroup.add(infinityMesh);

        // Floating golden honey beads and floating drops along the loop
        for (let i = 0; i < 24; i++) {
          const dropRadius = 0.035 + Math.random() * 0.045;
          const dropGeo = new THREE.SphereGeometry(dropRadius, 14, 14);
          const dropMesh = new THREE.Mesh(dropGeo, honeyMaterial);
          const angle = (i / 24) * Math.PI * 2;
          const x = Math.cos(angle) * (1.6 + Math.sin(angle * 3) * 0.4);
          const y = Math.sin(angle * 2) * 0.7;
          const z = (Math.random() - 0.5) * 0.8;
          dropMesh.position.set(x, y, z);
          mainGroup.add(dropMesh);
          dropletsRef.current.push(dropMesh);
        }
      } else {
        // --- MODE 3: Vortex Splash & Pouring Honey Swirl ---
        // Main high-energy vortex
        const vortexPoints: THREE.Vector3[] = [];
        const vortexSegments = 100;
        for (let i = 0; i <= vortexSegments; i++) {
          const t = i / vortexSegments;
          const theta = t * Math.PI * 7.5;
          const r = 0.2 + Math.pow(t, 1.4) * 1.6;
          const y = (t - 0.45) * 2.8;
          vortexPoints.push(
            new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r)
          );
        }
        const curve = new THREE.CatmullRomCurve3(vortexPoints);
        const tubeGeo = new THREE.TubeGeometry(curve, 110, 0.095, 16, false);
        const vortexMesh = new THREE.Mesh(tubeGeo, honeyMaterial);
        ribbonMeshRef.current = vortexMesh;
        mainGroup.add(vortexMesh);

        // Inner reverse stream
        const innerPoints: THREE.Vector3[] = [];
        for (let i = 0; i <= 60; i++) {
          const t = i / 60;
          const theta = -t * Math.PI * 5.0;
          const r = 0.35 + t * 0.9;
          const y = (t - 0.5) * 2.2;
          innerPoints.push(
            new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r)
          );
        }
        const innerCurve = new THREE.CatmullRomCurve3(innerPoints);
        const innerTube = new THREE.TubeGeometry(innerCurve, 70, 0.055, 12, false);
        const innerMesh = new THREE.Mesh(innerTube, honeyMaterial);
        mainGroup.add(innerMesh);

        // Splattering golden droplet cluster
        for (let i = 0; i < 35; i++) {
          const dropGeo = new THREE.SphereGeometry(0.025 + Math.random() * 0.05, 12, 12);
          const drop = new THREE.Mesh(dropGeo, honeyMaterial);
          const phi = Math.random() * Math.PI * 2;
          const rad = 0.6 + Math.random() * 1.4;
          drop.position.set(
            Math.cos(phi) * rad,
            (Math.random() - 0.5) * 2.5,
            Math.sin(phi) * rad
          );
          mainGroup.add(drop);
          dropletsRef.current.push(drop);
        }
      }
    }

    // 7. Mouse and Drag handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      setIsInteracting(true);
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseParallax.current = { x: normX * 0.4, y: normY * 0.3 };

      if (isDragging.current) {
        const deltaX = e.clientX - prevMouse.current.x;
        const deltaY = e.clientY - prevMouse.current.y;
        targetRotation.current.y += deltaX * 0.008;
        targetRotation.current.x += deltaY * 0.008;
        targetRotation.current.x = Math.max(-0.6, Math.min(0.6, targetRotation.current.x));
        prevMouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      setIsInteracting(false);
    };

    // Touch support for mobile / touchpads
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        setIsInteracting(true);
        prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouse.current.x;
        const deltaY = e.touches[0].clientY - prevMouse.current.y;
        targetRotation.current.y += deltaX * 0.01;
        targetRotation.current.x += deltaY * 0.01;
        prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
      setIsInteracting(false);
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Apply spin velocity boost (from "Take a Spin" button)
      if (spinVelocity.current > 0.001) {
        targetRotation.current.y += spinVelocity.current;
        spinVelocity.current *= 0.94; // smooth decay
      }

      // Base idle continuous rotation
      const speed = mixerSettings.swirlSpeed * 0.45;
      if (!isDragging.current) {
        targetRotation.current.y += speed * delta;
      }

      // Smooth interpolation for rotation
      if (mainGroup) {
        mainGroup.rotation.y += (targetRotation.current.y - mainGroup.rotation.y) * 0.08;
        mainGroup.rotation.x += (targetRotation.current.x - mainGroup.rotation.x) * 0.08;

        // Gentle floating breath
        mainGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.06;

        // Parallax camera tilt
        camera.position.x += (mouseParallax.current.x - camera.position.x) * 0.04;
        camera.position.y += (0.4 + mouseParallax.current.y - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
      }

      // Animate floating droplets
      dropletsRef.current.forEach((drop, i) => {
        const freq = 2.0 + (i % 5) * 0.4;
        drop.position.y += Math.sin(elapsedTime * freq + i) * 0.0015;
      });

      // Animate ribbon specular highlight / light position
      pointLight.position.x = Math.sin(elapsedTime * 1.2) * 2.5;
      pointLight.position.z = Math.cos(elapsedTime * 1.2) * 2.5;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
    };
  }, [mode, mixerSettings.honeyType]);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={mountRef} className="w-full h-full relative" />

      {/* Floating 3D Interaction Hint Badge */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all duration-300 pointer-events-none backdrop-blur-md border ${
          isInteracting
            ? 'bg-amber-900/80 text-white border-amber-600/50 scale-105'
            : isHovered
            ? 'bg-white/80 text-neutral-800 border-neutral-300 shadow-sm opacity-90'
            : 'bg-white/50 text-neutral-600 border-neutral-200/60 opacity-60'
        }`}
      >
        {isInteracting ? 'Rotating 3D Swirl...' : 'Drag to Rotate 3D'}
      </div>
    </div>
  );
};
