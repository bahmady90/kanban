import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { useKanbanContext } from '../context/kanban-context';
import { useEffect } from 'react';

const CustomSwitch = styled(Switch)({
  '& .MuiSwitch-track': {
    backgroundColor: '#635FC7',  // Set the desired purple color
    opacity: 1,  // Ensure full opacity
  },
  '& .MuiSwitch-switchBase': {
    color: '#ffffff', // Thumb color when unchecked
  },
  '& .MuiSwitch-switchBase + .MuiSwitch-track': {
    backgroundColor: '#635FC7', // Track color when unchecked
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#ffffff', // Thumb color when checked
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#635FC7', // Track color when checked
    opacity: 1
  },
  '&:hover .MuiSwitch-track': {
    backgroundColor: "#A8A4FF",  // Opacity change on hover (applies to the purple track)
  },
  '& .MuiSwitch-switchBase.Mui-checked:hover + .MuiSwitch-track': {
    backgroundColor: '#A8A4FF',  // Lighter purple on hover when checked
  },
  // Remove default focus styles
  '& .MuiSwitch-switchBase:focus': {
    outline: 'none', // Remove focus outline
    boxShadow: 'none', // Remove focus box shadow
  },
  '& .MuiSwitch-switchBase:focus-visible': {
    outline: 'none', // Remove focus visible outline
    boxShadow: 'none', // Remove focus visible box shadow
  },
});


export default function Switcher() {

  const {dispatch, setDarkMode} = useKanbanContext();

  function handleChange(){
    dispatch({type: "SET_DARKMODE"})
  }

  useEffect(() => {
    // Add or remove 'dark' class from <html> or <body> when darkMode state changes
    if (setDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [setDarkMode]);

  return (
    <CustomSwitch
      disableRipple 
      defaultChecked
      onChange={handleChange}
      inputProps={{ 'aria-label': 'custom controlled switch' }}
    />
  );
}

