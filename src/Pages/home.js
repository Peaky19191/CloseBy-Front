import React from 'react';
import Header from '../Components/Home/Header/Header';
import InfoSteps from '../Components/Home/Landpage/InfoSteps/InfoSteps';


export const Home = () => {
    return (
        <div >
            {/* <Button component={Link} to="/login" > */}
            <Header />
            <InfoSteps />
            {/* </Button> */}

        </div>

    )
}

export default Home;