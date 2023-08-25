const scheduleElArray = [
    $("#9AM"),
    $("#10AM"),
    $("#11AM"),
    $("#12PM"),
    $("#1PM"),
    $("#2PM"),
    $("#3PM"),
    $("#4PM"),
    $("#5PM")
];


function updateScheduleAppearance() {
    const currentTime = dayjs();
    const currentHour = currentTime.hour();

    $("#currentDay").text(currentTime.format("MM-DD-YYYY"));

    for (const scheduleEl of scheduleElArray) {
        const scheduleHour = parseInt(scheduleEl.data("hour"));

        scheduleEl.removeClass("past present future");

        if (scheduleHour < currentHour) {
            scheduleEl.addClass("past");
        } else if (scheduleHour === currentHour) {
            scheduleEl.addClass("present");
        } else {
            scheduleEl.addClass("future");
        }
    }
}


function renderSavedInput() {
    for (const scheduleEl of scheduleElArray) {
        const hour = scheduleEl.data("hour");
        const savedInput = localStorage.getItem(`time block ${hour}`);
        scheduleEl.find("textarea").val(savedInput);
    }
}


function handleFormSubmit(event) {
    event.preventDefault();

    const textarea = $(event.currentTarget).siblings("textarea");
    const hour = textarea.data("hour");
    const userInput = textarea.val();

    localStorage.setItem(`time block ${hour}`, userInput);
}


$(".save-icon").on("click", handleFormSubmit);


$(document).ready(function () {
    renderSavedInput();
    updateScheduleAppearance();
    setInterval(updateScheduleAppearance, 1000);
});