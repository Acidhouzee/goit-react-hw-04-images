import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "components/API/api";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const App = () => {
  const [formValue, setFormValue] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalImageUrl, setModalImageUrl] = useState('');

  const prevFormValueRef = useRef('');

  const handleFormSubmit = (formValue) => {
    const previousValue = prevFormValueRef.current;
    if(previousValue === formValue) {
      return;
    }
    setFormValue(formValue);
    setImages([]);
    setPage(1);
    setError(error);
  }

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleLargeImage = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setModalImageUrl('');
  };

  useEffect(() => {
    const fetchImages = async () => {

      prevFormValueRef.current = formValue;
  
      if (!formValue) return;
  
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.get(API_URL, {
          params: {
            q: formValue,
            page,
          },
        });
        if (response.data.hits.length === 0) {
          throw toast.error(`No results for "${formValue}".`);
        }
  
        setImages(prevImages => [...prevImages, ...response.data.hits]);
        setTotalPages(Math.ceil(response.data.totalHits / 15));
     
      } catch(error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [formValue, page]);


  return (
    <div>
      <Searchbar searchValue={handleFormSubmit} />

      <ImageGallery images={images} onItemClick={handleLargeImage}/>
      
      {loading && <Loader />}

      {!loading && images.length > 0 && page < totalPages && (
        <Button onClick={handleLoadMore} />
      )}

      {modalImageUrl && (
        <Modal imageUrl={modalImageUrl} onClose={handleCloseModal} />
      )}

      <ToastContainer autoClose={5000} theme="dark"/>
    </div>
  );
};
