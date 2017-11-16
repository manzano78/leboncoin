import BaseStore from '../../common/store/BaseStore'
import {observable, action, runInAction} from 'mobx'

export default class MessageFormStore extends BaseStore {

    @observable content;
    @observable isPrivate;

    constructor(rootStore){
        super(rootStore);
        this.content = '';
        this.isPrivate = false;
    }

    @action setContent(content) {
        this.content = content;
    }

    @action setIsPrivate(isPrivate) {
        this.isPrivate = isPrivate;
    }

    async submit(){

        const message = {content: this.content, isPrivate: this.isPrivate};

        const submitResponse = await this.rootStore.httpStore.postJSON({
            url: '/api/message/post',
            body: message
        });

        if(submitResponse.ok){

            const {messageId} = submitResponse.body;

            runInAction(() => this.rootStore.messageListStore.messageList.push({id: messageId, ...message}));

            this.setContent('');
        }
    }
}