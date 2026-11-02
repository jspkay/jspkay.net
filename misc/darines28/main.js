import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// A cell is in the center.
//    -- 1
// 2 |  | 4
//    -- 8
// The walls are with the bits

let SCALE_FACTOR = 1;

const maze = [
      //               5                   10                   15                 20
 /* X */ [ 3, 2, 3, 1, 1,      3, 3, 3, 1, 1,       1, 1, 1, 1, 3,     1, 3, 1, 3, 1,       2 ],
 /* X */ [ 1, 0, 2, 1, 2,      2, 2, 2, 2, 3,       1, 1, 1, 0, 2,     1, 2, 2, 1, 0,       2 ],
 /*   */ [ 2, 1, 1, 1, 0,      2, 2, 0, 2, 0,       1, 3, 1, 0, 2,     1, 1, 1, 1, 0,       2 ],
 /*   */ [ 3, 1, 3, 1, 0,      2, 1, 3, 1, 0,       2, 2, 1, 1, 1,     3, 0, 3, 1, 0,       2 ],
 /* 5 */ [ 2, 2, 2, 1, 1,      0, 2, 3, 2, 2,       2, 2, 3, 2, 2,     0, 1, 1, 3, 0,       2 ],

 /*   */ [ 2, 2, 1, 1, 0,      3, 0, 2, 2, 2,       1, 0, 0, 2, 3,     3, 1, 0, 2, 1,       2 ],
 /*   */ [ 2, 2, 1, 2, 1,      1, 0, 0, 0, 2,       3, 1, 1, 0, 2,     1, 1, 0, 1, 2,       2 ],
 /*   */ [ 2, 1, 1, 0, 2,      2, 3, 1, 1, 0,       1, 1, 3, 0, 2,     3, 1, 1, 0, 0,       2 ],
 /*   */ [ 3, 1, 1, 2, 2,      3, 3, 0, 3, 1,       1, 0, 0, 2, 0,     2, 1, 1, 1, 1,       2 ],
 /* 10*/ [ 2, 1, 1, 0, 3,      0, 1, 0, 2, 1,       3, 1, 1, 1, 1,     1, 1, 1, 1, 1,       2 ],

 /*   */ [ 3, 1, 1, 1, 0,      1, 1, 1, 0, 2,       1, 1, 0, 3, 1,     1, 3, 3, 1, 2,       2 ],
 /*   */ [ 2, 3, 1, 1, 1,      1, 1, 1, 0, 1,       1, 1, 1, 0, 1,     1, 0, 1, 0, 0,       2 ],
 /*   */ [ 3, 3, 2, 1, 1,      1, 3, 1, 1, 1,       1, 1, 3, 3, 1,     1, 1, 3, 1, 1,       2 ],
 /*   */ [ 2, 2, 3, 2, 3,      1, 2, 1, 2, 2,       2, 2, 2, 1, 1,     1, 2, 2, 1, 1,       2 ],
 /* 15*/ [ 2, 2, 2, 0, 2,      1, 3, 0, 3, 1,       1, 2, 1, 1, 0,     2, 0, 2, 3, 2,       2 ],

 /*   */ [ 2, 0, 1, 0, 3,      2, 0, 3, 0, 1,       2, 2, 2, 3, 2,     1, 2, 2, 2, 2,       2 ],
 /*   */ [ 2, 3, 1, 0, 2,      1, 2, 1, 2, 1,       2, 3, 0, 2, 2,     3, 0, 2, 2, 2,       2 ],
 /*   */ [ 2, 2, 1, 2, 2,      2, 2, 3, 0, 3,       0, 2, 2, 2, 3,     0, 2, 3, 0, 2,       2 ],
 /*   */ [ 2, 2, 3, 0, 2,      1, 0, 1, 0, 0,       2, 1, 0, 0, 1,     1, 0, 0, 0, 2,       2 ],
 /* 20*/ [ 3, 2, 1, 0, 2,      2, 3, 1, 3, 1,       1, 1, 1, 3, 1,     1, 1, 1, 0, 2,       2 ],

 /*   */ [ 2, 3, 1, 2, 2,      2, 1, 2, 0, 2,       3, 2, 1, 0, 3,     3, 1, 2, 2, 2,       2 ],
 /*   */ [ 2, 0, 2, 2, 2,      1, 0, 3, 1, 2,       2, 2, 3, 1, 0,     2, 2, 3, 0, 2,       2 ],
 /*   */ [ 2, 3, 0, 2, 2,      2, 1, 2, 1, 0,       0, 2, 1, 2, 3,     1, 0, 0, 1, 0,       2 ],
 /*   */ [ 3, 0, 3, 0, 2,      1, 2, 2, 1, 3,       1, 2, 2, 2, 2,     3, 0, 1, 1, 1,       2 ],
 /* 25*/ [ 2, 1, 0, 1, 0,      2, 1, 0, 1, 0,       1, 0, 2, 0, 1,     0, 2, 1, 2, 2,       2 ],

 /*   */ [ 1, 1, 1, 1, 1,      1, 1, 1, 1, 1,       1, 1, 1, 1, 1,     1, 1, 1, 1, 1,       1 ],
];

