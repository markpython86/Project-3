import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import './About.css';
import Palette from "../Grid/Palette"
import Avatar from '@material-ui/core/Avatar';
import Carousel from '../Home/carousel';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    width: '100%',
    // backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '60%',
    flexShrink: 0,
    verticalAlign: 'middle',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,
    verticalAlign: 'middle',
  },
  expansion: {
    backgroundColor: 'none',
  },
  bigAvatar: {
    marginTop: 15,
    width: 80,
    height: 80,
    textAlign: 'center',
    justifyContent: 'center',
  },
  center: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 15,
    width: 80,
    height: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  link: {
    color: '#938680',
  },
});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <Palette>
         
        <div id="aboutPanel">
        <div className="aboutMinimalist">
                    <h1>About Minimalist</h1>
                    
                    {/* <h3>You made today a mimimalist day. Keep it up! </h3>
                    <br></br>
                    <h3>You're logged out and good to go.</h3>
                    <br></br>
                    <h3>See you next time.</h3> */}

                    <img id="logo" src="../../utils/favicon/ML3.png"/>
                  

                </div>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')} className="panel">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Who we are.</Typography>
            <Typography className={classes.secondaryHeading}>
              Meet our team.
              
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={12} className={classes.root}>
            <Typography>
              Our team met through a coding bootcamp at an important time in all of our lives. We each came from very different experiences, and backgrounds, but very quickly it became apparent that we shared one thing in common: a driving passion to build products that actually made people's lives better. It didn't take long for us to come around the concept of Minimalist as something we believed in. We can't wait to continue to grow this tool to help more and more people do minimal journaling to find maximal reward.
              </Typography>
         
            <Grid container justify="center" alignItems="center">
                <Grid item xs={3} className={classes.center}>
                <Avatar alt="Daniel" src="../../utils/TeamPics/daniel.jpg" className={classes.bigAvatar} />
                <Typography className={classes.label}>Daniel</Typography>
                </Grid>
                <Grid item xs={3} className={classes.center}>
                <Avatar alt="Mark" src="../../utils/TeamPics/mark2.jpg" className={classes.bigAvatar} />
                <Typography className={classes.label}>Mark</Typography>
                </Grid>
                <Grid item xs={3} className={classes.center}>
                <Avatar alt="Andrew" src="../../utils/TeamPics/Andrew.jpg" className={classes.bigAvatar} />
                <Typography className={classes.label}>Andrew</Typography>
                </Grid>
                <Grid item xs={3} className={classes.center}>
                <Avatar alt="Madelyn" src="../../utils/TeamPics/madelyn.jpg" className={classes.bigAvatar} />
                <Typography className={classes.label}>Madelyn</Typography>
                </Grid>
              </Grid>
          
              </Grid>
              </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')} className="panel">
          
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>How Minimalist began.</Typography>
            <Typography className={classes.secondaryHeading}>Read the origin story.</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={12} className={classes.root}>
            <Typography>
              Minimalist didn't start as an app idea. It started as messy handwritten entries in Daniel's journal one day after he attempting to start journaling yet again. This time though, he was able to make a habit that actually stuck. The secret was in the minimalist approach. These short and focused entries meant two things. First, it was easy to stick with because it could be done quickly. And secondly, it was laser-focused, requiring basic self-reflection and prioritization. 
              <br></br>
              <br></br>
              It wouldn't be an overstatement to say that minimalist journaling had a massive impact in Daniel's life. He started to see the world differently. Minimalist journaling forced him to reflect on each day and be honest about the good and the bad. In time, he was able to notice trends in his life that he hadn't seen before, build new habits that actually stuck, and became far effective with getting things done.
              <br></br>
              <br></br>
              Minimalist was destined to become an app. When our team learned the tools necessary to build Minimalist, we knew it was time to help other people experience the reward of minimalist journaling. 
            </Typography>
            <Grid container justify="center" alignItems="center">
            <img id="journal" src="../../utils/favicon/journal.jpg"/>
            </Grid>
            </Grid>
            </Grid>
          </ExpansionPanelDetails>
        
        </ExpansionPanel>
        
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')} className="panel">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>How Minimalist works.</Typography>
            <Typography className={classes.secondaryHeading}>
              Read our philosophy.
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container justify="center" alignItems="center" className={classes.root}>
            <Carousel></Carousel>
            </Grid>
          </ExpansionPanelDetails>
        
        </ExpansionPanel>
       
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')} className="panel">
          
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Why Minimalist works.</Typography>
            <Typography className={classes.secondaryHeading}>
              Read the research.
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              First the bad news: <Link href={"http://science.sciencemag.org/content/345/6192/75"} className={classes.link}>in eleven studies</Link>, researchers found that participants would rather receive electric shocks than spend between 6 to 15 minutes with nothing to do but think and reflect. 
              
              Yet <Link href={"https://pdfs.semanticscholar.org/f340/3dfbe8299f850d295ab07cf7039a561a5edf.pdf"} className={classes.link}>research shows</Link> structured reflection is essential to learning and development.

              <br></br>
              <br></br>

              Now for the good news: it doesn't have to be a long sit down to do quality self-reflection. <Link href={"http://www.questsandsummits.com/Learning"} className={classes.link}>Research shows</Link> just spending a few minutes can have huge effects on your day. 
              <br></br>
              <br></br>
              This is why we have purposefully streamlined the self-reflection in Minimalist to be just three questions at the end of a day, three questions at the end of a week, and three questions at the end of a month. It really is that simple.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
    
      </Palette>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);