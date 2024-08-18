import useEmblaCarousel from 'embla-carousel-react';
import './Hero.css';
import slide2 from '../../assets/medical/images/slider/1.jpg';

const slides = [slide2];

export const HomeCarousel = () => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className='position-relative'>
      <div className='embla' ref={emblaRef}>
        <div className='embla__container'>
          {slides.map((slide, i) => {
            return (
              <div key={i} className='embla__slide'>
                <img src={slide} alt='' className='blurred-image' />
              </div>
            );
          })}
        </div>
      </div>
      <div
        className='position-absolute w-100'
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <div className='container text-white'>
          <div className='row'>
            <div className='col-12 col-md-6'>
              <h1 className='mb-0'>Elevating Research, Simplifying Data</h1>
              <p>Your Gateway to Seamless Discovery!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
