import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`,
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'cover',
      marginTop: 0,
    },
  }));

