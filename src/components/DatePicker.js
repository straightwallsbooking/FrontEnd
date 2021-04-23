import React, { useState } from "react";
import DatePickerr from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const DatePicker = (props) => {
//   const [startDate, setStartDate] = useState(new Date());
//   const onChange = (date) =>{
//     setStartDate(date)
//     props.onChange(date)
//   }
  return (
    <DatePickerr selected={props.value} onChange={props.onChange}  />
  );
};