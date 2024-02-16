import { parseISO, formatDistanceToNow } from "date-fns";

import React from "react";

const TimeComp = ({ timeST }) => {
  let TimeComp = "";
  if (timeST) {
    const date = parseISO(timeST);
    const timePeriod = formatDistanceToNow(date);
    TimeComp = `${timePeriod} ago`;
  }

  return (
    <span title={timeST}>
      &nbsp; <i>{TimeComp}</i>
    </span>
  );
};

export default TimeComp;
