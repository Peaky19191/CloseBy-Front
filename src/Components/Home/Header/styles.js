import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Montserrat',
  },
  colorText: {
    color: '#A8E0EE',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#CEE4E8',
    fontSize: '5rem',
    fontWeight: '500',
    textShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  goDown: {
    color: '#CEE4E8',
    fontSize: '7rem',
    maxHeight: 100
  },
  logo: {
    maxHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}))
