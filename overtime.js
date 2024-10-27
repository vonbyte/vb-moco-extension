class OvertimeAdjuster {
  constructor (workingTimeContainer, overtimeSelector, compensationContainerSelector) {
    this.workingTimeContainer = workingTimeContainer;
    this.overtimeSelector = overtimeSelector;
    this.compensationContainerSelector = compensationContainerSelector;
  }

  _getOvertime () {
    this.overtimeElementParent = this.workingTimeContainer.parentElement.parentElement.querySelector('div + div');
    if (!this.overtimeElementParent) {
      console.warn('No overtime element found.');
      return;
    }
    this.overtimeElement = this.overtimeElementParent.querySelector(this.overtimeSelector);
    if (!this.overtimeElement) {
      console.warn('No overtime value element found.');
      return;
    }

    return parseFloat(this.overtimeElement.innerText);
  }

  _getCompensationAbsences () {
    const overtimeCompensations = document.querySelectorAll(this.compensationContainerSelector);
    const currentDate = new Date();

    return Array.from(overtimeCompensations).filter((compensation) => {
      const compensationWrapper = compensation.parentElement.parentElement;
      const compensationId = compensationWrapper.getAttribute('id');
      const [year, day, month] = compensationId.split('-').map(Number);
      const compensationDate = new Date(year, month - 1, day)
      console.log(currentDate,compensationDate)
      return currentDate < compensationDate;
    });

  }

  apply () {
    const overtime = this._getOvertime();
    console.log(overtime);
    const futureCompensations = this._getCompensationAbsences();
    console.log(futureCompensations);
    const futureCompensationHours = this._getFutureCompensationHours(futureCompensations);
    console.log(futureCompensationHours);
    const correctedOvertime = overtime - futureCompensationHours;
    const signedOvertime = correctedOvertime > 0 ? `+${correctedOvertime.toFixed(2)}` : `${correctedOvertime.toFixed(2)}`;

    const displayElement = document.createElement('div');
    displayElement.style.color = correctedOvertime > 0 ? 'green' : 'red';
    displayElement.textContent = `Angepasst: ${signedOvertime}`;
    this.overtimeElementParent.parentElement.insertBefore(displayElement, this.overtimeElementParent.parentElement.lastChild);


  }

  _getFutureCompensationHours (compensations) {
    return compensations.reduce((sum, compensation) => {
      const currentValue = parseFloat(compensation.firstChild.innerText) || 0;
      return sum + currentValue;
    }, 0);
  }
}

window.OvertimeAdjuster = OvertimeAdjuster;

