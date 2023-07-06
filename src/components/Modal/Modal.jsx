import React, { useState, useEffect } from 'react';
import { Loader } from "components/Loader/Loader";

export const Modal = ( {imageUrl, onClose} ) => {

    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    const handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.code === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose])

    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {loading && <Loader />}
                <img src={imageUrl} alt="" onLoad={handleImageLoad} />
            </div>
        </div>
    );
}
