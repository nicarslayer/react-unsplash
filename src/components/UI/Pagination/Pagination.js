import React from 'react';
import './Pagination.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';

const Pagination = (props) =>
  props.emptyBlockVisibility ? null : (
    <div className="Pagination">
      <span>Page</span>
      <form>
        <Input type="text" defaultValue={props.currentPage} onChange={props.onChange} />
        <Button type="primary" onClick={props.onClick} disabled={props.disabled}>
          Go
        </Button>
      </form>
      <div className="total-pages">
        <span>from</span>
        {props.pages}
      </div>
    </div>
  );
export default Pagination;
