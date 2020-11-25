import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback,nutrients) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {

    if (nutrients.length!==0){
      for (let  i = 0; i < nutrients.length; i++) {
        const nutrientID = nutrients[i]

        const observer = new IntersectionObserver(fetchData, {
          root: document.getElementById(`nutrient-${nutrientID}`),
          threshold: 1
        });
        
        const target = document.getElementById(`target-${nutrientID}`)
        observer.observe(target)
      }

      function fetchData(entries, observer) {
        entries.forEach(entry => {
          console.log('entry.target.id')
          console.log(entry.target.id)
          const isIntersecting = entry.isIntersecting
          console.log('isIntersecting')
          console.log(isIntersecting)
        }
        )
        setIsFetching(true)
      }
    }
  }, [nutrients]); 

  useEffect(() => {
    if (!isFetching) return
    callback(() => {
      console.log('called back')
    });
  }, [isFetching])

  return [isFetching, setIsFetching]
}

export default useInfiniteScroll;