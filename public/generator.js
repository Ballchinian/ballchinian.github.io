document.addEventListener("DOMContentLoaded", function () {
    const modeSwitch = document.createElement("select");
    modeSwitch.innerHTML = `<option value="weekend">Weekend Mode</option>
                            <option value="allday">All-Day Mode</option>`;
    modeSwitch.id = "modeSwitch";
    document.body.insertBefore(modeSwitch, document.getElementById("monthContainer"));

    modeSwitch.addEventListener("change", function () {
        document.getElementById("monthContainer").innerHTML = "";
        if (this.value === "weekend") {
            generateWeekendMode();
        } else {
            generateAllDayMode();
        }
    });

    generateWeekendMode();
});

function generateWeekendMode() {
    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonthIndex = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const months = [];
    for (let i = 0; i < 5; i++) {
        months.push(allMonths[(currentMonthIndex + i) % 12]);
    }
    const container = document.getElementById("monthContainer");
    months.forEach(month => {
        const section = document.createElement("section");
        section.classList.add("month");
        const h2 = document.createElement("h2");
        h2.textContent = month;
        section.appendChild(h2);
        for (let i = 1; i <= 31; i++) {
            const date = new Date(currentYear, allMonths.indexOf(month), i);
            if (date.getMonth() !== allMonths.indexOf(month)) break;
            const dayOfWeek = date.toLocaleDateString('en', { weekday: 'short' });
            let dayOfMonthEnd;
            switch (i) {
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
            if (dayOfWeek === 'Sat' || dayOfWeek === 'Sun') {
                const div = document.createElement("div");
                div.classList.add("dates");
                const input = document.createElement("input");
                input.type = "checkbox";
                input.id = `${month}${i}`;
                input.name = `${month} ${i}${dayOfMonthEnd} ${dayOfWeek}`;
                const label = document.createElement("label");
                label.htmlFor = input.id;
                label.textContent = `${dayOfWeek} - ${i}${dayOfMonthEnd}`;
                div.appendChild(input);
                div.appendChild(label);
                section.appendChild(div);
            }
        }
        container.appendChild(section);
    });
}

function generateAllDayMode() {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const container = document.getElementById("monthContainer");
    daysOfWeek.forEach(day => {
        const section = document.createElement("section");
        section.classList.add("day-section");
        const label = document.createElement("label");
        label.textContent = day;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `toggle-${day}`;
        checkbox.addEventListener("change", function () {
            toggleDayVisibility(day, this.checked);
        });
        section.appendChild(checkbox);
        section.appendChild(label);
        container.appendChild(section);
    });
}

function toggleDayVisibility(day, isVisible) {
    document.querySelectorAll(`.dates input[name*='${day}']`).forEach(input => {
        input.parentElement.style.display = isVisible ? "block" : "none";
    });
}
