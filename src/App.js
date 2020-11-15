import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import './App.css';

function App() {
  const [foodItem, setFoodItem] = useState(null);
  const [nutrientItem, setNutrientItem] = useState(null);
  const [selectedNutrient, setSelectedNutrient] = useState(null);
  const [recommendedFood, setRecommendedFood] = useState(null);

  useEffect(() => {

    const foodName = "Metabolizable Energy of Almonds"
    const nutrientId = 1002

    fetch(`/food/${foodName}`).then(res => res.json()).then(data => {
      setFoodItem(data.id)
    }); 

    fetch(`/nutrient/${nutrientId}`).then(res => res.json()).then(data => {
      setNutrientItem(data.name)
    }); 

  }, []);

  // load options using API call
  const loadOptions = (inputValue) => {
    if (inputValue===""){
      return({'id':0,'title':"No Options"})
    } else{
      return fetch(`/loadNutrients/${inputValue}`).then(res => res.json()).then(data=>{
        const nutrientList = data.name.map((name,index)=>({'id':name,'title':name}))
        return nutrientList
      })
    }
  };

  // handle selection
  const handleChange = value => {
    setSelectedNutrient(value);
    if (value!==""){
      console.log('fetching')
      fetch(`/loadFood/${value.title}`).then(res => res.json()).then(data=>{
        console.log('fetchedFood')
        console.log(data)
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
        <div>
          {foodItem === null ? 
            <div style={{ margin: '20px' }}>Please wait, fetching food ID by name...</div> :
            <div style={{ margin: '20px' }}>Food Item ID fetched by name 'Metabolizable Energy of Almonds' is: {foodItem}</div>
          }  
        </div> 
        <div>
          {nutrientItem === null ? 
            <div style={{ margin: '20px' }}>Please wait, fetching nutrient name by id...</div> :
            <div style={{ margin: '20px' }}>Nutrient Item Name fetched by ID 1002 is: {nutrientItem}</div>
          }  
        </div> 
    </div>
  );
}

export default App;
