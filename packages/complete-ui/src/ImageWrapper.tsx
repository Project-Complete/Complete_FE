const ImageWrapper = ({ image }: { image: { src: string } | string }) => {
  console.log(image);
  return <img src={typeof image === 'string' ? image : image.src}></img>;
};
export default ImageWrapper;
