import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import './App.css';

const fetchInfo = async (api) => {
  const response = await fetch(api)

  return await response.json()
}

function App() {
  const [recommendedFood, setRecommendedFood] = useState([]);

  useEffect(() => {

  }, []);

  // load options using API call
  const loadOptions = async (inputValue) => {
    if (inputValue===""){
      return({'id':0,'title':"No Options"})
    } else{
      const fecthedNutrients = await fetchInfo(`/loadNutrients/${inputValue}`)
      const parsedNutrients = JSON.parse(fecthedNutrients.nutrient)  
      const objectLength = Object.keys(parsedNutrients).length
      let nutrientList = []
      for (let  i = 0; i < objectLength; i++) {
        const nutrient = parsedNutrients[i]
        nutrientList.push(nutrient)
      }
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
        const fecthedFood = await fetchInfo(`/loadFood/${selectedNutrient.id}`)
        foodList.push({
          "nutrientID":selectedNutrient.id,
          "nutrientName":selectedNutrient.title,
          "food":fecthedFood
        })
      }
      setRecommendedFood(JSON.stringify(foodList))
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
       <div>
          {recommendedFood.length === 0 ? 
            <div style={{ margin: '20px' }}>Recommended food items will be here! In 2 minutes :D</div> :
            <div style={{ margin: '20px' }}>Recommended food items are: {recommendedFood}</div>
          }  
        </div> 
    </div>
  );
}

export default App;
