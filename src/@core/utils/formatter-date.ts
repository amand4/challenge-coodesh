import dayjs from "dayjs";
export const dateFormat = "DD/MM/YYYY";

export const formatterDate = (date: string) => {
  return dayjs(date).format(dateFormat);
};
