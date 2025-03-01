document.addEventListener("DOMContentLoaded", function() {
  const steps = document.querySelectorAll(".step");
  let currentStep = 0;
  
  // Show the first step
  if (steps.length) {
    steps[currentStep].classList.add("active");
  }

  // Handle "Next" buttons
  document.querySelectorAll(".next-btn").forEach(button => {
    button.addEventListener("click", () => {
      // Validate that user has selected something for *all* required questions in this step
      const currentStepEl = steps[currentStep];
      const requiredRadios = currentStepEl.querySelectorAll("input[type='radio'][required]");
      let stepValid = true;

      requiredRadios.forEach(radio => {
        // Check if there's at least one checked in the group
        const name = radio.name;
        const group = currentStepEl.querySelectorAll(`input[name="${name}"]`);
        if (![...group].some(r => r.checked)) {
          stepValid = false;
        }
      });

      if (!stepValid) {
        alert("Please select an option before proceeding.");
        return;
      }

      // Move to next step
      steps[currentStep].classList.remove("active");
      currentStep = Math.min(currentStep + 1, steps.length - 1);
      steps[currentStep].classList.add("active");
    });
  });

  // Handle "Previous" buttons
  document.querySelectorAll(".prev-btn").forEach(button => {
    button.addEventListener("click", () => {
      steps[currentStep].classList.remove("active");
      currentStep = Math.max(currentStep - 1, 0);
      steps[currentStep].classList.add("active");
    });
  });
});