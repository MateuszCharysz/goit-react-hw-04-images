export const scrollAfterLoad = height => {
  window.scrollBy({
    top: height,
    behavior: 'smooth',
  });
  console.log('why it does not work?'); //TODO do usunięcia consol log
};
