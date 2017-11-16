import {Component} from 'react'
import ReactDOM from 'react-dom'
import {inject, observer} from 'mobx-react'

@inject('uiStore')
@observer
export default class AppTitle extends Component {

    render(){

        const {uiStore} = this.props;
        const appTitle = uiStore.getText('app.title');

        return ReactDOM.createPortal(appTitle, document.getElementById('app-title'));
    }
}