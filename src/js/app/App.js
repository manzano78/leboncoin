import React from 'react'
import Banner from './Banner'
import LoadingBar from './LoadingBar'
import AppTitle from './AppTitle'
import Aux from 'react-aux'

export const App = () => (
    <Aux>
        <AppTitle/>
        <LoadingBar/>
        <Banner/>
    </Aux>
);