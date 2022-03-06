// convert the number to a rounded and fixed string size.
export const numString = (num) => Number(Number(num).toFixed(10)).toString();


export function readObjSafe(obj, key) {
  return obj[key] || [];
}

// returns the date n days fron the given date. 
// Used to trim the history by days
export function getDateNDaysAgo(numOfDays, date = new Date()) {
  const daysAgo = new Date(date.getTime());
  daysAgo.setDate(date.getDate() - numOfDays);
  return daysAgo;
}

// Checks whether the date is valid to be in the history
export const checkDateAfterGivenDate = (oldDate) => {
  return function (currentDate) {
    return new Date(currentDate).valueOf() > new Date(oldDate).valueOf();
  };
};

// used to trim the objects and keep only the histories within the 
// given time frame based on the provided criteria
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
