//! вычислить количество страниц, в зависимости от лимита постов на одной странице и  округлить
export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit); // вычислить количество страниц и  округлить
};

// массив порядковых чисел, количеством по общего количесвта страниц, например: [1,2,3,4,5,6,7,8,9,10]
// чтобы сформировать количество КНОПОК
export const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    return result;
}

