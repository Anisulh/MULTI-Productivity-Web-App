export const dueDate = (date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const today = new Date();
  const newDate = new Date(date);
  const todayDate = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const dueDate = Date.UTC(
    newDate.getFullYear(),
    newDate.getMonth(),
    newDate.getDate()
  );
  let difference = Math.floor((dueDate - todayDate) / _MS_PER_DAY);
  if (difference === 1) difference = "Due Tomarrow";
  else if (difference > 20 && difference < 31) difference = "Due in a Month";
  else if (difference === 7) difference = "Due In a Week";
  else if (difference < 0) difference = "Overdue"
  else difference = difference + " Days Left";

  return difference;
};