// import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import Searchbar from './searchbar/Searchbar';
import Button from './button/Button';
import ImageGallery from './imageGallery/ImageGallery';
import { apiUrl } from './js/api-url';
import { pixabayApiLuncher } from './js/pixabay-api-luncher';
import { ThreeDots } from 'react-loader-spinner'; //TODO fix spinner to be visible
import { scrollAfterLoad } from './js/scroll-after-load';

export const App = () => {
  //TODO zmiana na funkcyjny (useState i useEfect)
  const [querry, setQuerry] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [isLoading, setIsLoading] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);

  const refPage = useRef(page);
  const refQuerry = useRef(querry);

  // const apiUrlState = async () => {
  //   setIsLoading(true);
  //   if (page === 1) {
  //     try {
  //       const answer = await pixabayApiLuncher(apiUrl(querry, page, perPage));
  //       setPictures(answer.data.hits);
  //     } catch (er) {
  //       setError(er);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   } else {
  //     try {
  //       const answer = await pixabayApiLuncher(apiUrl(querry, page, perPage));
  //       setPictures(prevState => {
  //         console.log(prevState);
  //         console.log(answer.data.hits);
  //         return [...prevState, ...answer.data.hits]
  //       });
  //     } catch (er) {
  //       setError(er);
  //     } finally {
  //       setIsLoading(false);
  //       if (page > 1) {
  //         scrollAfterLoad(520);
  //       }
  //     }
  //   }
  // };

  const submitHandlerSearch = value => {
    setQuerry(value);
    setPage(1);
  };

  const pageHandlerBtn = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (refQuerry !== querry || refPage !== page) {
      const apiUrlState = async () => {
        setIsLoading(true);
        if (page === 1) {
          try {
            const answer = await pixabayApiLuncher(
              apiUrl(querry, page, perPage),
            );
            setPictures(answer.data.hits);
          } catch (er) {
            setError(er);
          } finally {
            setIsLoading(false);
          }
        } else {
          try {
            const answer = await pixabayApiLuncher(
              apiUrl(querry, page, perPage),
            );
            setPictures(prevState => {
              console.log(prevState);
              console.log(answer.data.hits);
              return [...prevState, ...answer.data.hits];
            });
          } catch (er) {
            setError(er);
          } finally {
            setIsLoading(false);
            if (page > 1) {
              scrollAfterLoad(520);
            }
          }
        }
        // apiUrlState();
      };
    apiUrlState()}
  }, [querry, page]); // TODO zrobić useRef, włożyć w hook?
  // apiUrlState();
  return (
    <>
      <Searchbar onSubmit={submitHandlerSearch} />
      {isLoading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#2a6ccf"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
      {error !== null && <p>Wystąpił błąd: {error}</p>}
      {pictures.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ImageGallery data={pictures} />
          <Button pagehandler={pageHandlerBtn} />
        </div>
      )}
    </>
  );
};
// async componentDidUpdate(prevProps, prevState) {
//   if (
//     prevState.querry !== this.state.querry ||
//     prevState.page !== this.state.page
//   )

//  [...prevState, ...answer.data.hits];
