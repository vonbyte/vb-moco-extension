import {getOvertimeValue} from './modules/overtimeCalculator';

function init (overtimeElement) {
  console.log('Application loaded');
  const overtimeValueSelector = '.number-positive-signed, number-negative-signed ';

  // get overtime value
  const overtimeValue = getOvertimeValue(overtimeElement, overtimeValueSelector);
  console.log(overtimeValue);
  // get absences
  // calculate correct overtime
  // display in interface
}

function observeMocoContent () {
  const workingTimeSelector = '.tst-user-performance';

  const interval = setInterval(() => {
    const workingTimeElement = document.querySelector(workingTimeSelector);
    console.log(workingTimeElement);
    if (workingTimeElement) {

      clearInterval(interval);
      init(workingTimeElement);
    }
  }, 500);
}

observeMocoContent();

