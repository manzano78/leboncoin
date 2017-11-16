import UiStore from './UiStore'
import HttpStore from './HttpStore'
import MessageStore from '../../message/MessageStore'

export default class RootStore {

    constructor(){
        this.uiStore = new UiStore(this);
        this.httpStore = new HttpStore(this);
        this.messageStore = new MessageStore(this);
    }
}