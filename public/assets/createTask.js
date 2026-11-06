
//create-task-form-page


 // Date input and label
let userdateinput = document.getElementById('ct-date');
let calenderlbl = document.querySelector('label[for="ct-date"]');

// Time inputs
let startTimeinput = document.getElementById('ct-start');
let endtimeinput = document.getElementById('ct-end');

// Time labels
let startLbl = document.querySelector('label[for="ct-start"]');
let endLbl = document.querySelector('label[for="ct-end"]');

// Form
let form = document.getElementsByClassName('ct-card')[0];

// Get today's date
let today = new Date();

// Format today's date
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');

// Formatted calendar date
let todayDate = `${year}-${month}-${day}`;

// Prevent users from selecting past dates
userdateinput.min = todayDate;


// Check user input before submitting
form.addEventListener('submit', function(event) {

    
    let selectedStartTime = startTimeinput.value;
    let selectedEndTime = endtimeinput.value;

    // Check the selected date
   


    // Check the time range
    if (selectedEndTime <= selectedStartTime) {
        event.preventDefault();

        startLbl.style.color = 'red';
        endLbl.style.color = 'red';

        endLbl.textContent = 'End time must be later than start time';

        return;
    }


    //time-validation


   
    let now = new Date();

    let currentHrs = String(now.getHours()).padStart(2,'0');

    let currentMin = String(now.getMinutes()).padStart(2,'0');

    let currentTime = `${currentHrs}:${currentMin}`;


    if(selectedDate === todayDate){

       if(selectedStartTime < currentTime){

     event.preventDefault();

     startLbl.style.color = 'red';

     endLbl.style.color = 'red';

     startLbl.textContent = 'choose a future time as start time';

    }
 


    }


});






















