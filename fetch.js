document.addEventListener("DOMContentLoaded", function() {
    // Other logic to dynamically generate months and dates

    const submitButton = document.getElementById("button");
    
    submitButton.addEventListener("click", function() {
        const name = document.getElementById("nameInput").value;
        const checkedDates = [];
        
        // Find all checked checkboxes
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(function(checkbox) {
            checkedDates.push(checkbox.name);
        });
        
        // Prepare the data to send to the backend
        const formData = {
            name: name,
            selectedDates: checkedDates
        };
        
        // Send the data to the backend using POST request
        fetch('/submit-dates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
