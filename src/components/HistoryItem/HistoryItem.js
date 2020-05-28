import React from 'react';
import './HistoryItem.scss';
import { ListItem, ListItemText } from '@material-ui/core';

const HistoryItem = (props) =>
  props.queryArray
    .slice(0)
    .reverse()
    .map((query, index) => (
      <ListItem button key={index} onClick={props.onClick} className="ListItem">
        <ListItemText primary={query.title}></ListItemText>
      </ListItem>
    ));
export default HistoryItem;
