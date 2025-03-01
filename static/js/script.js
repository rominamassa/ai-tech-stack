document.addEventListener("DOMContentLoaded", function() {
  const steps = document.querySelectorAll(".step");
  let currentStep = 0;
  
  // Show the first step
  if (steps.length) {
    steps[currentStep].classList.add("active");
  }
  
  // Function to auto-advance if a required radio is selected
  function autoAdvance(stepEl) {
    // Wait a tiny moment for the check to register
    setTimeout(() => {
      // Move to next step if not on the last step
      if (currentStep < steps.length - 1) {
        steps[currentStep].classList.remove("active");
        currentStep++;
        steps[currentStep].classList.add("active");
      }
    }, 300);
  }
  
  // Listen for change events on all radio inputs
  document.querySelectorAll("input[type='radio']").forEach(radio => {
    radio.addEventListener("change", function() {
      // Validate that this step has a selection (it should, since change fired)
      const currentStepEl = steps[currentStep];
      const requiredRadios = currentStepEl.querySelectorAll("input[type='radio'][required]");
      let valid = true;
      requiredRadios.forEach(radio => {
        const name = radio.name;
        const group = currentStepEl.querySelectorAll(`input[name="${name}"]`);
        if (![...group].some(r => r.checked)) {
          valid = false;
        }
      });
      if (valid) {
        autoAdvance(currentStepEl);
      }
    });
  });
  
  // Previous buttons remain for going back manually
  document.querySelectorAll(".prev-btn").forEach(button => {
    button.addEventListener("click", () => {
      steps[currentStep].classList.remove("active");
      currentStep = Math.max(currentStep - 1, 0);
      steps[currentStep].classList.add("active");
    });
  });
});