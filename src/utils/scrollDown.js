const scrollDown = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
  // console.log(document.documentElement.scrollHeight);
};

export default scrollDown;