function setup_maze(scene){

  
  const topBottomWallGeo = new THREE.BoxGeometry(SCALE_FACTOR, 10, SCALE_FACTOR*0.1);
  const leftRightWallGeo = new THREE.BoxGeometry(SCALE_FACTOR*0.1, 10, SCALE_FACTOR);
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x66688aa 
  });
  wallMaterial.side = THREE.DoubleSide;

  /// DEBUG
  const ballGeo = new THREE.SphereGeometry(SCALE_FACTOR,);
  const origin = new THREE.Mesh(ballGeo, wallMaterial);
  origin.position.set(0, 0, 0);
  scene.add(origin);

  for(let z = 0; z < maze.length; z++){
    for(let x = 0; x < maze[z].length; x++){

      let xPos = x;
      let zPos = z;

      if( (maze[z][x] & 1) != 0 ) {  // top walls
        xPos = (x) * SCALE_FACTOR ;
        zPos = (z-0.5)* SCALE_FACTOR;

        const wall = new THREE.Mesh( topBottomWallGeo, wallMaterial );
        console.log("Adding wall at position ", xPos, zPos, wall );
        wall.position.set(
          xPos,
          4,
          zPos
        );
        scene.add(wall);
        window.wall1=wall;
      }

      if( (maze[z][x] & 2) != 0) {  // left walls
        xPos = (x-0.5)* SCALE_FACTOR;
        zPos = (z) * SCALE_FACTOR ;
        const wall = new THREE.Mesh( leftRightWallGeo, wallMaterial );
        console.log("Adding wall at position ", xPos, zPos, wall );
        wall.position.set(
          xPos,
          4,
          zPos
        );
        scene.add(wall);
        window.wall2=wall;
      }

    }
  }

  // floor
  const floorGeom = new THREE.PlaneGeometry(
    maze.length,
    maze[0].length,
  )
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xF1BDCE
  });
  floorMaterial.side = THREE.DoubleSide;
  const floor = new THREE.Mesh(floorGeom, floorMaterial);
  scene.add(floor);
  floor.rotateX(Math.PI / 2);
  floor.rotateZ(Math.PI / 2);
  floor.position.set( maze.length/2+2 , 0, maze[0].length/2-2);
  window.floor = floor;
}
// const maze = [
//   [ 1, 1, 1, 1, 1, 1 , 1 , 1 , 1 , 1 ],
//   [ 1, 0, 0, 0, 0, 0 , 1 , 0 , 0 , 1 ],
//   [ 1, 0, 1, 1, 0, 0 , 0 , 0 , 1 , 1 ],
//   [ 1, 0, 0, 1, 0, 0 , 0 , 0 , 0 , 1 ],
//   [ 1, 1, 0, 0, 0, 0 , 1 , 0 , 0 , 1 ],
//   [ 1, 1, 1, 1, 1, 1 , 1 , 1 , 1 , 1 ],
// ];

// function setup_maze(scene){
//   const wallGeometry = new THREE.BoxGeometry(0.1, 10, 0.1);
//   const wallMaterial = new THREE.MeshStandardMaterial({
//     color: 0x66688aa 
//   });
//   wallMaterial.side = THREE.DoubleSide;

//   for(let z = 0; z < maze.length; z++){
//     for(let x = 0; x < maze[z].length; x++){
//       if( maze[z][x] == 1 ){
//         const wall = new THREE.Mesh( wallGeometry, wallMaterial );
//         console.log("Adding wall at position ", x, 1, z);
//         wall.geo.set(x,4,z);
//         scene.add(wall);
//       }
//     }
//   }

//   // floor
//   const floorGeom = new THREE.PlaneGeometry(
//     maze.length,
//     maze[0].length,
//   )
//   const floorMaterial = new THREE.MeshStandardMaterial({
//     color: 0xF1BDCE
//   });
//   floorMaterial.side = THREE.DoubleSide;
//   const floor = new THREE.Mesh(floorGeom, floorMaterial);
//   scene.add(floor);
//   floor.rotateX(Math.PI / 2);
//   floor.rotateZ(Math.PI / 2);
//   floor.position.set( maze.length/2+2 , 0, maze[0].length/2-2);
//   window.floor = floor;
// }

