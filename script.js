// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var timeBlockHour = $('.time-block');
var events = $('.description');
console.log(events);




function currentTime(){
  var currentDate = dayjs().format('dddd, MMMM D YYYY');
  var currentHour = dayjs().format('h:mm:ss a');
  //console.log(currentDate);
  $("#currentDay").text(currentDate);
  //console.log(currentHour);

};
//calling this function will color code, past present, or future. 
// function setHourColor(){
//   console.log('setting color');
//   timeBlockHour.each(funciton (i){
//     currentTime = parseInt(dayjs().format('H'));

//   } 



//   };
function setColor(){
  timeBlockHour.each(function(i){
     var actualTime = parseInt(dayjs().format('H'));
     var scheduleTime = parseInt($(this).attr('id').split('-')[1]);
     // console.log(i, actualTime);
     // console.log(i, scheduleTime);
//actualTime = scheduleTime then class = present
    if(actualTime == scheduleTime){
      $(this).removeClass('future past')
      $(this).addClass('present');
      //the time is past
    } else if(actualTime > scheduleTime){
      $(this).removeClass('future present');
      $(this).addClass('past');
    } else if(actualTime < scheduleTime){
      $(this).removeClass('present past');
      $(this).addClass('future');

    } else{
      //console.log('you are a time traveller');
    }
})
};
 function storeEvents(){
//  console.log(events.value);
  $('.saveBtn').click('on', function(event){
    console.log('event', event);
    

    var textValue = $(this).parent().children()[1].value; 
    var workingIndex = $(this).attr('data-hour'); 
    console.log(workingIndex)
    console.log(textValue);
    var currentlyInStorage = JSON.parse(localStorage.getItem('events')) || []
    currentlyInStorage[workingIndex] = textValue; 
    localStorage.setItem('events', JSON.stringify(currentlyInStorage)) 
  })
};


function renderLocalOnLoad(){
  var currentStorage =JSON.parse(localStorage.getItem('events'))

  for(i = 0; i < events.length; i++)
  if(currentStorage != null){
    $(events[i]).text(currentStorage[i]);
  }

}





$(function () {
  storeEvents();
  currentTime();
  setColor();
  renderLocalOnLoad();
  

});


currentTime();
setInterval(currentTime, 60000);



