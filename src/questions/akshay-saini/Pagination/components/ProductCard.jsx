export const ProductCard = ({ image, title }) => {
  return (
    <div className='product-card'>
      <img src={image} alt={title} className='product-img' />
      <p>{title}</p>
    </div>
  );
};