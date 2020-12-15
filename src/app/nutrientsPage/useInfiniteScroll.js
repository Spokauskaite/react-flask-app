import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback,nutrients) => {
  const [isFetching, setIsFetching] = useState(false)
  const [targetID, setTargetID] = useState(null)
  
  useEffect(() => {
    if (nutrients.length!==0){
      for (let  i = 0; i < nutrients.length; i++) {
        const nutrientID = nutrients[i]
        const observer = new IntersectionObserver(fetchData, {
          root: document.getElementById(`nutrient-${nutrientID}`),
          threshold: 0
        })
        const target = document.getElementById(`target-${nutrientID}`)
        observer.observe(target)
      }
      
      function fetchData(entries, observer) {
        entries.forEach(entry => {
          const isIntersecting = entry.isIntersecting
          const targetID = entry.target.id
          if (isIntersecting) {
            setTargetID(targetID)
            setIsFetching(true)
          }
        })
      }  
    }
  }, [nutrients])

  useEffect(() => {
    if (isFetching) {
      callback(targetID)
    }
  }, [isFetching])
  
  return [isFetching, setIsFetching]
}

export default useInfiniteScroll