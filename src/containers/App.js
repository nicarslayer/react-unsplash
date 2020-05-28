import React, { Component } from 'react';
import './App.scss';
import Loader from '../components/UI/Loader/Loader';
import DefaultBlock from '../components/DefaultBlock/DefaultBlock';
import ImgList from '../components/ImgList/ImgList';
import Pagination from '../components/UI/Pagination/Pagination';
import HistoryList from '../components/HistoryList/HistoryList';
import DefaultHistoryBlock from '../components/DefaultHistoryBlock/DefaultHistoryBlock';
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import {
  searchInputValidation,
  fetchSearchResponse,
  paginationInputValidation,
  saveQuery,
  fetchFromSavedRequests,
  resetSavedQueries,
  fetchLocalStorage,
} from '../state/actions/search';

class App extends Component {
  componentDidMount() {
    try {
      const serializedState = localStorage.getItem('initialState');
      if (serializedState === null) {
        return undefined;
      }
      return this.props.fetchLocalStorage(JSON.parse(serializedState));
    } catch (err) {
      return undefined;
    }
  }

  render() {
    return (
      <div className="wrap">
        <Grid
          className="search-form"
          component="form"
          onSubmit={(event) => this.props.fetchSearchResponse(event, this.props.request, 1)}
          container
        >
          <Grid item xs={12}>
            <Paper>
              <div className="input-container">
                <TextField
                  label="Search free high-resolution photos"
                  value={this.props.searchInputValue}
                  variant="outlined"
                  onChange={(event) => this.props.searchInputValidation(event)}
                  required
                />
              </div>
              <div className="buttons-group">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => this.props.fetchSearchResponse(event, this.props.request, 1)}
                  disabled={this.props.searchBtnDisabled}
                >
                  Search
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.props.saveQuery}
                  disabled={this.props.saveBtnDisabled}
                >
                  Save
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <div className="row">
          <div className="content-box">
            {this.props.defaultBlockVisibility ? (
              <DefaultBlock />
            ) : this.props.loadingBlockVisibility ? (
              <Loader />
            ) : (
              <React.Fragment>
                <ImgList
                  images={this.props.images}
                  emptyBlockVisibility={this.props.emptyBlockVisibility}
                />
                <Pagination
                  pages={this.props.totalNumberOfPages}
                  emptyBlockVisibility={this.props.emptyBlockVisibility}
                  disabled={this.props.paginationBtnDisabled}
                  currentPage={this.props.currentPage}
                  onChange={(event) => this.props.paginationInputValidation(event)}
                  onClick={(event) =>
                    this.props.fetchSearchResponse(
                      event,
                      this.props.request,
                      this.props.currentPage
                    )
                  }
                />
              </React.Fragment>
            )}
          </div>

          <div className="saved-queries-container">
            <div>
              <Paper className="saved-queries">
                {this.props.queryArray.length > 0 ? (
                  <React.Fragment>
                    <div className="historyListHeader">
                      <div className="title">Search history:</div>
                      <Button
                        variant="contained"
                        color="default"
                        startIcon={<DeleteIcon />}
                        onClick={this.props.resetSavedQueries}
                      >
                        Reset
                      </Button>
                    </div>
                    <HistoryList
                      queryArray={this.props.queryArray}
                      onClick={(event) => this.props.fetchFromSavedRequests(event)}
                    />
                  </React.Fragment>
                ) : (
                  <DefaultHistoryBlock />
                )}
              </Paper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    images: state.images,
    loadingBlockVisibility: state.loadingBlockVisibility,
    defaultBlockVisibility: state.defaultBlockVisibility,
    emptyBlockVisibility: state.emptyBlockVisibility,
    totalNumberOfPages: state.totalNumberOfPages,
    currentPage: state.currentPage,
    searchInputValue: state.searchInputValue,
    searchBtnDisabled: state.searchBtnDisabled,
    saveBtnDisabled: state.saveBtnDisabled,
    paginationBtnDisabled: state.paginationBtnDisabled,
    request: state.request,
    currentQuery: state.currentQuery,
    queryArray: state.queryArray,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchInputValidation: (event) => dispatch(searchInputValidation(event)),
    fetchSearchResponse: (event, request, currentPage) =>
      dispatch(fetchSearchResponse(event, request, currentPage)),
    paginationInputValidation: (event) => dispatch(paginationInputValidation(event)),
    saveQuery: () => dispatch(saveQuery()),
    fetchFromSavedRequests: (event) => dispatch(fetchFromSavedRequests(event)),
    resetSavedQueries: () => dispatch(resetSavedQueries()),
    fetchLocalStorage: (storage) => dispatch(fetchLocalStorage(storage)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
