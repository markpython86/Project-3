import React from 'react';
import Grid from '@material-ui/core/Grid';


function Item(props) {
  return (
      <Grid item>
          {props.children}
      </Grid>
  );
}

export default Item;