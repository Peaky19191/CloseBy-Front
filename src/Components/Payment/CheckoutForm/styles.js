import { colors, makeStyles, rgbToHex } from '@material-ui/core';

export default makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: "10px",
    width: '',
  },

  body: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: '100vh',
    width: '100vw',
  },

  root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
    },
  },

  form: {

    width: '30vw',
    minWidth: '500px',
    alignSelf: 'center',
    boxShadow: '0px 0px 0px 0.5px rgba(50,50,93,0.1)',
    borderRadius: '7px',
    padding: '40px',
  },

  paymentMessage: {
    color: 'rgb(105, 115, 134)',
    fontSize: '16px',
    lineHeight: '20px',
    paddingTop: '12px',
    textAlign: 'center',
  },

  paymentElement: {
    marginBottom: '24px'
  },

  button: {
    background: '#5469d4',
    color: '#ffffff',
    borderRadius: '4px',
    border: '0',
    padding: '12px 16px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'block',
    transition: 'all 0.2s ease',
    boxShadow: '0px 4px 5.5px 0px rgba(0,0,0,0.07)',
    width: '100%'
  }

}))