import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import React from 'react';

type Props = {
  onChange: (checked: boolean) => void;
  isPrivate: boolean;
};
export default function CustomizedSwitches(props: Props) {
  const [state, setState] = React.useState({
    checked: props.isPrivate,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.onChange(event.target.checked);
  };

  const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: '#ffffff',
          },
          colorPrimary: {
            '&.Mui-checked': {
              color: '#00ccff',
            },
          },
          track: {
            opacity: 1,
            backgroundColor: '#00ccff',
            '.Mui-checked.Mui-checked + &': {
              opacity: 1,
              backgroundColor: '#fff',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.checked}
              onChange={handleChange}
              name="checkedA"
            />
          }
          label="Private"
        />
      </FormGroup>
    </ThemeProvider>
  );
}
