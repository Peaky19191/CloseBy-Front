import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        maxWidth: 645,
        background: 'rgba(168,224,238,0.2)',
        margin: '20px',
      },
      media: {
        height: 440,
      },
      title: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: '2rem',
        color: '#fff',
      },
      desc: {
        fontFamily: 'Montserrat',
        fontSize: '1.1rem',
        color: '#ddd',
      },
}))