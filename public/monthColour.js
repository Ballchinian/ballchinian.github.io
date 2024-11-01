function getColorScale(totalDays, currentDay) {
    // Map the number to a color scale from rgb(128,0,0) to rgb(0,128,0)
    const startColor = [128, 0, 0];
    const endColor = [0, 128, 0];
    
    function interpolateColor(start, end, factor) {
        return start + (end - start) * factor;
        //Creates a template for graduale colour change
    }

    let scale = [];
    for (let i = 0; i <= totalDays; i++) {
        let factor = i / totalDays;
        let red = Math.round(interpolateColor(startColor[0], endColor[0], factor));
        let green = Math.round(interpolateColor(startColor[1], endColor[1], factor));
        scale.push(`rgb(${red},${green},0)`);
        //Module for the colour shifting
    }
    return scale[currentDay];
}

var totals = {};
document.addEventListener("DOMContentLoaded", function() {
    const monthList = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    for (let i=0; i < monthList.length; i++) {
        initializeMonth(monthList[i]);
    }
});

function getNextDay(dateString) {
    // Extract the month and day from the input string
    let month = dateString.slice(0, 3);
    let day = parseInt(dateString.slice(3));

    // Create a Date object using the current year
    let currentYear = new Date().getFullYear();
    let date = new Date(`${month} ${day}, ${currentYear}`);

    // Add one day to the date
    date.setDate(date.getDate() + 1);

    // Extract the new month and day from the Date object
    let newMonth = date.toLocaleString('default', { month: 'short' }).slice(0, 3);
    let newDay = date.getDate();

    // Format the new date string as 'Aug18'
    let nextDayString = `${newMonth}${newDay}`;

    return nextDayString;
}

function initializeMonth(month) {
    totals[month] = 0;
    var checkboxes = document.querySelectorAll('.' + month.toLowerCase() + 'Checkbox');
    
    // Count the total number of Saturdays and Sundays in the month
    var totalWeekends = 0;
    checkboxes.forEach(function(checkbox) {
        if (checkbox.labels[0].textContent.includes("Sat") || checkbox.labels[0].textContent.includes("Sun")) {
            totalWeekends++;
        }
    });

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            
            if (checkbox.checked) {   
                totals[month]++;
            } else {
                totals[month]--;
                
                if (checkbox.labels[0].textContent.includes('Sat')) {
                    const saturdayId = checkbox.id; // Get the ID of the Saturday
                    sundayIdAndNewMonth = getNextDay(saturdayId)
                    const sundayId = getNextDay(saturdayId)
                    checkMonth = sundayId.slice(0,3)
                    //sundayID may bleed into another month which is why checkMonth ensures this datas passed on to correct month
                    
                    const sundayCheckbox = document.getElementById(sundayId); // Find the Sunday checkbox by ID

                    if (sundayCheckbox && sundayCheckbox.checked) {
                        totals[checkMonth]--;
                        //If the sunday is checked and the saturday is unchecked, it removes a double colour effect to compensate for the sunday being forcably unchecked
                    }
                }
            }

            var colorScale = getColorScale(totalWeekends, totals[month]);
            document.getElementById(month).style.color = colorScale;
            //
        });
    });
}
