import React from 'react';
import HistoryItem from '../HistoryItem/HistoryItem';

const HistoryList = (props) => (
  <HistoryItem queryArray={props.queryArray} onClick={props.onClick} />
);
export default HistoryList;
