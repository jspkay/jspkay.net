function dynamicImpress(event){
  console.log(event.target)
  console.log(event)
  console.log(event.target.id)
  console.log("class -> " + event.target.class)

  ids = ["video-gamma", "gamma-ray-sky", "drop"]
  for(const vgid of ids){
    // console.log("checking id "+ vgid)
    if(event.target.id == "start-"+vgid){
      video = document.getElementById(vgid)
      video.currentTime=0
      video.play()
    }
    else if(event.target.classList.contains("keep-playing")){

    }
    else{
      video = document.getElementById(vgid)
      // console.log(video)
      video.pause()
      video.style
    }
  }

}

impressroot = document.getElementById("impress")

impressroot.addEventListener("impress:stepenter", dynamicImpress)

/* 
window.onresize = (e) => {
  debugdiv = document.querySelector("#debug")

  debugdiv.innerHTML = window.innerWidth + " x " + window.innerHeight + 
    "(" + window.innerWidth / window.innerHeight + " - " + 1920/1080 + ")"
}
*/

var keyPressed = false
var x = 0
var y = 0
var div = document.querySelector("#impress > div")

var rotZ = 0
var rotY = 0
var rotX = 0
var transX = 0
var transY = 0
var transZ = 0

div.style.transform = `rotateZ(${rotZ}deg) rotateY(${rotY}deg) rotateX(${rotX}deg) translate3d(${transX}px, ${transY}px, ${transZ}px)`
function fdown(e){
  keyPressed = true
  x = e.offsetX
  y = e.offsetY
}

function fup(e){
  keyPressed = false
}

function fmove(e) {
  if(keyPressed){
    dx = e.offsetX - x
    dy = e.offsetY - y 
    console.log(dx + ", " + dy )
    console.log(div.style.transform)

    transX = -dx
    transY = -dy

    template = `rotateZ(${rotZ}deg) rotateY(${rotY}deg) rotateX(${rotX}deg) translate3d(${transX}px, ${transY}px, ${transZ}px)`
    div.style.transform = template
  }
}

div.addEventListener("mousedown", fdown)
div.addEventListener("mouseup", fup)
div.addEventListener("mousemove", fmove)
