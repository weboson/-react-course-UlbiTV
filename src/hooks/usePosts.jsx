// перенесли логику сортировки и фильтрации
//! кастомный хук - это файл с одним или несколькими методами, которые используют стандартные хуки (useState, useMemo и т.д.)
// Каст.хук должен начинатся с "use___" - это соглашение
import { useMemo } from 'react';


//! Хук №2: (сортировка select)
// возвращает отсортированный массив постов, в зависимости от выбора в select (массив постов, текущий выбор select)
export const useSortedPosts = (posts, sort) => { // sort
    //! вкладываем старый метод внутрь каст-хука:
    // отсортированный массив постов
    const sortedPosts = useMemo(() => { 
        console.log('ОТРАБОТАЛА ФУНКЦИЯ sortedPosts из usePosts.jsx')
        if (sort) { // sort - это опция: title или body (компонент myFilter - mySelect)
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts
    }, [sort, posts]) //--зависимость [По названию / по описанию, массив постов]

    //! возвращает отсортированный массив
    return sortedPosts;
};


//! Хук №1 (поиск) - главный wrapper (обертка)
// возвращает, как отсортированный, так и отфильтрованный  (поиск) массив
export const usePosts = (posts, sort, query) => {
    // вызывает хук №1 (useSortedPosts)
    // чтобы получить массив отсортированных постов, воспользуемся нашим хуков
    const sortedPosts = useSortedPosts(posts, sort); //! вызов функции (хука) useSortedPosts

    const sortedAndSearchedPosts = useMemo(() => {
        console.log('ОТРАБОТАЛА ФУНКЦИЯ поиска usePosts из usePosts.jsx')
        return sortedPosts.filter((post) => post.title.toLowerCase().includes(query)) // Методы toLowerCase() и toUpperCase() меняют регистр символов
    }, [query, sortedPosts]) // <= зависимости: значение в поисковой  строке, отсортированный  список постов

    //! возвращает отфильтрованный массив:
    return sortedAndSearchedPosts;
}