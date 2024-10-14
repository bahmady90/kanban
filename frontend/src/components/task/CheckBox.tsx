import Checkbox from '@mui/material/Checkbox';
import useTask from '../../hooks/useTask';

type ControlledCheckBoxProps = {
  id: string,
  isCompleted: boolean
}

export default function ControlledCheckbox({ id, isCompleted }: ControlledCheckBoxProps) {
  
  
  const {handleSetSubTaskChecked} = useTask(); 

  const handleChange = () => {
    handleSetSubTaskChecked(id) 
  };

  return (
    <Checkbox
      checked={isCompleted}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      sx={{
        color: '#ffffff', // Unchecked state background color
        '&.Mui-checked': {
          color: '#635FC7', // Checked state background color
        },
        '& .MuiSvgIcon-root': {
          fontSize: 28, // Adjust size if needed
        },
        // Remove default focus styles
        '&:focus': {
          outline: 'none', // Remove focus outline
          boxShadow: 'none', // Remove box shadow
        },
        '&:focus-visible': {
          outline: 'none', // Remove focus visible outline
          boxShadow: 'none', // Remove focus visible box shadow
        }
      }}
    />
  );
}



