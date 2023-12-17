import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrapper } from './App.styled';
import { toast } from 'react-toastify';
import { Searchbar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { fetchGallery } from 'Api/FetchGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (!searchQuery) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await fetchGallery(searchQuery, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setPage(prevPage => prevPage + 1);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  const showModal = largeImageURL => {
    setIsShowModal(true);
    setModalImage(largeImageURL);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };
  const onFindMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  return (
    <Wrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <Loader />}
      {images && <ImageGallery showModal={showModal} img={images} />}
      {!loading && images.length % 15 && <Button onFindMore={onFindMore} />}
      {isShowModal && <Modal closeModal={closeModal} modalImage={modalImage} />}
      <ToastContainer autoClose={3000} theme="colored" />
    </Wrapper>
  );
}
