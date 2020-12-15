import React  from 'react'
import FoodItem from './FoodItem'

const FoodList = ({nutrientID,nutrientName,food}) => {
  
  return(
    <div >
      <button id={`collapsible-${nutrientID}`} type="button" className="collapsible">{nutrientName}</button>
      <div className="collapsible-content"> 
        <ul className="row list-group scroll-container"  id={`nutrient-${nutrientID}`}>
          {food.map(({id, name,amount}, index) => <FoodItem
                    id={id}
                    name={name}
                    amount={amount}
                    index={index}
                    key={`food-list-${index}`} 
                    />)}
          <li id={`target-${nutrientID}`}>
            <div className="list-group-item2">
              <h5> Fetching... </h5>
            </div>  
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FoodList
