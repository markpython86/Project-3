import React from "react";
import Grid from '@material-ui/core/Grid';
import "./Container.css";


function Container(props) {
  const { spacing } = props;
  let number = parseInt(spacing, 10);
  return (
    <div>
      <Grid className="container" container spacing={number}>
          {props.children}
      </Grid>
    </div>
  );
}
export default Container;
