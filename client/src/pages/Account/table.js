import React, { Component } from "react";
import API from "../../utils/API";
import MaterialTable from "material-table";

function Table(props) {


  return (
    <MaterialTable
      columns={[
        { title: "Entries", field: "_id", hidden: true },
        { title: "Date", field: "selectedDate" },
        { title: "Highlights", field: "highlights" },
        { title: "Positive", field: "positive" },
        { title: "Negative", field: "negative" },
        { title: "Wake Up", field: "wakeup" },
        { title: "Sleep", field: "sleep" },
        { title: "Habits", field: "habits" }
      ]}
      data={props.data}
      title="Account Statistics"
    />
  );
}

export default Table;