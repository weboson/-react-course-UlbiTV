import React from 'react';

// в option, чтобы она была не активна, прописываем атрибут "disabled", либо disabled={true} - безразницы
// также для option нужны ключи key={options.value}
const MySelect = ({options, defaultValue}) => {
    return (
        <select>
            <option disabled value="">{defaultValue}</option>
            {options.map((option) => (
                <option key={option.value} value="option.value">
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default MySelect;