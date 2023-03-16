export const formatHourAndMinute = new Intl.DateTimeFormat("en", {
  hour: "2-digit",
  minute: "2-digit",
});

export const formatMessagesSectionDate = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export const MessageDate = (date: Date) => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const dateText = date.toLocaleDateString("en", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  if (date.toDateString() === now.toDateString()) {
    return `today at ${formatHourAndMinute.format(date)}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `yesterday at ${formatHourAndMinute.format(date)}`;
  } else {
    return `${dateText} ${formatHourAndMinute.format(date)}`;
  }
};

export const MessagesSectionDate = (date: Date) => {
  return formatMessagesSectionDate.format(date);
};
