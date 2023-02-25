import React,{useState} from "react"

import Logo from "./logo"
import Header from "./header"
import Posts from "./posts"

import '../style/style.css'

const Home = () => {



    return(

        <>
            <Logo/>

            <div className='bodyContainer'>
                <Header/>
                <Posts/>
            </div>
        </>
    )
}

export default Home;