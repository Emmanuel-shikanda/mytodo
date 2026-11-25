
let logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click',function(event){

event.preventDefault()

fetch('/logout',{method:"POST"})
.then(function(){
    
window.location.href='/login'

})



})








































