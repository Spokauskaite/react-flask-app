import React  from 'react'

const FoodItem = ({id,name,amount,index}) => {

  return(
    <li >
      <div className="list-group-item">
      <div> {name} </div>
      <br></br>
      <div> Amount: {amount} </div> 
      <div> Index: {index} </div> 
      </div>
    </li>
  )
}

export default FoodItem