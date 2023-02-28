import { useRef, useEffect } from 'react';

//! кастоный хук, для "бесконечной лентой" observer (используется в Posts.jsx)
export const useObserver = (ref, canLoad, isLoading, callback) => { //useRef - целевого элемента (observer), canLoad - ограничение (page < totalPages), isLoading - флажок, callback - setPage(+1)
  //! useRef для хранения наблюдателя:
  const observer = useRef();
  
  //! useEffect с Observer:
  useEffect(() => {
    //! опции нам не нужны, ведь root по-умолчанию - видимое окно браузера, это нам и нужно
    // var options = {
    //   root: document.querySelector('#scrollArea'), // наблюдатель (по-умолчанию видимое окно браузера)
    //   rootMargin: '0px', // отступы
    //   threshold: 1.0 // процент пересечения целевого элемента
    // }
    //! колбэк,который запуститься (подгружает порцию постов) при пересечении границы целевого элемента
    if (isLoading) return; // если индикатор = true, то выход 
    if (observer.current) observer.current.disconnect(); // удалять наблюдение за элементом
    var cb = function (entries, observer) { //! entries - это массив целевых элементов (в нашем случае это только div)
      if(entries[0].isIntersecting && canLoad) { //! isIntersecting - возвращает true/false в зависимости  в зоне видимости ли целевой элемент или нет
        //console.log(entries);
        //console.log(page);
        //setPage(page + 1); //! увеличим текущую страницу, чтобы была соответствующая подгрузка постов
        //! теперь это callback 
        callback()
        //console.log('DIV В ЗОНЕ ВИДИМОСТИ');
      } 
    };
    // options нам не нужны
    // var observer = new IntersectionObserver(callback, options);
    //! объявление наблюдателя 
    observer.current = new IntersectionObserver(cb); // (сохраним в useref)
    
    //! объявление целевого элемента
    observer.current.observe(ref.current); // current это поле useRef - lastElement.current
    //console.log(observer.current);
  }, [isLoading]); //! зависимость 
}