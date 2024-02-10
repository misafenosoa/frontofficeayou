// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const Caroussel = ({ images }) => {
//     const settings = {
//         infinite: true,
//         dots: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         lazyLoad: true,
//         autoplay: true,
//         autoplaySpeed: 2000,
//     };

//     return (
//         <>
//             <div className="tag">
//                 <h1>Image Gallery</h1>
//             </div>
//             <div className="imgslider">
//                 {images && images.length > 0 ? (
//                     <Slider {...settings}>
//                         {images.map((imageUrl, index) => (
//                             <div key={index}>
//                                 <img src={imageUrl} alt={`Image ${index + 1}`} />
//                             </div>
//                         ))}
//                     </Slider>
//                 ) : (
//                     <img className="img-fluid" src={"images/product/product@3x.jpg"} alt="Products" />
//                 )}
//             </div>
//         </>
//     );
// };

// export default Caroussel;
