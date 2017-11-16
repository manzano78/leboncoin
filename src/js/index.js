import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'mobx-react'
import {useStrict} from 'mobx'
import {App} from './app/App'
import RootStore from './app/common/store/RootStore'
import {prepareDataset} from './dataset'

useStrict(true);
prepareDataset();

const rootStore = new RootStore();

ReactDOM.render(
    <Provider {...rootStore}>
        <App/>
    </Provider>,
    document.getElementById('app-root')
);

this.rootStore.messageStore.fetchMessageList();