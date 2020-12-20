import React from 'react'
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: '100%',
      justifyContent: 'space-around'
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    //   paddingRight: '260px'
    },
  }));

export default function VerticalTabView() {
    const classes = useStyles();
    
    const [value, setValue] = React.useState(0);

    const [jobData, setJobData] = React.useState([])
    
    // fetch all job descriptions
    // const jobPages = await fetch(window.location.origin + '/?rest_route=wp-json/acf/v3/pages')
    // const jobPages = await fetch('http://shenfilmstest.local/wp-json/acf/v3/pages')


    function asyncProgressBar() {
      return new Promise(resolve => setTimeout(() => resolve(), 2500));
    }
    React.useEffect(() => {
        async function GetAllJobs(){
            const jobPages = await fetch(window.location.origin + '/?rest_route=/acf/v3/pages/')
            const jobData = await jobPages.json()
            console.log(jobData)
            setJobData(jobs => [...jobs, jobData])

        }

        GetAllJobs()
        
        // remove the progress bar by targeting .makeStyles-root-1 or .jss1 or .MuiLinearProgress-root after 2.5s
        asyncProgressBar().then(() => {
          
          const el = document.querySelector(".App .jss1 > .MuiLinearProgress-root")
          if (el) {
            el.style.display = 'none'
            el.remove()
          }
        });

    }, [])

    
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    
    return (
        <div className={classes.root}>
            
            <div className="job-title">
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    {                        
                      jobData.flat().filter(entry => entry.acf.length !== 0 ? entry.id : null).map((entry, index) => (
                        <Tab label={`${entry.acf.role_title}`} {...a11yProps(index)} />                          
                      ))                        
                    }        
                </Tabs>
            </div>


            <div className="job-section">
                {
                    // console.log(jobData)
                    jobData.flat().filter(entry => entry.acf.length !== 0 ? entry.id : null).map((entry, idx) => (                        
                      
                      <TabPanel value={value} index={idx}>
                            {
                                parse(`${entry.acf.role_description}`)
                            }
                      </TabPanel>
                      
                    ))
                }
            </div>

            
    </div>
    )
}
