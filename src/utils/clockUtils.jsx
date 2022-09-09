const getGreet = (hrs) => {
  if (hrs < 12) return "Guten Morgen";
  if (hrs >= 12 && hrs <= 18) return "Guten Tag";
  if (hrs >= 18 && hrs <= 21) return "Guten Abend";
  return "Good Nacht";
};

const options = {
  dateStyle: "long",
  timeStyle: "short",
  hour12: false,
};

export const getTimeDate = () => {
  const d = new Date();
  const hrs = d.getHours();
  let [date, time] = d.toLocaleString("en-IN", options).split("at");
  const greet = getGreet(hrs);
  return { date, time, greet };
};
