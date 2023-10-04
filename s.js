// Get the crop predictor form
const cropPredictorForm = document.querySelector('.crop-predictor form');

// Add an event listener to the form submit event
cropPredictorForm.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the user input
  const location = document.querySelector('#location').value;
  const environmentalConditions = document.querySelector('#environmental-conditions').value;

  // Send the user input to the backend server
  // TODO: Replace this with a real backend server
  fetch('/predict-crop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      location: location,
      environmentalConditions: environmentalConditions
    })
  })
  .then(response => response.json())
  .then(data => {
    // Display the predicted crop to the user
    const predictedCrop = data.predictedCrop;
    document.querySelector('.crop-predictor p').innerHTML = `The predicted crop for your location and environmental conditions is ${predictedCrop}.`;
  });
});

// Get the fertilizer predictor form
const fertilizerPredictorForm = document.querySelector('.fertilizer-predictor form');

// Add an event listener to the form submit event
fertilizerPredictorForm.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the user input
  const crop = document.querySelector('#crop').value;
  const soilType = document.querySelector('#soil-type').value;

  // Send the user input to the backend server
  // TODO: Replace this with a real backend server
  fetch('/predict-fertilizer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      crop: crop,
      soilType: soilType
    })
  })
  .then(response => response.json())
  .then(data => {
    // Display the predicted fertilizer to the user
    const predictedFertilizer = data.predictedFertilizer;
    document.querySelector('.fertilizer-predictor p').innerHTML = `The predicted fertilizer for your crop and soil type is ${predictedFertilizer}.`;
  });
});

// Get the disease predictor form
const diseasePredictorForm = document.querySelector('.disease-predictor form');

// Add an event listener to the form submit event
diseasePredictorForm.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the user input
  const diseaseImage = document.querySelector('#disease-image').files[0];

  // Send the user input to the backend server
  // TODO: Replace this with a real backend server
  fetch('/predict-disease', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: new FormData(diseasePredictorForm)
  })
  .then(response => response.json())
  .then(data => {
    // Display the predicted disease to the user
    const predictedDisease = data.predictedDisease;
    document.querySelector('.disease-predictor p').innerHTML = `The predicted disease for your plant is ${predictedDisease}.`;
  });
});