const keys = {};

function is_wall(newPos){
  const col = Math.floor(newPos.x + 0.5);
  const row = Math.floor(newPos.z + 0.5);
  return maze[row]?.[col] !== 0;
}

const PLAYER_RADIUS = 0.2;

function collides(x, z) {
  return false;
  const r = PLAYER_RADIUS;

  const minX = Math.floor(x - r + 0.5);
  const maxX = Math.floor(x + r + 0.5);
  const minZ = Math.floor(z - r + 0.5);
  const maxZ = Math.floor(z + r + 0.5);

  for (let row = minZ; row <= maxZ; row++) {
    for (let col = minX; col <= maxX; col++) {
      // Empty cells don't collide.
      // Out-of-bounds cells count as walls.
      if (maze[row]?.[col] === 0) continue;

      const closestX = THREE.MathUtils.clamp(
        x, col - 0.5, col + 0.5
      );

      const closestZ = THREE.MathUtils.clamp(
        z, row - 0.5, row + 0.5
      );

      const dx = x - closestX;
      const dz = z - closestZ;

      if (dx * dx + dz * dz < r * r) {
        return true;
      }
    }
  }

  return false;
}

function animate(time){
  camera = window.camera;
  renderer = window.renderer;
  scene = window.scene;
  playerLight = window.playerLight;

  const player_direction = new THREE.Vector3();
  camera.getWorldDirection(player_direction);
  player_direction.y = 0;
  player_direction.normalize();

  const movement = new THREE.Vector3();
  const MOVEMENT_DX = 0.05;

  // keyboard management
  if ( keys["Space"] ) { movement.y += MOVEMENT_DX; }
  if ( keys["KeyB"] ) { movement.y = -MOVEMENT_DX; }

  // right left movement
  if (
    keys["ArrowRight"] || keys["ArrowLeft"] ||
    keys["KeyD"] || keys["KeyA"]
  ){
    const perp = new THREE.Vector3();
    perp.crossVectors(player_direction, camera.up).normalize();
    if( keys["KeyA"] || keys["ArrowLeft"] )
      perp.multiplyScalar( -1 );
    movement.addScaledVector(perp, MOVEMENT_DX);
  }
  // forward backward movement
  if (
      keys["ArrowDown"] || keys["ArrowUp"] ||
      keys["KeyS"] || keys["KeyW"]
    ) {

    const par = player_direction.clone();
    if( keys["ArrowDown"] || keys["KeyS"] ) par.multiplyScalar(-1);
    movement.addScaledVector(par,MOVEMENT_DX);
  }

  const newPos = camera.position.clone().add(movement);
  if( !collides(newPos.x, camera.position.z) ){
    camera.position.set( newPos.x, newPos.y, camera.position.z );
  }
  if( !collides(camera.position.x, newPos.z) ){
    camera.position.set( camera.position.x, newPos.y, newPos.z );
  }

  // UPDATE LIGHT
  playerLight.position.set(
    camera.position.x,
    camera.position.y,
    camera.position.z,
  );

  if( keys["KeyM"] ) window.floor.rotateX(Math.PI/2);
  // console.log(window.floor.rotation);

  renderer.render ( scene, camera );
}

function main(){ 

  // KEYBOARD SETUP
  window.addEventListener("keydown", e => {
    keys[e.code] = true;
    console.log("pressed "+  e.code);
  });

  window.addEventListener("keyup", e => {
    keys[e.code] = false;
  });

  // RENDERER
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // CAMERA
  const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth/window.innerHeight,
    0.01, 100
  );

  
  // SCENE
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x555555 );

  // LIGHTS
	const dirLight = new THREE.HemisphereLight( 0xffffff, 0x000000, 1);
	dirLight.position.set( 0, 10, 0 ).normalize();
	scene.add( dirLight );
	const playerLight = new THREE.PointLight( 0xffffff, 3, 0, 1);
	playerLight.position.set( 1.5, 1.5, 1.5 ).normalize();
	scene.add( playerLight );
	window.playerLight = playerLight;


	// MOUSE CONTROL
  const controls = new PointerLockControls(camera, document.body);
  document.addEventListener("click", () => {
    controls.lock();
  })
  
  setup_maze(scene);

  // camera.position.set(1, 1.16, 1);
  camera.position.set(1, 10, 1);
  camera.lookAt( 1.5, 1.16, 1.5);
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction)

  window.camera = camera;
  window.renderer = renderer;
  window.scene = scene;

  renderer.render( scene, camera );
  renderer.setAnimationLoop( animate );
}

main();
