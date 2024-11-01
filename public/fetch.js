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
        fetch('/.netlify/functions/app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Your Name', // Replace with the actual name input
                selectedDates: ['2024-11-01', '2024-11-02'], // Replace with actual dates
              }),
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