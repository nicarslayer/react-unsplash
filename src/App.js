import React, {Component} from 'react';
import './App.scss';
import Button from './components/UI/Button/Button';
import Input from './components/UI/Input/Input';
import axios from 'axios'
import Loader from './components/UI/Loader/Loader';
import DefaultBlock from './components/DefaultBlock/DefaultBlock';
import ImgList from './components/ImgList/ImgList';
import Pagination from './components/UI/Pagination/Pagination';

export default class App extends Component {

  state = {
    images: [],
    loading: false,
    defaultBlock: true,
    pages: null,
    currentPage: 1,
    disabled: true
  }

  handleChange = (event) => {
    if( event.target.value.trim() !== '' ){      
      this.setState({
        request: event.target.value,
        currentPage: 1,
        disabled: false
      }) 
    } else {
      this.setState({
        disabled: true
      }) 
    }
       
  }

  handleSubmit = (event) => {

    const currentPage = this.state.currentPage
    const images = []
    const request = this.state.request    

    axios.get('https://api.unsplash.com/search/photos?per_page=30&page='+currentPage+'&query='+request+'&client_id=T47LHJDjEujXoOF7KrTXcP9CLns2zW3BARnsoMA4fDs')
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
        images, loading : false, defaultBlock: false, pages: response.data.total_pages
      }); 
      
      
    });
    
    this.setState({
      loading : true
    });
    
    event.preventDefault()

  }

  pageHandler = (event) => {

    if( isNaN(event.target.value) ){
      event.target.value = ''
    } else {

      const inputVal = +event.target.value
      const maxValue = this.state.pages

      if(inputVal > maxValue){
        event.target.value = maxValue
      }

      this.setState({
        currentPage: event.target.value
      })   

    }

  }


  render(){

    return(
      <div  className="wrap">

        <form className="search-form">
          <div className="search-form__input-container">
            <Input 
              type="text" 
              placeholder="Search free high-resolution photos"
              onChange={this.handleChange} 
            />
          </div>
          <div className="search-form__buttons-group">
            <Button type="primary" onClick={this.handleSubmit} disabled={this.state.disabled}>Search</Button>
            <Button type="secondary" disabled>Save</Button>
          </div>
        </form>
          

        <div className="row">
          <div className="content-box">
            {
              this.state.defaultBlock
              ? 
                <DefaultBlock />
              : 
                this.state.loading
                ? 
                  <Loader />
                : 
                  <React.Fragment>
                    <ImgList 
                      images={this.state.images}
                    />
                    <Pagination 
                      pages={this.state.pages} 
                      currentPage={this.state.currentPage} 
                      onChange={this.pageHandler} 
                      onClick={this.handleSubmit}
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
