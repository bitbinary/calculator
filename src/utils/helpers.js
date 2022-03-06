export const numString = (num) => Number(Number(num).toFixed(10)).toString();

export function getHistoryValue(obj, key) {
  return obj[key] || [];
}

export const readObjFromLocalStorage =(key)=>{
    return JSON.parse(localStorage.getItem(key))
}

export const saveObjtoLocalStorage =(key,obj)=>{
    localStorage.setItem(key,JSON.stringify(obj))
}