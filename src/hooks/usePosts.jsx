// перенесли логику сортировки и фильтрации
//! кастомный хук - это цепочка методов, которые используют стандартные хуки (useState, useMemo и т.д.)
// Каст.хук должен начинатся с "use___" - это соглашение
import { useMemo } from 'react';


//! метод №2: (сортировка select)
// возращает отсортированный массив постов, в зависимости от выбора в select (массив постов, теущий выбор select)
export const useSortedPosts = (posts, sort) => {
    //! вкладываем старый метод внутрь каст-хука:
    // отсортированный массив постов
    const sortedPosts = useMemo(() => {
        console.log('ОТРАБОТАЛА ФУНКЦИЯ getSortedPosts')
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts
    }, [sort, posts]) //--зависимсоть [По названию / по описанию, массив постов]

    //! возращает отсортированный массив
    return sortedPosts;
};


//! метод №1 (поиск) - главный wrapper (обертка)
// возвращает, как отсортированный, так и отфильрованный (посик) массив
export const usePosts = (posts, sort, query) => {
    //! вызывает метод №1 useSortedPosts
    // чтобы получить массив отсортированных постов, воспользуемся нашим хуков
    const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post) => post.title.toLowerCase().includes(query)) // Методы toLowerCase() и toUpperCase() меняют регистр символов
    }, [query, sortedPosts]) // <= зависимости: значение в посковой строке, отсортерованный список постов

    //! возвращает отфильтрованный массив:
    return sortedAndSearchedPosts;
}