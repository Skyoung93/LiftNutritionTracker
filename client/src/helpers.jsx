export const convertDatefromUnix = (date) => {
  date = new Date(date);
  let month = date.getMonth() + 1;
  let calDay = date.getDate();
  let year = date.getFullYear();
  return { month, calDay, year };
}

export const convertDatetoUnix = ( year, month, calDay ) => {
  let date = new Date(`${year}-${month}-${calDay}`);
  return date.getTime();
}