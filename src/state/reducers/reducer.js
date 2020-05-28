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
} from '../actions/actionTypes';

const initialState = {
  images: [],
  loadingBlockVisibility: false,
  defaultBlockVisibility: true,
  emptyBlockVisibility: false,
  totalNumberOfPages: null,
  currentPage: 1,
  searchInputValue: '',
  searchBtnDisabled: true,
  saveBtnDisabled: true,
  paginationBtnDisabled: false,
  request: null,
  currentQuery: [],
  queryArray: [],
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_SEARCH_INPUT_VALIDATION:
      return {
        ...state,
        currentPage: 1,
        searchBtnDisabled: false,
        searchInputValue: action.request,
        request: action.request,
      };
    case ERROR_SEARCH_INPUT_VALIDATION:
      return {
        ...state,
        searchBtnDisabled: true,
        searchInputValue: '',
      };
    case FETCH_START:
      return {
        ...state,
        loadingBlockVisibility: true,
        saveBtnDisabled: true,
      };
    case SET_SEARCH_STATE:
      return {
        ...state,
        searchInputValue: action.searchInputValue,
        currentQuery: [{ title: action.request, url: action.url }],
        request: action.request,
        images: action.images,
        loadingBlockVisibility: false,
        defaultBlockVisibility: false,
        emptyBlockVisibility: false,
        saveBtnDisabled: false,
        totalNumberOfPages: action.totalNumberOfPages,
        currentPage: action.currentPage,
      };
    case SAVE_QUERY:
      return {
        ...state,
        queryArray: action.currentQuery,
      };
    case SHOW_EMPTY_BLOCK:
      return {
        ...state,
        emptyBlockVisibility: true,
        loadingBlockVisibility: false,
        defaultBlockVisibility: false,
        saveBtnDisabled: true,
      };
    case SUCCESS_PAGINATION_INPUT_VALIDATION:
      return {
        ...state,
        paginationBtnDisabled: true,
      };
    case ERROR_PAGINATION_INPUT_VALIDATION:
      return {
        ...state,
        currentPage: action.currentPage,
        paginationBtnDisabled: false,
      };
    case RESET_SAVED_QUERIES:
      return {
        ...state,
        queryArray: [],
      };
    case FETCH_LOCAL_STORAGE:
      return {
        ...state,
        queryArray: action.storage,
      };
    default:
      return state;
  }
}
