import React from 'react';

// в option, чтобы она была не активна, прописываем атрибут "disabled", либо disabled={true} - без разницы
// также для option нужны ключи key={options.value}
//! onChange - обработчик
const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select 
            value={value} // select.value – значение выбранного в данный момент <option>
            onChange = {event => onChange(event.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {options.map((option) => 
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
            
        </select>
    );
};

export default MySelect;