import React from 'react';
import { Grid } from '@material-ui/core';
import ImgItem from '../ImgItem/ImgItem';
import EmptyBlock from '../EmptyBlock/EmptyBlock';

const ImgList = (props) => (
  <React.Fragment>
    {props.emptyBlockVisibility ? (
      <EmptyBlock />
    ) : (
      <Grid container>
        <ImgItem images={props.images} />{' '}
      </Grid>
    )}
  </React.Fragment>
);
export default ImgList;
