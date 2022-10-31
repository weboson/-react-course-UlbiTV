import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            {/*//! ПОИСК */}
            {/*  переиспользуя компонент MyInput */}
            <MyInput
                value={filter.query}
                //! const [filter, setFilter] = useState({sort: '', query: ''})
                
                // filter == {sort: '', query: ''}  
                // дублирующий последний ключ заменяет предыдущий (кругл. скобки, чтобы не было синтакс. ошибки): ({{a: ''}, a: 'new value'}) - станет:  {a:'new value'}
                onChange={(event) => { setFilter({...filter, query: event.target.value})}}
                //вариант по проще: sort: filter.sort
                //onChange={(event) => { setFilter({sort: filter.sort, query: event.target.value}); console.log(filter)}}
                placeholder="Поиск..."
            />
            <MySelect
                value={filter.sort}
                onChange={(event) => {setFilter({...filter, sort: event})}}
                defaultValue="Cортировка: "
                options={[
                    { value: "title", name: "По названию" },
                    { value: "body", name: "По описанию" }
                ]}
            />
        </div>
    );
};

export default PostFilter;
