import React, { Component } from 'react';
import './App.scss';
import Loader from '../components/UI/Loader/Loader';
import DefaultBlock from '../components/DefaultBlock/DefaultBlock';
import ImgList from '../components/ImgList/ImgList';
import Pagination from '../components/UI/Pagination/Pagination';
import { Grid, Button, TextField } from '@material-ui/core';
import dataFetching from '../utils/dataFetching';

export default class App extends Component {
  state = {
    images: [],
    loadingBlockVisibility: false,
    defaultBlockVisibility: true,
    totalNumberOfPages: null,
    currentPage: 1,
    searchBtnDisabled: true,
    paginationBtnDisabled: false,
  };

  searchInputHandler = (event) => {
    if (event.target.value.trim() !== '') {
      this.setState({
        request: event.target.value,
        currentPage: 1,
        searchBtnDisabled: false,
      });
    } else {
      this.setState({
        searchBtnDisabled: true,
      });
    }
  };

  searchHandler = (event) => {
    event.preventDefault();

    const currentPage = this.state.currentPage;
    const images = [];
    const request = this.state.request;
    const clientId = '&client_id=T47LHJDjEujXoOF7KrTXcP9CLns2zW3BARnsoMA4fDs';

    dataFetching(currentPage, request, clientId).then((response) => {
      Object.keys(response.results).map((key, index) => {
        return images.push({
          id: key,
          title: response.results[index].description,
          urls: response.results[index].urls.regular,
          userName: response.results[index].user.name,
          userPhoto: response.results[index].user.profile_image.large,
          date: response.results[index].created_at.split('T')[0],
        });
      });
      window.scrollTo(0, 0);
      this.setState({
        images,
        loadingBlockVisibility: false,
        defaultBlockVisibility: false,
        totalNumberOfPages: response.total_pages,
      });
    });
  };

  paginationHandler = (event) => {
    if (isNaN(event.target.value) || event.target.value === '' || event.target.value < 1) {
      event.target.value = '';
      this.setState({
        paginationBtnDisabled: true,
      });
    } else {
      const inputVal = +event.target.value;
      const maxValue = this.state.totalNumberOfPages;

      if (inputVal > maxValue) {
        event.target.value = maxValue;
      }

      this.setState({
        currentPage: event.target.value,
        paginationBtnDisabled: false,
      });
    }
  };

  render() {
    return (
      <div className="wrap">
        <Grid
          className="search-form"
          component="form"
          onSubmit={this.searchHandler}
          container
          required
        >
          <div className="input-container">
            <TextField
              label="Search free high-resolution photos"
              variant="outlined"
              onChange={this.searchInputHandler}
              required
            />
          </div>

          <div className="buttons-group">
            <Button
              variant="contained"
              color="primary"
              onClick={this.searchHandler}
              disabled={this.state.searchBtnDisabled}
            >
              Search
            </Button>
            <Button variant="contained" color="secondary" disabled>
              Save
            </Button>
          </div>
        </Grid>
        <div className="row">
          <div className="content-box">
            {this.state.defaultBlockVisibility ? (
              <DefaultBlock />
            ) : this.state.loadingBlockVisibility ? (
              <Loader />
            ) : (
              <React.Fragment>
                <ImgList images={this.state.images} />
                <Pagination
                  pages={this.state.totalNumberOfPages}
                  disabled={this.state.paginationBtnDisabled}
                  currentPage={this.state.currentPage}
                  onChange={this.paginationHandler}
                  onClick={this.searchHandler}
                />
              </React.Fragment>
            )}
          </div>
          <div className="saved-queries-container">
            <div className="saved-queries">
              <span>Here</span>
              <span>will be</span>
              <span>your search history</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
