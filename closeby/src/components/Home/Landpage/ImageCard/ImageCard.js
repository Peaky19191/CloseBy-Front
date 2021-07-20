import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Collapse } from '@material-ui/core';
import  useStyles  from './styles';

const ImageCard = ({ info, checked }) => {
    const classes = useStyles();
  
    return (
      <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={info.imageUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              className={classes.title}
            >
              {info.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            >
              {info.description}
            </Typography>
          </CardContent>
        </Card>
      </Collapse>
    );
  }

  export default ImageCard;