import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import './App.css';

function App() {
  const [recommendedFood, setRecommendedFood] = useState([]);

  useEffect(() => {

  }, []);

  // load options using API call
  const loadOptions = (inputValue) => {
    if (inputValue===""){
      return({'id':0,'title':"No Options"})
    } else{
      return fetch(`/loadNutrients/${inputValue}`).then(res => res.json()).then(data=>{
        const fetchedNutrients = JSON.parse(data.nutrient)  
        const objectLength = Object.keys(fetchedNutrients).length
        let nutrientList = []
        for (let  i = 0; i < objectLength; i++) {
          const nutrient = fetchedNutrients[i]
          nutrientList.push(nutrient)
        }
        return nutrientList
      })
    }
  };

  // handle selection
  const handleChange = value => {
    if (value!==""){
      const objectLength = Object.keys(value).length
      let foodList = []
      for (let  i = 0; i < objectLength; i++) {
        const selectedNutrient = value[i]
        fetch(`/loadFood/${selectedNutrient.id}`).then(res => res.json()).then(data=>{
          foodList.push({
            "nutrientID":selectedNutrient.id,
            "nutrientName":selectedNutrient.title,
            "food":data
          })
          setRecommendedFood(JSON.stringify(foodList))
        })
      }
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
