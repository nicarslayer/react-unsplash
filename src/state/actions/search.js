import {
  SUCCESS_SEARCH_INPUT_VALIDATION,
  ERROR_SEARCH_INPUT_VALIDATION,
  FETCH_START,
  SET_SEARCH_STATE,
  SAVE_QUERY,
  SUCCESS_PAGINATION_INPUT_VALIDATION,
  ERROR_PAGINATION_INPUT_VALIDATION,
  SHOW_EMPTY_BLOCK,
  RESET_SAVED_QUERIES,
  FETCH_LOCAL_STORAGE,
} from './actionTypes';
import dataFetching from '../../utils/dataFetching';

export function successSearchInputValidation(request) {
  return {
    type: SUCCESS_SEARCH_INPUT_VALIDATION,
    request,
  };
}

export function errorSearchInputValidation() {
  return {
    type: ERROR_SEARCH_INPUT_VALIDATION,
  };
}

export function searchInputValidation(event) {
  return (dispatch) => {
    if (event.target.value.trim() !== '') {
      dispatch(successSearchInputValidation(event.target.value));
    } else {
      dispatch(errorSearchInputValidation());
    }
  };
}

export function fetchStart() {
  return {
    type: FETCH_START,
  };
}

export function setSearchState(request, url, images, totalNumberOfPages, currentPage) {
  return {
    type: SET_SEARCH_STATE,
    searchInputValue: request,
    request,
    url,
    images,
    totalNumberOfPages,
    currentPage,
  };
}

export function showEmptyBlock() {
  return {
    type: SHOW_EMPTY_BLOCK,
  };
}

export function fetchSearchResponse(event, request, currentPage) {
  return (dispatch) => {
    event.preventDefault();
    dispatch(fetchStart());

    const images = [];
    const url = `https://api.unsplash.com/search/photos?per_page=30&page=
      ${currentPage} 
      &query=
      ${request} 
      ${process.env.REACT_APP_CLIENT_ID}`;

    dataFetching(url).then((response) => {
      if (response.total !== 0) {
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

        dispatch(setSearchState(request, url, images, response.total_pages, currentPage));
      } else {
        dispatch(showEmptyBlock());
      }
    });
  };
}

export function addSavedQuery(currentQuery) {
  return {
    type: SAVE_QUERY,
    currentQuery,
  };
}

export function saveQuery() {
  return (dispatch, getState) => {
    const currentQuery = getState().currentQuery;
    const queryArray = getState().queryArray;

    if (queryArray.length !== 0) {
      for (let i = 0; i < queryArray.length; i += 1) {
        if (queryArray[i].title === currentQuery[0].title) {
          queryArray.splice(i, 1);
        }
      }
    }
    dispatch(addSavedQuery(queryArray.concat(currentQuery)));

    localStorage.setItem('initialState', JSON.stringify(getState().queryArray));
  };
}

export function successPaginationInputValidation() {
  return {
    type: SUCCESS_PAGINATION_INPUT_VALIDATION,
  };
}

export function errorPaginationInputValidation(currentPage) {
  return {
    type: ERROR_PAGINATION_INPUT_VALIDATION,
    currentPage,
  };
}

export function paginationInputValidation(event) {
  return (dispatch, getState) => {
    if (isNaN(event.target.value) || event.target.value === '' || event.target.value < 1) {
      event.target.value = '';
      dispatch(successPaginationInputValidation());
    } else {
      const inputVal = +event.target.value;
      const maxValue = getState().totalNumberOfPages;

      if (inputVal > maxValue) {
        event.target.value = maxValue;
      }
      dispatch(errorPaginationInputValidation(event.target.value));
    }
  };
}

export function fetchFromSavedRequests(event) {
  return (dispatch) => {
    dispatch(fetchSearchResponse(event, event.currentTarget.textContent, 1));
  };
}

export function savedQueriesWasDeleted() {
  return {
    type: RESET_SAVED_QUERIES,
  };
}

export function resetSavedQueries() {
  return (dispatch) => {
    localStorage.removeItem('initialState');
    dispatch(savedQueriesWasDeleted());
  };
}

export function fetchLocalStorage(storage) {
  return {
    type: FETCH_LOCAL_STORAGE,
    storage,
  };
}

export function fetchHistoryBlockVisibility() {
  return (dispatch, getState) => {
    const historyBlockVisibility = !getState().historyBlockVisibility;
    dispatch(toggleHistoryBlockVisibility(historyBlockVisibility));
  };
}

export function toggleHistoryBlockVisibility(state) {
  return {
    type: 'TOGGLE_HISTORY_BLOCK_VISIBILITY',
    state,
  };
}
