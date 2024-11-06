document.addEventListener("DOMContentLoaded", function() {
    var allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var currentMonthIndex = new Date().getMonth();
    var currentYear = new Date().getFullYear();
    //allMonths keeps names of months consistent for css and js

    var months = [];
    for (var i = 0; i < 5; i++) {
        months.push(allMonths[(currentMonthIndex + i) % 12]);
    }
    //selects the next i months by making each month and index and using % 12 to keep it within the bounds.

    var year = currentYear; 
    // Dynamically set the year

    var monthContainer = document.getElementById("monthContainer");
    //Main container for all months
    
    var pairs = [];
    //Pairs test
    

    months.forEach(function(month, index) {
        //Each month will now be constructed
        var section = document.createElement("section");
        section.classList.add('month');
        var h2 = document.createElement("h2");
        h2.textContent = month;
        h2.id = month;  
        section.appendChild(h2);
        //Month name has been added. The id is to change the colour of it as the checkboxes are filled out

        var firstDateAdded = false;
        var datesContainer = null;
        var currentSat = null;
        //firstDateAdded is to check if its the first Sat/Sun added to the month to add a css border for visuals
        //datesContainer is for css to add a container for each Sat/Sun alongside the checkbox
        //CurrentSat tracks the saturday to match with the sunday. This makes the code correctly identify the pairs. 

        for (var i = 1; i <= 31; i++) { // Hard limit in case I'm silly
            var monthIndex = (currentMonthIndex + index) % 12;
            var date = new Date(year, monthIndex, i);
            //creates all dates in the month of the year.
            if (date.getMonth() !== monthIndex) {
                break; // Exit loop if the date exceeds the current month
            }
            var dayOfWeek = date.toLocaleDateString('en', { weekday: 'short' });
            var dayOfMonth = date.getDate();
            //Selects the day (mon, tue, ... and the date so 1st,2nd,...)
            
            
            var isLastDayOfMonth = (new Date(year, monthIndex, dayOfMonth + 1).getMonth() !== monthIndex);
            //For later, checks if the sunday after the saturday leaks over to the next month, if so return true

            if (dayOfWeek === 'Sat') {
                currentSat = month + dayOfMonth;
                if (isLastDayOfMonth) {
                    pairs.push({sat: currentSat, sun: allMonths[(monthIndex + 1)%12] + 1 });
                    //Gets the pairs including if it bleeds into another month (e.g. sat 31st into sun 1st)
                }
            }

            if (dayOfWeek === 'Sun' && currentSat) {
                pairs.push({ sat: currentSat, sun: month + dayOfMonth });
                currentSat = null;
            }
            //Pairs the weekdays 

            
            if (dayOfWeek === 'Sat' || dayOfWeek === 'Sun') {
                //Selects only the Sat or Sun of the week

                if (!firstDateAdded) {
                    //Checks if its the first bunch of the month and adds the class firstDate if so to the div container.

                    datesContainer = document.createElement("div");
                    datesContainer.classList.add("dates", "firstDate");
                    firstDateAdded = true;
                } else if (dayOfWeek === 'Sat') {
                    // For each new weekend (starting with Saturday), create a new datesContainer

                    datesContainer = document.createElement("div");
                    datesContainer.classList.add("dates");
                }
                var input = document.createElement("input");
                input.type = "checkbox";
                input.classList.add(month.toLowerCase() + "Checkbox");
                input.id = month + dayOfMonth;
                

                input.name = month + " " + dayOfMonth + " " + dayOfWeek;
                input.value = "yes";
                //Adds the checkbox with specifically named class' and id for css and js

                var label = document.createElement("label");
                label.htmlFor = month + dayOfMonth;

                let dayOfMonthEnd;
                switch (dayOfMonth) {
                    case 1:
                    case 21:
                    case 31:
                        dayOfMonthEnd = 'st';
                        break;
                    case 2:
                    case 22:
                        dayOfMonthEnd = 'nd';
                        break;
                    case 3:
                    case 23:
                        dayOfMonthEnd = 'rd';
                        break;
                    default:
                        dayOfMonthEnd = 'th';
                }
                
                label.textContent = dayOfWeek + " - " + dayOfMonth + dayOfMonthEnd;
                //Always need a label :)
                

                

                if (dayOfWeek === 'Sun') {
                    var sunContainer = document.createElement("div");
                    sunContainer.setAttribute('id', month + dayOfMonth+'Container');
                    sunContainer.style.display = 'none';
                    sunContainer.appendChild(input);
                    sunContainer.appendChild(label);
                    datesContainer.appendChild(sunContainer);
                }


                else {
                    datesContainer.appendChild(input);
                    datesContainer.appendChild(label);
                    datesContainer.appendChild(document.createElement("br"));
                }

                //Joins the checkboxs and labels with the dates under the div dates Container

                if (dayOfWeek === 'Sun' || isLastDayOfMonth) {
                    section.appendChild(datesContainer);
                }
                //adds the dynamically generated datesContainer to the section with class month by checking if its a sunday (or if the month ends on the saturday), 
            }
        }
        monthContainer.appendChild(section);
        //Adds the month to the main section with id monthContainer


    });

    
    //console.log(pairs);
    pairs.forEach(pair => {
    });
    pairs.forEach(pair => {
        const saturdayCheckbox = document.getElementById(pair.sat);
        const sundayContainer = document.getElementById(pair.sun + 'Container');

        saturdayCheckbox.addEventListener('change', function() {
            if (this.checked) {
                sundayContainer.style.display = 'block';
                
                
            } else {
                sundayContainer.style.display = 'none';
                
                sundayCheckbox = document.getElementById(pair.sun);
                setTimeout(() => { sundayCheckbox.checked = ''; }, 5);
                
            }
        });
    });

    
});

