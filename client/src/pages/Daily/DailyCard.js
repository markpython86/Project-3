import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Flag, ArrowUpward, ArrowDownward } from '@material-ui/icons/'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import "./DailyCard.css";

const styles = {
  
  root: {
   padding: 0,
   "&:last-child": {
     paddingBottom: 0
   },
   minWidth: 275,
  },

  container: {
    minwidth: 275,
    textAlign: 'center',
   },
  
  header: {
  fontSize: 14,
  textAlign: 'center',
  padding: 0,
  color: '#808e95',
  fontWeight: '500',
  },

  headerActive: {
    fontSize: 14,
    textAlign: 'center',
    padding: 0,
    color: 'black',
    fontWeight: '500',
    },

  footer: {
    fontSize: 14,
    textAlign: 'center',
    padding: 0,
    color: '#808e95',
    fontWeight: '500',
  },

  footerActive: {
    fontSize: 14,
    textAlign: 'center',
    padding: 0,
    color: 'black',
    fontWeight: '500',
  },

  fab: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'disabled',
    justify: 'center',
  },

  fabActive: {
    fontSize: 14,
    textAlign: 'center',
    padding: 0,
    color: 'black',
  },

  pos: {
    marginBottom: 12,
  },
};

function DailyCard(props) {
  const { classes } = props;
  return (
    <Grid item>

    <Grid container className={classes.container}> 
    <Grid item xs={4}>
      <Fab size="small" id="saveButton" aria-label="Check" className={classes.fab}>
        <Icon fontSize="small">check_icon</Icon>
      </Fab>
    </Grid>

    <Grid item xs={4}>
      <Fab size="small" id="editButton" aria-label="Edit" className={classes.fab}>
        <Icon fontSize="small">edit_icon</Icon>
      </Fab>
    </Grid>

    <Grid item xs={4}>
      <Fab size="small" id="deleteButton" aria-label="Delete" className={classes.fab}>
        <Icon fontSize="small">delete_icon</Icon>
      </Fab>
    </Grid>
    </Grid>


    <Card className={classes.root} id="card">
      <CardContent className={classes.root}>
        <Grid container spacing={0} id="header">
          <Grid item xs={4}>
            <Typography className={classes.headerActive} color="textSecondary" gutterBottom>
            AM:AM
          </Typography>
          </Grid>


          <Grid item xs={4}>
            <Typography className={classes.headerActive} color="textSecondary" gutterBottom>
            01/01/01
          </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography className={classes.headerActive} color="textSecondary" gutterBottom>
            PM:PM
          </Typography>
          </Grid>
        
        </Grid>

        <div id="headerLine"></div>

        <Typography id="text">
          <Flag id="icon"/> Daily Highlight {props.name}
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
          <Typography className={classes.footerActive} color="textSecondary" >
          1
        </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography className={classes.footerActive} color="textSecondary" >
          2
        </Typography>
        </Grid>

         <Grid item xs={4}>
          <Typography className={classes.footerActive} color="textSecondary" >
          3
        </Typography>
        </Grid>
        
        </Grid>

      </CardContent>
    
    </Card>

    </Grid>

  );
}

DailyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DailyCard);