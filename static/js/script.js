document.addEventListener("DOMContentLoaded", function() {
  const steps = document.querySelectorAll(".step");
  let currentStep = 0;
  
  // Show the first step
  if (steps.length) {
    steps[currentStep].classList.add("active");
  }

  // Next button logic
  document.querySelectorAll(".next-btn").forEach(button => {
    button.addEventListener("click", () => {
      const currentStepEl = steps[currentStep];
      // Validate required radios in this step
      const requiredRadios = currentStepEl.querySelectorAll("input[type='radio'][required]");
      let valid = true;
      requiredRadios.forEach(radio => {
        const name = radio.name;
        const group = currentStepEl.querySelectorAll(`input[name="${name}"]`);
        // If no radio is checked in that group, it's invalid
        if (![...group].some(r => r.checked)) {
          valid = false;
        }
      });
      if (!valid) {
        alert("Please select an option before proceeding.");
        return;
      }
      // Move to the next step
      steps[currentStep].classList.remove("active");
      currentStep = Math.min(currentStep + 1, steps.length - 1);
      steps[currentStep].classList.add("active");
    });
  });

  // Previous button logic
  document.querySelectorAll(".prev-btn").forEach(button => {
    button.addEventListener("click", () => {
      steps[currentStep].classList.remove("active");
      currentStep = Math.max(currentStep - 1, 0);
      steps[currentStep].classList.add("active");
    });
  });
});