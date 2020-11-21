import React  from 'react'
import FoodItem from './FoodItem'

const FoodList = ({nutrientID,nutrientName,food}) => {
  return(
    <div>
      <div>
        <h3>{nutrientName}</h3>  
        <ul className="row list-group">
        {food.map(({id, name,amount}, index) => <FoodItem
                                                  id={id}
                                                  name={name}
                                                  amount={amount}
                                                  key={`food-list-${index}`} 
                                                />)}
        </ul>
      </div>
    </div>
  )
}

export default FoodList
