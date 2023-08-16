function updateTime() {
    let currentDay = dayjs().format("MM-DD-YYYY");

    const currentHour = dayjs().format('H');



    $("#currentDay").text(currentDay)



    let today = dayjs().format("H");
    console.log(today)
    for (let i = 0; i < scheduleElArray.length; i++) {
        scheduleElArray[i].removeClass("future past present");

        if (today > scheduleElArray[i].data("hour")) {
            scheduleElArray[i].addClass("past");

        } else if (today === scheduleElArray[i].attr("data-hour")) {
            scheduleElArray[i].addClass("present");

        } else {

            scheduleElArray[i].addClass("future");
        }
    }
}

let saveBttn = $(".save-icon");
let containerEl = $(".container");
let sch9am = $("#9AM");
let sch10am = $("#10AM");
let sch11am = $("#11AM");
let sch12pm = $("#12PM");
let sch1pm = $("#1PM");
let sch2pm = $("#2PM");
let sch3pm = $("#3PM");
let sch4pm = $("#4PM");
let sch5pm = $("#5PM");

let scheduleElArray = [
    sch9am,
    sch10am,
    sch11am,
    sch12pm,
    sch1pm,
    sch2pm,
    sch3pm,
    sch4pm,
    sch5pm,
];

renderLastRegistered();
updateTime();
setInterval(updateTime, 1000);

function renderLastRegistered() {
    for (let el of scheduleElArray) {
        el.val(localStorage.getItem("time block " + el.data("hour")));

    }
}


function handleFormSubmit(event) {
    event.preventDefault();

    let btnClicked = $(event.currentTarget);

    let targetText = btnClicked.siblings("textarea");

    let targetTimeBlock = targetText.data("hour");

    localStorage.setItem("time block " + targetTimeBlock, targetText.val());
}

saveBttn.on("click", handleFormSubmit);