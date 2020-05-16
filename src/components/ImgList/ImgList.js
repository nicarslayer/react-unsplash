import React from 'react' 
import './ImgList.scss'
import ImgItem from '../ImgItem/ImgItem'
import EmptyBlock from '../EmptyBlock/EmptyBlock'

const ImgList = props => {    
    return(
        <div className="Img-list">
        {
            props.images.length
            ? 
                <ImgItem images={props.images} /> 
            : 
                <EmptyBlock />
        }
        </div>
    )
}
export default ImgList