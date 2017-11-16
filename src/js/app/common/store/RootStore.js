import UiStore from './UiStore'
import HttpStore from './HttpStore'
import MessageFormStore from '../../message/form/MessageFormStore'
import MessageListStore from '../../message/list/MessageListStore'

export default class RootStore {

    constructor(){
        this.uiStore = new UiStore(this);
        this.httpStore = new HttpStore(this);
        this.messageFormStore = new MessageFormStore(this);
        this.messageListStore = new MessageListStore(this);
    }
}