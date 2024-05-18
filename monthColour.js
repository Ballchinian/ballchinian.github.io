function getColorScale(totalDays, currentDay) {
    // Map the number to a color scale from rgb(128,0,0) to rgb(0,128,0)
    const startColor = [128, 0, 0];
    const endColor = [0, 128, 0];
    
    function interpolateColor(start, end, factor) {
        return start + (end - start) * factor;
    }

    let scale = [];
    for (let i = 0; i <= totalDays; i++) {
        let factor = i / totalDays;
        let red = Math.round(interpolateColor(startColor[0], endColor[0], factor));
        let green = Math.round(interpolateColor(startColor[1], endColor[1], factor));
        let blue = Math.round(interpolateColor(startColor[2], endColor[2], factor));
        scale.push(`rgb(${red},${green},${blue})`);
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
            }

            var colorScale = getColorScale(totalWeekends, totals[month]);
            document.getElementById(month).style.color = colorScale;
        });
    });
}
