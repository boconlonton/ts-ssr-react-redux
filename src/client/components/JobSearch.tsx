import { RootState } from "@client/redux/store";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { test } from "@client/redux/slices/jobSlice";

interface JobSearchProps {
  title?: string;
  horizontal?: boolean;
}

export default function JobSearch({ title, horizontal }: JobSearchProps) {
  const myState = useSelector((state: RootState) => state); // replace 'myState' with the actual state you want to access
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(test("New title"));
  };

  return (
    <div onMouseEnter={(e) => console.log(myState)} onClick={handleClick}>
      JobSearch with {title} {horizontal ? "horizontal" : "no horizontal"}
    </div>
  );
}
