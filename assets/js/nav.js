function toggleMenu(){
  console.log("clicked");
  nav = document.querySelector("nav")
  
  if(! nav.classList.contains("show-menu")){
    nav.classList.add("show-menu")
  } else {
    nav.classList.remove("show-menu")
  }

}
