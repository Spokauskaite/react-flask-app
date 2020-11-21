import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let x = document.getElementById('group1')
    x.addEventListener('scroll', debounce(handleScroll, 500));
    return () => x.removeEventListener('scroll', debounce(handleScroll, 500));
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      console.log('called back');
    });
  }, [isFetching]);

  function handleScroll() {
    if (window.innerWidth + document.documentElement.scrollLeft !== document.documentElement.offsetWidth || isFetching) return;
    setIsFetching(true);
  }

  const debounce = (func, delay) => {
    let inDebounce;
    return function() {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => {
        func.apply(this, arguments);
      }, delay);
    }
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;