import BaseStore from '../../common/store/BaseStore'
import {observable, action} from 'mobx'

export default class MessageListStore extends BaseStore {

    @observable messageList;

    constructor(rootStore){
        super(rootStore);
        this.messageList = [];
    }

    @action setMessageList(messageList) {
        this.messageList = messageList;
    }

    async fetchMessageList(){

        const {body: messageList} = await this.rootStore.httpStore.getJSON({
            url: '/api/message/list'
        });

        this.setMessageList(messageList);
    }
}