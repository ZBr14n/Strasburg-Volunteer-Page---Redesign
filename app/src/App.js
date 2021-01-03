import React from 'react';
import './scss/App.scss';
import VerticalTabView from './components/VerticalTabView';
import Button from '@material-ui/core/Button';
import LinearIndeterminate from './components/LinearIndeterminate'

function App(props) {

  const items = props.settings.some_items || [];

  return (
    
    <div className="App">
      <LinearIndeterminate />
      
      <VerticalTabView />

           
      <Button variant="contained" color="primary" onClick={()=>{window.location.href = window.location.origin + '/volunteer-application/'}}>
        Apply
      </Button>
      
      
    </div>
  );
}

export default App;
