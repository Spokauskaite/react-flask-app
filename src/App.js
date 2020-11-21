import React, { useState, useEffect } from 'react'
import AsyncSelect from 'react-select/async'
import useInfiniteScroll from './useInfiniteScroll'
import FoodList from './FoodList'
import './App.css'

const fetchInfo = async (api) => {
  const response = await fetch(api)

  return await response.json()
}

const jsonToArray = (json) => {
  const object = JSON.parse(json)  
  const objectLength = Object.keys(object).length
  let itemList = []
  for (let  i = 0; i < objectLength; i++) {
    const item = object[i]
    itemList.push(item)
  }

  return itemList
}

function App() {
  const [recommendedFood, setRecommendedFood] = useState([])
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreFoodItems)
  const [batchOffset, setBatchOffset] = useState(0)

  async function fetchMoreFoodItems() {
    const objectLength = Object.keys(recommendedFood).length
    let updatedFoodList = []
    for (let  i = 0; i < objectLength; i++) {
      const nutrientItem = recommendedFood[i]
      const nutrientID = nutrientItem.nutrientID
      const nutrientName = nutrientItem.nutrientName
      let foodList = nutrientItem.food
      let fecthedFood = null
      fecthedFood = await fetchInfo(`/loadFood/${nutrientID}/${batchOffset}`)
      if (fecthedFood !== null) {
        const fecthedFoodList = jsonToArray(fecthedFood.food)
        foodList = foodList.concat(fecthedFoodList)
      }
      updatedFoodList.push({
        "nutrientID":nutrientID,
        "nutrientName":nutrientName,
        "food":foodList
      })
    }
    setRecommendedFood(updatedFoodList)
    setIsFetching(false)
    setBatchOffset(prevState => prevState+20) 
  }

  // load options using API call
  const loadOptions = async (inputValue) => {
    if (inputValue===""){

      return({'id':0,'title':"No Options"})
    } else{
      const fecthedNutrients = await fetchInfo(`/loadNutrients/${inputValue}`)
      const nutrientList = jsonToArray(fecthedNutrients.nutrient)
      
      return nutrientList
    }
  };

  // handle selection
  const handleChange = async (value) => {
    if (value!==""){
      const objectLength = Object.keys(value).length
      let foodList = []
      for (let  i = 0; i < objectLength; i++) {
        const selectedNutrient = value[i]
        const fecthedFood = await fetchInfo(`/loadFood/${selectedNutrient.id}/0`)
        const fecthedFoodList = jsonToArray(fecthedFood.food)
        foodList.push({
          "nutrientID":selectedNutrient.id,
          "nutrientName":selectedNutrient.title,
          "food":fecthedFoodList
        })
      }
      setRecommendedFood(foodList)
    }
  }

  return (
    <div className="App">
      <div>
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        getOptionLabel={e => e.title}
        getOptionValue={e => e.id}
        loadOptions={loadOptions}
        onChange={handleChange}
      />
      </div>
      <div id='group1' className='scroll-div'>
        {recommendedFood.length !== 0 &&
          recommendedFood.map(({nutrientID, nutrientName,food}, index) => <FoodList 
                                                                            nutrientID={nutrientID} 
                                                                            nutrientName={nutrientName}
                                                                            food={food}
                                                                            key={`food-list-${index}`} 
                                                                          />)
        }
      </div>
    </div>
  )
}

export default App

