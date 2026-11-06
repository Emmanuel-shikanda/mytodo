let checkBoxes = document.querySelectorAll(".complete-task");

checkBoxes.forEach(function(checkBox){

checkBox.addEventListener('change',function(){

let taskId=this.dataset.id;
let done=this.checked;

fetch("/todo/" +taskId+"/complete",{

method:"POST",

headers:{'Content-Type': 'application/json'},

body:JSON.stringify({completed:done})

});



})


});


// display-the-dates
let leo = document.getElementById('leo');


let todayLeo = new Date();

let date =todayLeo.getDate();

let month = todayLeo.toLocaleString('en-US',{
    month:'long'
});

let writtenYear = todayLeo.getFullYear();

leo.textContent=`${date} ${month} ${writtenYear}`;



let daysContainer = document.getElementById('days');

let today = new Date();

let currentDay = today.getDay();

let monday = new Date(today);

if(currentDay===0){
      monday.setDate(today.getDate()-6);
}else{
    monday.setDate(today.getDate()-(currentDay-1));
};


for(let i=0; i<7; i++){

let date = new Date(monday);

date.setDate(monday.getDate()+i);

let dayName =  date.toLocaleDateString('en-US',{
    weekday:'short'
});

let dayNumber = date.getDate();

let year = date.getFullYear();

let month = String(date.getMonth() + 1).padStart(2, '0');

let day = String(date.getDate()).padStart(2, '0');

let  fullDate = `${year}-${month}-${day}`;

let todayClass;

if (fullDate === new Date().toISOString().slice(0, 10)) {
  todayClass = "today";
} else {
  todayClass = "";
}

daysContainer.innerHTML += `
  <div class="day ${todayClass}" data-date="${fullDate}">
    <b>${dayNumber}</b>
    ${dayName}
  </div>
`;


}

let allDays = document.querySelectorAll('.day');

allDays.forEach(function(day){

day.addEventListener('click',function(){
 
  let selectedDate = this.dataset.date;

displayTodos(selectedDate);

})


})


let tasks = document.querySelectorAll('.task');

function displayTodos(selectedDate){

  tasks.forEach(function(task){

    let taskDate = task.dataset.date;


        console.log("Todo date:", taskDate);

    if(taskDate===selectedDate){
    task.style.display='flex';
  

    }else{
      task.style.display='none';
    }

  })

}


let todayfilter = new Date().toLocaleDateString('en-CA');

displayTodos(todayfilter);


function getTodayDate() {

    let today = new Date();

    let year = today.getFullYear();

    let month = String(today.getMonth() + 1).padStart(2, '0');

    let day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;

}

let todayDate = getTodayDate();

displayTodos(todayDate);



















