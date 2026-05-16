document.addEventListener("DOMContentLoaded", function(){

const menuToggle = document.getElementById("menuToggle");
const navLink = document.getElementById("navLink");

if(menuToggle){
  menuToggle.addEventListener("click", function(){
    navLink.classList.toggle("active");
  });
}

});