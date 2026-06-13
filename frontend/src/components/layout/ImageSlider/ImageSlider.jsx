import Carousel from 'react-bootstrap/Carousel';

function ImageSlider() {
    return (
        <Carousel indicators={false}>
            <Carousel.Item interval={1000}>
                <img
                    className='d-block w-100'
                    src='https://s3.hcm-1.cloud.cmctelecom.vn/bannick/photos/shares/02_banner_game/nickmt/logo-shop-ngoc-rong-mt-gaming.jpg'
                    alt='First slide'
                />
            </Carousel.Item>

            <Carousel.Item interval={500}>
                <img
                    className='d-block w-100'
                    src='https://s3.hcm-1.cloud.cmctelecom.vn/bannick/photos/shares/02_banner_game/nickmt/logo-shop-ngoc-rong-mt-gaming.jpg'
                    alt='Second slide'
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className='d-block w-100'
                    src='https://s3.hcm-1.cloud.cmctelecom.vn/bannick/photos/shares/02_banner_game/nickmt/logo-shop-ngoc-rong-mt-gaming.jpg'
                    alt='Third slide'
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default ImageSlider;
