function initOvertime (workingTimeContainer) {
  console.log('Overtime loaded');
  const overtimeValueSelector = '.number-positive-signed, .number-negative-signed';

  const overtimeAdjuster = new OvertimeAdjuster(workingTimeContainer, overtimeValueSelector);
  overtimeAdjuster.apply();
}

function observeMocoContent () {
  const workingTimeSelector = '.tst-hours-tracked-total-with-adjustments';

  const interval = setInterval(() => {
    const workingTimeElement = document.querySelector(workingTimeSelector);
    console.log(workingTimeElement);
    if (workingTimeElement) {

      clearInterval(interval);
      initOvertime(workingTimeElement);
    }
  }, 500);
}

observeMocoContent();

