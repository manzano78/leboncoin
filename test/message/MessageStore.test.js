import 'raf/polyfill'
import 'babel-polyfill'
import 'isomorphic-fetch'
import RootStore from '../../src/js/app/common/store/RootStore'
import fetchMock from 'fetch-mock'
import {toJS} from 'mobx'

let messageStore;

beforeEach(() => {

    const rootStore = new RootStore();

    messageStore = rootStore.messageStore;
});

afterEach(() => {

    fetchMock.restore();
});

describe('Message Store UT', () => {

    it('Should correctly fetch messages from server', async () => {

        const messagesReceivedFromServer = [
            {id: 1, content: 'Content 1', isPrivate: true},
            {id: 2, content: 'Content 2', isPrivate: false}
        ];

        fetchMock.mock('/api/message/list', {
            status: 200,
            body: messagesReceivedFromServer
        });

        await messageStore.fetchMessageList();

        const messageList = toJS(messageStore.messageList);

        expect(messageList).toEqual(messagesReceivedFromServer);
    });

    it('Should correctly post a new message to the server', async () => {

        const newMessageId = 1;
        const newMessageContent = 'Hello world!';
        const newMessageIsPrivate = true;

        messageStore.setNewMessageContent(newMessageContent);
        messageStore.setNewMessageIsPrivate(newMessageIsPrivate);

        fetchMock.mock('/api/message/post', {
            status: 200,
            body: {messageId: newMessageId}
        });

        await messageStore.submitNewMessage();

        const messageList = toJS(messageStore.messageList);

        expect(messageList).toEqual([{
            id: newMessageId,
            content: newMessageContent,
            isPrivate: newMessageIsPrivate
        }]);

        expect(messageStore.newMessageContent).toEqual('');
    });

    it('Should correctly set properties', () => {

        const messageList = [{content: 'Content', isPrivate: false}];
        const newMessageContent = 'Hello world!';
        const newMessageIsPrivate = true;

        messageStore.setMessageList(messageList);
        messageStore.setNewMessageContent(newMessageContent);
        messageStore.setNewMessageIsPrivate(newMessageIsPrivate);

        expect(toJS(messageStore.messageList)).toEqual(messageList);
        expect(messageStore.newMessageContent).toEqual(newMessageContent);
        expect(messageStore.newMessageIsPrivate).toEqual(newMessageIsPrivate);
    });
});