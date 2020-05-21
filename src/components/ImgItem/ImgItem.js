import React from 'react';
import './ImgItem.scss';
import { Card, CardHeader, Avatar, CardMedia, CardContent, Typography } from '@material-ui/core';

const ImgItem = (props) =>
  props.images.map((image) => (
    <Card className="Img-item" key={image.id}>
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
  ));
export default ImgItem;
