function handleOvertime (workingTimeContainer) {
  console.log('Handling overtime');
  const overtimeValueSelector = '.number-positive, .number-default';
  const compensationContainerSelector = '.unplannable-background';

  const overtimeAdjuster = new OvertimeAdjuster(workingTimeContainer, overtimeValueSelector, compensationContainerSelector);
  overtimeAdjuster.apply();
}

function handleDashboard (firstWidgetTitleElement) {
  console.log('Handling dashboard');
}


const routes = {
  '^/profile/performance': {
    action: handleOvertime,
    elementSelector: '.tst-hours-tracked-total-with-adjustments'
  },
  '^/users/[^/]+/performance': {
    action: handleOvertime,
    elementSelector: '.tst-hours-tracked-total-with-adjustments'
  },
  '^/profile/report': {
    action: handleDashboard,
    elementSelector: '.tst-widget-title'
  },
};

function initExtension () {
  const path = window.location.pathname;

  const matchingRoute = Object.entries(routes).find(([pattern]) => {
    const routeRegexPattern = new RegExp(pattern);
    return routeRegexPattern.test(path);
  });

  if (matchingRoute) {
    const [, { elementSelector, action }] = matchingRoute;
    observeMocoContent(elementSelector, action);
  }
}

function observeMocoContent (elementSelector, callback) {
  const interval = setInterval(() => {
    const keyElement = document.querySelector(elementSelector);
    if (keyElement) {
      clearInterval(interval);
      callback(keyElement);
    }
  }, 500);
}

let lastUrl = location.href;
const observer = new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    initExtension();
  }
});

observer.observe(document.body, { subtree: true, childList: true });
initExtension()


