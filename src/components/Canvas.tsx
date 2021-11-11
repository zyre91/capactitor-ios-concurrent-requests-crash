import React, { useRef, useEffect } from "react";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type CanvasProps = React.ComponentProps<"canvas"> & {
  gltf?: GLTF;
};

const Canvas = (props: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const camera = useRef<PerspectiveCamera>();
  const scene = useRef<Scene>();
  const renderer = useRef<WebGLRenderer>();

  useEffect(() => {
    if (canvasRef.current) {
      init();
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (props.gltf) {
      addGLTF(props.gltf);
    }
  }, [props.gltf]);

  function render() {
    if (scene.current && renderer.current && camera.current) {
      renderer.current.render(scene.current, camera.current);
    }
  }

  function addGLTF(gltf: GLTF) {
    removeGLTF();
    if (scene.current && renderer.current && camera.current) {
      gltf.scene.name = "boombox";
      scene.current.add(gltf.scene);
      render();
    }
  }

  function removeGLTF() {
    if (scene.current && renderer.current && camera.current) {
      const objectToRemove = scene.current.getObjectByName("boombox");
      if (objectToRemove) {
        scene.current.remove(objectToRemove);
        render();
      }
    }
  }

  function init() {
    camera.current = new PerspectiveCamera(
      10,
      window.innerWidth / window.innerHeight,
      0.01,
      3
    );
    camera.current.position.z = 1;

    scene.current = new Scene();

    if (canvasRef.current) {
      renderer.current = new WebGLRenderer({
        antialias: true,
        canvas: canvasRef.current,
      });
      renderer.current.setSize(window.innerWidth, window.innerHeight);
      renderer.current.render(scene.current, camera.current);
    }
  }

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
