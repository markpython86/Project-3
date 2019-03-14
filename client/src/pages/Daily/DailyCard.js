import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Flag, ArrowUpward, ArrowDownward } from '@material-ui/icons/'
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import CardHeader from '@material-ui/core/CardHeader';
import "./DailyCard.css";

const styles = {
  
  root: {
   padding: 0,
  },

  card: {
    minWidth: 275,
  },
  
  title: {
    fontSize: 14,
    textAlign: 'center',
    // alignItems: 'flex-end',
    padding: 0,
    },

  pos: {
    marginBottom: 12,
  },
};


function DailyCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card} id="card">
      <CardContent classes={{root: classes.root}.last}>
        <Grid container spacing={0} id="header">
          <Grid item xs={4}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            AM:AM
          </Typography>
          </Grid>


          <Grid item xs={4}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            01/01/01
          </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            PM:PM
          </Typography>
          </Grid>
        
        </Grid>

        <div id="headerLine"></div>

        <Typography id="text">
          <Flag id="icon"/> Daily Highlight
        </Typography>

        <Typography component="p" id="text">
          <ArrowUpward id="icon"/> Positive
        </Typography>

        <Typography component="p" id="text">
          <ArrowDownward id="icon"/> Negative
        </Typography>

<div id="footerLine"></div>

 <Grid id="footer" container spacing={0}>
 
        <Grid item xs={4}>
          <Typography className={classes.title} color="textSecondary" >
          1
        </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography className={classes.title} color="textSecondary" >
          2
        </Typography>
        </Grid>

         <Grid item xs={4}>
          <Typography className={classes.title} color="textSecondary" >
          3
        </Typography>
        </Grid>
        
        </Grid>

      </CardContent>
    </Card>
  );
}

DailyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DailyCard);