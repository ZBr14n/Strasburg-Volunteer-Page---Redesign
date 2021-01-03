import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
// import "../scss/preloader-style.scss"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LinearIndeterminate() {
    const classes = useStyles();
    // const preloader = document.querySelector('.page-loader')

    // React.useEffect(() => {
    //   setTimeout(()=>{preloader.style.opacity = "0.0"},1000)
    // }, [])
    
    return (
      <>
           
        {/* <div class="page-loader">
          <div class="page-loader-inner">
              <div class="spinner">
                  <div class="double-bounce1"></div>
                  <div class="double-bounce2"></div>
              </div>
          </div>
        </div> */}
  
      
        <div className={classes.root}>
          
          <LinearProgress />
          
        </div>
      </>
    )
}
