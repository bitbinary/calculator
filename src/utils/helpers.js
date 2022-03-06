export const numString = (num) => Number(Number(num).toFixed(10)).toString();

export function readObjSafe(obj, key) {
  return obj[key] || [];
}

export function getDateNDaysAgo(numOfDays, date = new Date()) {
  const daysAgo = new Date(date.getTime());

  daysAgo.setDate(date.getDate() - numOfDays);
  return daysAgo;
}

export const checkDateAfterGivenDate = (oldDate) => {
  return function (currentDate) {
    return new Date(currentDate).valueOf() > new Date(oldDate).valueOf();
  };
};

export const trimObjectByKey = (obj, criteriaChecker) => {
  let newObj = {};
  for (const key in obj) {
    if (criteriaChecker(new Date(key))) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export const readObjFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const saveObjtoLocalStorage = (key, obj) => {
  localStorage.setItem(key, JSON.stringify(obj));
};
