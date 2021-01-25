import React, { Fragment } from 'react';
import Footer from '../common/footer';
import Header from '../common/header';
import MainNav from '../common/mainNav';
import TopNav from '../common/topNav';
import { withRouter } from "react-router-dom"

const MainLayout = (props) => {
    const { pathname } = props.location
    return (
        <Fragment>
            <div className="landing-layer">
                <div className="container">
                    <TopNav />
                    {pathname === "/" ? <Header /> : null}
                </div>
            </div>


            <MainNav />



            {props.children}



            <Footer />

        </Fragment>
    );
}

export default withRouter(MainLayout);