import SearchBar from '../Searchbar/Searchbar';
import React, { useEffect, useState } from 'react';

import { fetchData } from 'service/api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import Button from 'components/Button/Button';
import css from './App.module.css';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchImg = async () => {
      setLoading(true);
      try {
        const { hits, totalHits } = await fetchData(query, page);
        if (hits.length === 0) {
          return toast.info('Sorry, image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        setImages(prevState => [...prevState, ...hits]);

        setShowLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImg();
  }, [query, page]);

  const onModalOpen = data => {
    setModalIsOpen(true);
    setModalImg(data);
  };

  const onModalClose = () => {
    setModalIsOpen(false);
    setModalImg('');
  };

  const handleSubmitSearch = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setShowLoadMore(false);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <ToastContainer transition={Slide} />
      <SearchBar onSubmit={handleSubmitSearch} />
      {loading && <Loader />}
      <ImageGallery images={images} onModalOpen={onModalOpen} />
      {showLoadMore && <Button onLoadMore={onLoadMore} />}
      {modalIsOpen && (
        <Modal largeImageURL={modalImg} onModalClose={onModalClose} />
      )}
    </div>
  );
}
