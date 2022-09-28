export const convertDatefromUnix = (date) => {
  date = new Date(date);
  let month = date.getMonth() + 1;
  let calday = date.getDate();
  let year = date.getFullYear();
  return { month, calday, year };
}

export const convertDatetoUnix = ( year, month, calDay ) => {
  let date = new Date(`${year}-${month}-${calDay}`);
  return date.getTime();
}