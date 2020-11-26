import React  from 'react'
import FoodItem from './FoodItem'

const FoodList = ({nutrientID,nutrientName,food}) => {

  return(
    <div className="collapsible-panel">
      <button id={`collapsible-${nutrientID}`} type="button" className="collapsible">{nutrientName}</button>
      <div className="content"> 
        <ul className="row list-group scroll-container"  id={`nutrient-${nutrientID}`}>
          {food.map(({id, name,amount}, index) => <FoodItem
                                                    id={id}
                                                    name={name}
                                                    amount={amount}
                                                    key={`food-list-${index}`} 
                                                  />)}
          <li id={`target-${nutrientID}`}>
            <div className="list-group-item">
              <div> Fetching... </div>
            </div>  
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FoodList
