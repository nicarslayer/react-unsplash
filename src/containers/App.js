import React, {Component} from 'react';
import './App.scss';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import axios from 'axios'
import Loader from '../components/UI/Loader/Loader';
import DefaultBlock from '../components/DefaultBlock/DefaultBlock';
import ImgList from '../components/ImgList/ImgList';
import Pagination from '../components/UI/Pagination/Pagination';

export default class App extends Component {

  state = {
    images: [],
    loadingBlockVisibility: false,
    defaultBlockVisibility: true,
    totalNumberOfPages: null,
    currentPage: 1,
    searchBtnDisabled: true,
    paginationBtnDisabled: false,
  }

  searchInputHandler = (event) => {
    if( event.target.value.trim() !== '' ){      
      this.setState({
        request: event.target.value,
        currentPage: 1,
        searchBtnDisabled: false
      }) 
    } else {
      this.setState({
        searchBtnDisabled: true
      }) 
    }
       
  }

  searchHandler = (event) => {

    const currentPage = this.state.currentPage
    const images = []
    const request = this.state.request  
    const clientId = '&client_id=T47LHJDjEujXoOF7KrTXcP9CLns2zW3BARnsoMA4fDs'  

    axios.get('https://api.unsplash.com/search/photos?per_page=30&page='+currentPage+'&query='+request+clientId)
    .then(response => {
           
      Object.keys(response.data.results).forEach((key, index) => {
        images.push({
          id: key,
          title: response.data.results[index].description,
          urls: response.data.results[index].urls.regular,
        })
      })

      window.scrollTo(0, 0)

      this.setState({
        images, loadingBlockVisibility : false, defaultBlockVisibility: false, totalNumberOfPages: response.data.total_pages
      }); 
      
      
    });
    
    this.setState({
      loadingBlockVisibility : true
    });
    
    event.preventDefault()

  }

  paginationHandler = (event) => {

    if( isNaN(event.target.value) ){
      event.target.value = ''
      this.setState({
        paginationBtnDisabled: true,
      })
    } else if( event.target.value === ''){
      this.setState({
        paginationBtnDisabled: true,
      })
    } else {

      const inputVal = +event.target.value
      const maxValue = this.state.totalNumberOfPages

      if(inputVal > maxValue){
        event.target.value = maxValue
      }

      this.setState({
        currentPage: event.target.value,
        paginationBtnDisabled: false,

      })   

    }

  }


  render(){

    return(
      <div  className="wrap">

        <form className="search-form">
          <div className="input-container">
            <Input 
              type="text" 
              placeholder="Search free high-resolution photos"
              onChange={this.searchInputHandler} 
            />
          </div>
          <div className="buttons-group">
            <Button type="primary" onClick={this.searchHandler} disabled={this.state.searchBtnDisabled}>Search</Button>
            <Button type="secondary" disabled>Save</Button>
          </div>
        </form>
          

        <div className="row">
          <div className="content-box">
            {
              this.state.defaultBlockVisibility
              ? 
                <DefaultBlock />
              : 
                this.state.loadingBlockVisibility
                ? 
                  <Loader />
                : 
                  <React.Fragment>
                    <ImgList 
                      images={this.state.images}
                    />
                    <Pagination 
                      pages={this.state.totalNumberOfPages} 
                      disabled={this.state.paginationBtnDisabled}
                      currentPage={this.state.currentPage} 
                      onChange={this.paginationHandler} 
                      onClick={this.searchHandler}
                    />
                  </React.Fragment>
                
            }
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
    )
  }
}
