import css from './SearchBox.module.css';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBox() {
const [inputValue, setInputValue] = useState("");
const handleInputChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        },
        1000
      );

    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            defaultValue={inputValue}
            onChange={handleInputChange}
        />
    );
}