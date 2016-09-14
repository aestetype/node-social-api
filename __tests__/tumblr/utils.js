const hour = 60 * 60 * 1000;

function getOldDate() {
  const oldDate = new Date();
  oldDate.setTime(oldDate.getTime() - hour);
  return oldDate;
}

function getNewDate() {
  const newDate = new Date();
  newDate.setTime(newDate.getTime() + hour);
  return newDate;
}

export function generateOldMessage(text) {
  return {
    caption: text,
    date: getOldDate().toString(),
  };
}

export function generateNewMessage(text) {
  return {
    caption: text,
    date: getNewDate().toString(),
  };
}
