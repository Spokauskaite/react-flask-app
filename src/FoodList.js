import React  from 'react'
import FoodItem from './FoodItem'

const FoodList = ({nutrientID,nutrientName,food}) => {

  return(
    <ul className="row list-group scroll-container"  id={`nutrient-${nutrientID}`}>
      {food.map(({id, name,amount}, index) => <FoodItem
                                                id={id}
                                                name={name}
                                                amount={amount}
                                                index = {index}
                                                key={`food-list-${index}`} 
                                              />)}
      <li id={`target-${nutrientID}`} className="list-group-item">
        <div> Fetching... </div>
      </li>
    </ul>
  )
}

export default FoodList
