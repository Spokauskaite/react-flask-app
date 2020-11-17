import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import './App.css';

function App() {
  const [foodItem, setFoodItem] = useState(null);
  const [nutrientItem, setNutrientItem] = useState(null);
  const [selectedNutrient, setSelectedNutrient] = useState(null);
  const [recommendedFood, setRecommendedFood] = useState(null);

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
    setSelectedNutrient(value);
    if (value!==""){
      fetch(`/loadFood/${value.id}`).then(res => res.json()).then(data=>{
        setRecommendedFood(JSON.stringify(data))
      })
    }
  }

  return (
    <div className="App">
         <div>
          <AsyncSelect
            cacheOptions
            defaultOptions
            value={selectedNutrient}
            getOptionLabel={e => e.title}
            getOptionValue={e => e.id}
            loadOptions={loadOptions}
            onChange={handleChange}
          />
       </div>
       <div>
          {recommendedFood === null ? 
            <div style={{ margin: '20px' }}>Recommended food items will be here! In 2 minutes :D</div> :
            <div style={{ margin: '20px' }}>Recommended food items are: {recommendedFood}</div>
          }  
        </div> 
    </div>
  );
}

export default App;
