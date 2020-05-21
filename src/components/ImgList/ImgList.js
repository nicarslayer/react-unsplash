import React from 'react';
import './ImgList.scss';
import { GridList } from '@material-ui/core';
import ImgItem from '../ImgItem/ImgItem';
import EmptyBlock from '../EmptyBlock/EmptyBlock';

const ImgList = (props) => (
  <GridList>{props.images.length ? <ImgItem images={props.images} /> : <EmptyBlock />}</GridList>
);
export default ImgList;
