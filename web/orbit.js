const backgroundColor = 0x111111;

/*////////////////////////////////////////*/

var renderCalls = [];
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
render();

/*////////////////////////////////////////*/

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 800 );
camera.position.set(0, 10, 30);

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( backgroundColor );

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

document.body.appendChild( renderer.domElement);

function renderScene(){ renderer.render( scene, camera ); }
renderCalls.push(renderScene);

/* ////////////////////////////////////////////////////////////////////////// */

var controls = new THREE.OrbitControls( camera );

controls.rotateSpeed = 0.2;
controls.zoomSpeed = 0.3;

controls.enablePan = false;

controls.enableDamping = true;
controls.dampingFactor = 0.1;


renderCalls.push(function(){
  controls.update()
});


/* ////////////////////////////////////////////////////////////////////////// */


var spotLight = new THREE.SpotLight( 0xffffff, 1.25 );
spotLight.position.set( -200, 200, 600 );
camera.add( spotLight );
spotLight.position.set(-5, 2, 0);
scene.add(camera);

var pointLight = new THREE.PointLight(0xffffff, 0.25);
scene.add(pointLight);


var outerMaterial = new THREE.MeshStandardMaterial({
  color: 0x4FFF00,
  metalness: 0.4,
  roughness: 0.7,
  side: THREE.FrontSide
} );


var innerMaterial = new THREE.MeshStandardMaterial({
  color: 0xFF0000,
  metalness: 0.2,
  roughness: 0.8,
  side: THREE.BackSide,
  //envMap: reflectionCube,
  envMapIntensity: 1,
} );


var axes = new THREE.AxesHelper(20);
scene.add(axes);

//const geometry = new THREE.SphereGeometry( 15, 32, 16, 0, Math.PI * 2, 0, Math.PI );
const geometry = new THREE.SphereGeometry( 15, 32, 16, 0, Math.PI * 2, 0, 2.7 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

var stats = initStats();
renderCalls.push(function(){
  stats.update()
});

/* ////////////////////////////////////////////////////////////////////////// */

function generateGeometry() {

  updateGroupGeometry( sphere,
    new SphereGeometry(
      15, 32, 16, 0, Math.PI *2, 0, 7)
  );
}

var datcontrols = new function() {
  this.rotationSpeed = 0.02;
  this.bouncingSpeed = 0.03;
  this.thetaLength = Math.PI;
}
var gui = new dat.GUI();
gui.add(datcontrols, 'rotationSpeed', 0, 0.5);
gui.add(datcontrols, 'bouncingSpeed', 0, 0.5);
gui.add(datcontrols, 'thetaLength', 0, Math.PI *2);


// taken from view-source:https://threejs.org/docs/scenes/geometry-browser.html#SphereGeometry
function updateGroupGeometry( mesh, geometry ) {

  mesh.children[ 0 ].geometry.dispose();
  mesh.children[ 1 ].geometry.dispose();

  mesh.children[ 0 ].geometry = new WireframeGeometry( geometry );
  mesh.children[ 1 ].geometry = geometry;

  // these do not update nicely together if shared
}

//renderer.localClippingEnabled = true;
//function makeSphereSlice(i, total){
//
//  var geometry = new THREE.SphereGeometry( 5, 32, 32 );
//  // geometry = new THREE.BoxGeometry( 8, 8, 8 );
//  var innerSphere = new THREE.Mesh( geometry, innerMaterial.clone() );
//  scene.add( innerSphere );
//
//  var sphere = new THREE.Mesh( geometry, outerMaterial.clone() );
//  scene.add( sphere );
//
//  var box = new THREE.Box3().setFromObject( sphere );
//  var clipTop = new THREE.Plane( new THREE.Vector3( 0, box.max.y * 1, 0 ), 1 );
//  var clipBottom = new THREE.Plane( new THREE.Vector3( 0, box.max.y * -1, 0 ), -1 );
//
//  var clipPlanes = [clipTop, clipBottom];
//
//
//  function clipMaterial(m){
//    m.clippingPlanes = clipPlanes;
//    m.needsUpdate = true;
//  }
//
//  clipMaterial(sphere.material);
//  clipMaterial(innerSphere.material);
//
//  var tl = new TimelineMax({ repeat: -1 });
//
//  var color = { hue: 1, s: 1, l: 0.6 };
//  tl.to(color, 6.8, {
//    hue: 0,
//    onUpdate: function(){
//      innerSphere.material.color.setHSL(color.hue, color.s, color.l);
//    }
//  });
//
//  tl.fromTo( clipTop, 6, {
//    constant: -1,
//  },{
//    constant: 1,
//    ease: 'Linear.easeNone'
//  }, 0);
//
//  tl.fromTo( clipBottom, 6, {
//    constant: 1,
//  },{
//    constant: -1,
//    ease: 'Linear.easeNone'
//  }, 0.8);
//
//  tl.progress( i  / total );
//}
//
//
//for (var i = 0, total = 5; i < total; i++) {
//  makeSphereSlice(i, total);
//}



// tl.to( clipOut, 3, {
//   constant: -1,
//   ease: 'Power3.easeInOut',
// }, 0);

// tl.staggerFromTo( clipPlanes, 3, {
//   constant: -1,
// },{
//   constant: 1,
//   ease: 'Power3.easeInOut',
// }, 0.5);
/*

function alphaMap(){
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      width = canvas.width = 128,
      height = canvas.height = 128;

  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, width, height);
  // ctx.globalAlpha = 0.8;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, height * 0.25, width, height);

  return canvas;
}

function alphaMapTexture(){
  var textureLoader = new THREE.TextureLoader();
  return textureLoader.load(alphaMap().toDataURL());
}

var tex = alphaMapTexture();
tex.minFilter = THREE.NearestFilter;
tex.magFilter = THREE.NearestFilter;
tex.wrapS = THREE.RepeatWrapping;
tex.wrapT = THREE.RepeatWrapping;
tex.anisotropy = 2;
console.log(tex);

TweenMax.to(tex.offset, 4, { y: 1, repeat: -1, ease: 'Linear.easeNone' });

sphere.material.alphaMap = tex;

/* */
