import React  from 'react'

const FoodItem = ({id,name,amount,index}) => {

  let cardStyle
  if (index % 2) {
    cardStyle = "list-group-item1"
  } else {
    cardStyle = "list-group-item2"
  }
  return(
    <li >
      <div className={cardStyle}>
        <h5> {name} </h5>
        <br></br>
        <div className='nutrient-amount'> Amount: {amount} </div> 
      </div>
    </li>
  )
}

export default FoodItem