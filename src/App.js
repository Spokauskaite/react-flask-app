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
  const [selected, setSelected] = useState(null)
  const [nutrients, setNutrients] = useState([])
  const [recommendedFood, setRecommendedFood] = useState([])
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreFoodItems,nutrients)
  
  const initialBatchOffset = 0
  const batchSize = 20

  useEffect(() => {
    for (let i = 0; i < nutrients.length; i++) {
      const id = nutrients[i]
      var coll = document.getElementById(`collapsible-${id}`)
      coll.addEventListener("click", function() {
        this.classList.toggle("active")
        var content = this.nextElementSibling
        if (content.style.display === "block") {
          content.style.display = "none"
        } else {
          content.style.display = "block"
        }
      })
    }
  }, [nutrients])
  
  async function fetchMoreFoodItems(targetID) {
    
    const targetIDString = targetID.replace("target-", "")
    const targetIDInt = parseInt(targetIDString)
    
    const objectLength = Object.keys(recommendedFood).length
    let updatedFoodList = []
    for (let  i = 0; i < objectLength; i++) {
      const nutrientItem = recommendedFood[i]
      const {nutrientID,nutrientName} = nutrientItem
      let {food,batchOffset} = nutrientItem
      
      if ( nutrientID === targetIDInt ){
        let fecthedFood = null
        fecthedFood = await fetchInfo(`/loadFood/${nutrientID}/${batchOffset}`)
        if (fecthedFood !== null) {
          const fecthedFoodList = jsonToArray(fecthedFood.food)
          food = food.concat(fecthedFoodList)
        }
        batchOffset = batchOffset + batchSize -1
      }
      updatedFoodList.push({
        "nutrientID":nutrientID,
        "nutrientName":nutrientName,
        "food":food,
        "batchOffset":batchOffset
      })
    }
    setRecommendedFood(updatedFoodList)
    setIsFetching(false)
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
  const handleChange = (value) => {
    setSelected(null)
    if (value!==""){
      setSelected(value)
    } 
  }
  async function getFood() {
    setRecommendedFood([])
    setNutrients([])
    if (selected!==null){
      const objectLength = Object.keys(selected).length
      let foodList = []
      let nutrientList = []
      const nextBatchOffset = initialBatchOffset + batchSize -1
      for (let  i = 0; i < objectLength; i++) {
        const selectedNutrient = selected[i]
        const fecthedFood = await fetchInfo(`/loadFood/${selectedNutrient.id}/${initialBatchOffset}`)
        const fecthedFoodList = jsonToArray(fecthedFood.food)
        foodList.push({
          "nutrientID":selectedNutrient.id,
          "nutrientName":selectedNutrient.title,
          "food":fecthedFoodList,
          "batchOffset":nextBatchOffset
        })
        nutrientList.push(selectedNutrient.id)
      }
      setRecommendedFood(foodList)
      setNutrients(nutrientList)
    } 
  }
  
  return (
    <div  className='app'>
      <label className="form-label">Select Nutrients:</label>
      <div className ='row'>
        <div className = 'select-input'>
          <AsyncSelect
            id = "nutrientSelect"
            placeholder = "Start typing..."
            isMulti
            cacheOptions
            defaultOptions
            getOptionLabel={e => e.title}
            getOptionValue={e => e.id}
            loadOptions={loadOptions}
            onChange={handleChange}
          />
        </div>
        <button class="button" onClick={getFood}>Search Food</button>
      </div>
      <br></br>
      <div>
        { recommendedFood.length === 0 ?
          <div></div>:
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

