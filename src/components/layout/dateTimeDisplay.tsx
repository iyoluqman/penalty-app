"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function DateTimeDisplay() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000 * 60);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const dayDate = format(time, "EEE, dd MMM");
  const timeStr = format(time, "hh:mm a").toLowerCase();

  return (
    <div className="flex flex-col">
      <p className="text-lg font-light">{dayDate}</p>
      <p className="text-4xl">{timeStr}</p>
    </div>
  );
}
