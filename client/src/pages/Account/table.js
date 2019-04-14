import React, { Component } from "react";
import API from "../../utils/API";
import MaterialTable from "material-table";
import './account.css'

function Table(props) {


  return (
    <div className="row">
      <div className="col-sm-6 col-md-4">
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
      </div>
    </div>
  );
}

export default Table;