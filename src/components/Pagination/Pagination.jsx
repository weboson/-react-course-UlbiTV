import React from 'react';
import { getPagesArray } from '../../utils/pages';

//! ПАГИНАЦИЯ 
const Pagination = ({ totalPages, page, changePage }) => {

    //! массив порядковых чисел (основываясь на общем количестве страниц "getPageCount") для кнопок:
    let pagesArray = getPagesArray(totalPages); // getPagesArray(10) - из utils/pages 

    return (
        <div className='page__wrapper'>
            {
                pagesArray.map((p) =>
                    <span
                        //! устанавливаем в состояние текущей страницы  = в текущий номер массива (кнопки) и вызов постов
                        // changePage() => { setPage(page) и fetchPosts(limit, page); }
                        onClick={() => { changePage(p) }} // аргумент 'p' из колбэка. То есть, так "(p)=>changePage(p)" - не работает.
                        key={p}
                        //! получаем page от установленного текущее setPage и сравниваем с текущим элементом из массива (кнопок)
                        className={page === p ? 'page page__current' : 'page'}>
                        {p}
                    </span>
                )
            }
        </div>
    );
};

export default Pagination;