
import '../styles/Main2.css'
import mainImg from '../images/main.png'
import Navbar from './Navbar';

const backgroundStyle = {
    width: '100%',
    height: '100vh', // 100% of the viewport height
    backgroundImage: {mainImg}, // Set your image URL here
    backgroundSize: 'contain',  // Ensures the full image is visible
    backgroundRepeat: 'no-repeat',  // Prevents repeating
    backgroundPosition: 'center',   // Centers the image
  };
const Main2=()=>{
    return (
        <div className="main2">
            <div className='imageHolder'>
                <img src={mainImg}/>
            </div>
            <Navbar/>
            <div className='title-bold startTest'>
                <h4>YOUR GAZE IS AN</h4>
                <h4 className='blue'>AMMANAH</h4>
            </div>
            
        </div>
    )
}

export default Main2