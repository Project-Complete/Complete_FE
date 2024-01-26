const ImageWrapper = ({ image }: { image: { src: string } | string }) => {
  return <img src={typeof image === 'string' ? image : image.src}></img>;
};
export default ImageWrapper;
