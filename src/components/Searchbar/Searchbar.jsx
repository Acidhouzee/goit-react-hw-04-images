import React, { useState } from "react";
import { toast } from 'react-toastify';

export const Searchbar = ( {searchValue} ) => {
    const [formValue, setFormValue] = useState('');

    const handleFindImages = evt => {
        setFormValue(evt.target.value.toLowerCase());
    }

    const hendleSubmit = evt => {
        evt.preventDefault();

        if(formValue.trim() === '') {
            toast.error('Write key word for search images!')
            return;
        }

        searchValue(formValue);

        reset();
    }

    const reset = () => {
        setFormValue('');
    }

    return(
        <header className="searchbar">
            <form onSubmit={hendleSubmit} className="form">
                <button type="submit" className="button">
                    <span className="button-label">Search</span>
                </button>

                <input
                    className="input"
                    type="text"
                    value={formValue}
                    placeholder="Search images and photos"
                    onChange={handleFindImages}
                />
            </form>
        </header>
    );
}
