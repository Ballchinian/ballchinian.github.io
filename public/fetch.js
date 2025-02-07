document.getElementById('dates').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const name = document.getElementById('nameInput').value;
    const selectedDates = [];  // Collect selected dates based on checkboxes
  
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
      selectedDates.push(checkbox.name);
      
    });
  
    try {
      const response = await fetch('/.netlify/functions/app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, selectedDates })
      });
  
      const data = await response.json();
      console.log('Submission response:', data);
      console.log(`success ${name} and ${selectedDates}`)
    } catch (error) {
      console.log(`error ${name} and ${selectedDates}`)    
      console.error('Submission error:', error);
    }

    location.reload();
  });
  