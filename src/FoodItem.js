import React  from 'react'

const FoodItem = ({id,name,amount}) => {
  return(
    <div>
      <div>
        <li className="list-group-item">
          <div> {name} </div>
          <br></br>
          <div> Amount: {amount} </div> 
        </li>
      </div>
    </div>
  )
}

export default FoodItem