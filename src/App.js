import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import './App.css';

function App() {
  const [foodItem, setFoodItem] = useState(null);
  const [nutrientItem, setNutrientItem] = useState(null);

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
    //return fetch(`http://jsonplaceholder.typicode.com/posts?userId=${inputValue}`).then(res => res.json())

    fetch(`/loadNutrients/${inputValue}`).then(res => res.json()).then(data=>{
      const names = data.name
      let nutrientList = []
      names.map((name,index)=>(
        nutrientList.push({
          'id':index,
          'title':name
        })
      ))
      console.log('selectItems')
      console.log(nutrientList)
      return nutrientList
    })
  };

  return (
    <div className="App">
         <div>
          <AsyncSelect
            cacheOptions
            defaultOptions
            getOptionLabel={e => e.title}
            getOptionValue={e => e.id}
            loadOptions={loadOptions}
          />
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
