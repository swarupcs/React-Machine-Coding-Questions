function scrollToElement(el) {
  window.scrollTo({
    top: el.offsetTop - 80,
    behavior: "smooth"
  });
}

function showStep(stepId) {
  removeHighlight();
  removePopover();

  const element = document.getElementById(stepId);
  if (!element) return;

  scrollToElement(element);

  const rect = element.getBoundingClientRect();

  createHighlight(rect);

  createPopover(
    rect,
    () => {
      if (currentStepIndex < STEPS.length - 1) {
        currentStepIndex++;
        showStep(STEPS[currentStepIndex]);
      }
    },
    () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        showStep(STEPS[currentStepIndex]);
      }
    }
  );
}

// Start walkthrough
showStep(STEPS[currentStepIndex]);
