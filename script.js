const canvas = document.querySelector("#bg");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha:true,
  antialias:true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

camera.position.z = 30;



// LIGHTING

const ambientLight =
  new THREE.AmbientLight(
    0xffffff,
    0.5
);

scene.add(ambientLight);

const pointLight =
  new THREE.PointLight(
    0x00f5ff,
    2
);

pointLight.position.set(20,20,20);

scene.add(pointLight);



// DIGITAL NODES

const nodes = [];

for(let i = 0; i < 120; i++){

  const geometry =
    new THREE.BoxGeometry(
      0.3,
      0.3,
      0.3
    );

  const material =
    new THREE.MeshStandardMaterial({

      color:0x00f5ff,

      emissive:0x001122,

      metalness:1,

      roughness:0.1

    });

  const cube =
    new THREE.Mesh(
      geometry,
      material
    );

  cube.position.x =
    (Math.random() - 0.5) * 80;

  cube.position.y =
    (Math.random() - 0.5) * 80;

  cube.position.z =
    (Math.random() - 0.5) * 50;

  cube.userData = {

    speed:
      Math.random() * 0.02 + 0.005

  };

  scene.add(cube);

  nodes.push(cube);

}



// PARTICLE STARS

const particlesGeometry =
  new THREE.BufferGeometry();

const particlesCount = 4000;

const posArray =
  new Float32Array(
    particlesCount * 3
  );

for(let i = 0; i < particlesCount * 3; i++){

  posArray[i] =
    (Math.random() - 0.5) * 200;

}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(
    posArray,
    3
  )
);

const particlesMaterial =
  new THREE.PointsMaterial({

    size:0.06,

    color:0xffffff

});

const particlesMesh =
  new THREE.Points(
    particlesGeometry,
    particlesMaterial
);

scene.add(particlesMesh);



// HOLOGRAPHIC GRID

const grid =
  new THREE.GridHelper(
    200,
    60,
    0x00f5ff,
    0x003344
  );

grid.position.y = -20;

scene.add(grid);



// ANIMATION

function animate(){

  requestAnimationFrame(animate);

  nodes.forEach((node,index)=>{

    node.rotation.x += 0.01;

    node.rotation.y += 0.01;

    node.position.y +=
      Math.sin(
        Date.now() *
        node.userData.speed
      ) * 0.01;

  });

  particlesMesh.rotation.y += 0.0005;

  grid.rotation.y += 0.0008;

  renderer.render(scene,camera);

}

animate();



// MOUSE INTERACTION

window.addEventListener(
  "mousemove",
  (e)=>{

    const x =
      (e.clientX /
      window.innerWidth - 0.5);

    const y =
      (e.clientY /
      window.innerHeight - 0.5);

    scene.rotation.y = x * 0.3;

    scene.rotation.x = y * 0.1;

});



// RESPONSIVE

window.addEventListener(
  "resize",
  ()=>{

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

});