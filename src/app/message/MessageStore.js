import BaseStore from '../common/store/RootStore'
import {observable, action, runInAction} from 'mobx'

export default class MessageStore extends BaseStore {

    @observable messageList;
    @observable newMessageContent;
    @observable newMessageIsPrivate;

    constructor(rootStore){
        super(rootStore);
        this.messageList = [];
        this.newMessageContent = '';
        this.newMessageIsPrivate = false;
    }

    @action setMessageList(messageList) {
        this.messageList = messageList;
    }

    @action setNewMessageContent(newMessageContent) {
        this.newMessageContent = newMessageContent;
    }

    @action setNewMessageIsPrivate(newMessageIsPrivate) {
        this.newMessageIsPrivate = newMessageIsPrivate;
    }

    async fetchMessageList(){

        const messageList = await this.rootStore.httpStore.getJSON({
            url: '/message/list'
        });

        this.setMessageList(messageList);
    }

    async submitNewMessage(){

        const newMessage = {
            content: this.newMessageContent,
            isPrivate: this.newMessageIsPrivate
        };

        await this.rootStore.httpStore.postJSON({
            url: '/message/post',
            body: newMessage
        });

        this.messageList.push(newMessage);
        this.setNewMessageContent('');
    }
}