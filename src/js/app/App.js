import React from 'react'
import Banner from './Banner'
import LoadingBar from './LoadingBar'
import AppTitle from './AppTitle'
import MessageListView from './message/list/MessageListView'
import MessageFormView from './message/form/MessageFormView'
import Aux from 'react-aux'

export const App = () => (
    <Aux>
        <AppTitle/>
        <LoadingBar/>
        <Banner/>
        <div id="content">
            <MessageListView/>
            <MessageFormView/>
        </div>
    </Aux>
);