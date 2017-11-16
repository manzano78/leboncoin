import BaseStore from '../common/store/BaseStore'
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

        const {body: messageList} = await this.rootStore.httpStore.getJSON({
            url: '/api/message/list'
        });

        this.setMessageList(messageList);
    }

    async submitNewMessage(){

        const newMessage = {
            content: this.newMessageContent,
            isPrivate: this.newMessageIsPrivate
        };

        const submitResponse = await this.rootStore.httpStore.postJSON({
            url: '/api/message/post',
            body: newMessage
        });

        if(submitResponse.ok){

            const {messageId} = submitResponse.body;

            this.messageList.push({id: messageId, ...newMessage});
            this.setNewMessageContent('');
        }
    }
}