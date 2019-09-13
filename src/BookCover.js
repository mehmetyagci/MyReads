import React from 'react'

function BookCover(props) {
  const { width, height, backgroundImage  } = props;
  //console.log("BookCover:props", props)
  
  return (
     <div className="book-cover" style={{...props}} >
	 </div>
  )
}

export default BookCover