import * as THREE from 'three'
import images from "./images";

/* create container */
const container = document.querySelector('.landing__background')

/* create scene */
const scene = new THREE.Scene
scene.background = new THREE.Color(0xffffff)

/* load in texture */
const layer0 = new THREE.TextureLoader().load(images.bg0)
const layer1 = new THREE.TextureLoader().load(images.bg1)
const layer2 = new THREE.TextureLoader().load(images.bg2)
const layer3 = new THREE.TextureLoader().load(images.bg3)
const layer4 = new THREE.TextureLoader().load(images.bg4)

/* bind texture to material */
const layer0_material = new THREE.MeshBasicMaterial({map: layer0, transparent:true, opacity: 1})
const layer1_material = new THREE.MeshBasicMaterial({map: layer1, transparent:true, opacity: 1})
const layer2_material = new THREE.MeshBasicMaterial({map: layer2, transparent:true, opacity: 1})
const layer3_material = new THREE.MeshBasicMaterial({map: layer3, transparent:true, opacity: 1})
const layer4_material = new THREE.MeshBasicMaterial({map: layer4, transparent:true, opacity: 1})

/* create geometry */
const layer0_plane = new THREE.PlaneGeometry(1, 1)
const layer1_plane = new THREE.PlaneGeometry(1, 1)
const layer2_plane = new THREE.PlaneGeometry(1, 1)
const layer3_plane = new THREE.PlaneGeometry(1, 1)
const layer4_plane = new THREE.PlaneGeometry(1, 1)

/* bind the material and geometry into a mesh */
const layer0_mesh = new THREE.Mesh(layer0_plane, layer0_material)
const layer1_mesh = new THREE.Mesh(layer1_plane, layer1_material)
const layer2_mesh = new THREE.Mesh(layer2_plane, layer2_material)
const layer3_mesh = new THREE.Mesh(layer3_plane, layer3_material)
const layer4_mesh = new THREE.Mesh(layer4_plane, layer4_material)
// image width & heigth
let img_width = 1440
let img_height = 900
// set mesh position
layer0_mesh.position.set(0, 0, -25)
layer1_mesh.position.set(0, 0, 75)
layer2_mesh.position.set(0, 0, 100)
layer3_mesh.position.set(0, 0, 75)
layer4_mesh.position.set(0, 0, 125)
// scale the mesh
layer0_mesh.scale.set(img_width, img_height, 0)
layer1_mesh.scale.set(img_width, img_height, 0)
layer2_mesh.scale.set(img_width, img_height, 0)
layer3_mesh.scale.set(img_width, img_height, 0)
layer4_mesh.scale.set(img_width, img_height, 0)
// add to scene
scene.add(layer0_mesh)
scene.add(layer1_mesh)
scene.add(layer2_mesh)
scene.add(layer3_mesh)
scene.add(layer4_mesh)

/* create camera */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 10000)
// camera position
camera.position.z = 600

/* create renderer */
const renderer = new THREE.WebGL1Renderer
renderer.setSize(window.innerWidth, window.innerHeight)
// add to html
container.appendChild(renderer.domElement)
// responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

/* create animate */
// mouse poosition
let mouse_posX = 0
let mouse_posY = 0

//animate function
function animate() {
    requestAnimationFrame(animate)
    // update camera position
    camera.position.x = -mouse_posX / 7
    camera.position.y = -mouse_posY / 7
    camera.lookAt(scene.position)
    // render
    renderer.render(scene, camera)
}

animate()

// listen mouse position
document.addEventListener('mousemove', event => {
    mouse_posX = event.pageX - (window.innerWidth / 2)
    mouse_posY = event.pageY - (window.innerHeight / 2)
})