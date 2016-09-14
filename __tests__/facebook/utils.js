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
    message: text,
    updated_time: getOldDate().toString(),
  };
}

export function generateNewMessage(text) {
  return {
    message: text,
    updated_time: getNewDate().toString(),
  };
}
