import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";


const options = {
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date(),
  theme: {
    background: "",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "bg-atomicTangerine hover:bg-atomicTangerine",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <ChevronLeft />,
    next: () => <ChevronRight />,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "fr",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

const Calendar = ({
  selectedDate,
  className,
  onChange
}: {
  className: string;
  selectedDate: Date;
  onChange:(selectedDate : Date) => void;
}) => {
  const [show, setShow] = useState<boolean>(true);

  const datepickerClassNames = className;


  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <Datepicker
      options={{ ...options, datepickerClassNames }}
      onChange={onChange}
      show = {show}
      setShow={handleClose}
      selectedDateState={[selectedDate, onChange]}
    />
  );
};

export { Calendar };
