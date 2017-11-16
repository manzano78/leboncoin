import 'raf/polyfill'
import 'babel-polyfill'
import 'isomorphic-fetch'
import RootStore from '../../../src/js/app/common/store/RootStore'
import fetchMock from 'fetch-mock'
import {toJS} from 'mobx'

let messageListStore;

beforeEach(() => {

    const rootStore = new RootStore();

    messageListStore = rootStore.messageListStore;
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

        await messageListStore.fetchMessageList();

        const messageList = toJS(messageListStore.messageList);

        expect(messageList).toEqual(messagesReceivedFromServer);
    });

    it('Should correctly set properties', () => {

        const messageList = [{content: 'Content', isPrivate: false}];

        messageListStore.setMessageList(messageList);

        expect(toJS(messageListStore.messageList)).toEqual(messageList);
    });
});