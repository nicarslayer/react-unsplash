import React from 'react';
import './ImgItem.scss';
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';

const ImgItem = (props) =>
  props.images.map((image) => (
    <Grid item sm={6} xs={12} key={image.id} className="Img-item">
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={image.userPhoto} />}
          title={image.userName}
          subheader={image.date}
        />
        <CardMedia image={image.urls} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {image.title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ));
export default ImgItem;
