import React  from 'react'
import FoodItem from './FoodItem'

const FoodList = ({nutrientID,nutrientName,food}) => {

  return(
    <div>
      <h3> {nutrientName} </h3>
      <ul className="row list-group scroll-container"  id={`nutrient-${nutrientID}`}>
        {food.map(({id, name,amount}, index) => <FoodItem
                                                  id={id}
                                                  name={name}
                                                  amount={amount}
                                                  index = {index}
                                                  key={`food-list-${index}`} 
                                                />)}
        <li id={`target-${nutrientID}`}>
          <div className="list-group-item">
            <div> Fetching... </div>
          </div>  
        </li>
      </ul>
    </div>
  )
}

export default FoodList
