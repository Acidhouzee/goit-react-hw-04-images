import React from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ( { images, onItemClick } ) => {
    return(
        <ul className="gallery">
            {images.map(image => (
                <ImageGalleryItem
                    key={image.id}
                    image={image}
                    onItemClick={onItemClick}
                />
            ))}
        </ul>
    );
}
