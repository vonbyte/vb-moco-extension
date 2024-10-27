const getOvertimeValue = (workingTimeSelector, overtimeSelector) => {

  const workingTimeElement = document.getElementById(workingTimeSelector);
  if (!workingTimeElement) {
    console.warn('No working time element found.');
    return null;
  }

  const overtimeContainer = workingTimeElement.parentElement.querySelector('div + div');
  if (!overtimeContainer) {
    console.warn('No overtime container found.');
    return null;
  }

  const overtimeElement = overtimeContainer.querySelector(overtimeSelector);
  if (!overtimeValue) {
    console.warn('No overtime value element found.');
  }

  const overtimeValue = parseFloat(overtimeElement.innerText);

  console.info(overtimeValue);
  return overtimeValue;

}

export { getOvertimeValue };