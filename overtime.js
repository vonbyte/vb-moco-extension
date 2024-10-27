class OvertimeAdjuster {
  constructor (workingTimeContainer, overtimeSelector) {
    this.workingTimeContainer = workingTimeContainer;
    this.overtimeSelector = overtimeSelector;
  }

  _getOvertime () {
    const overtimeElementParent = this.workingTimeContainer.parentElement.parentElement.querySelector('div + div');
    if (!overtimeElementParent) {
      console.warn('No overtime element found.');
      return;
    }
    const overtimeElement = overtimeElementParent.querySelector(this.overtimeSelector);
    if (!overtimeElement) {
      console.warn('No overtime value element found.');
      return;
    }

    const overtimeValue = parseFloat(overtimeElement.innerText);
    console.info(overtimeValue);
    return overtimeValue;
  }

  apply () {
    const overtime = this._getOvertime();
    console.info(overtime);
  }
}

window.OvertimeAdjuster = OvertimeAdjuster;

