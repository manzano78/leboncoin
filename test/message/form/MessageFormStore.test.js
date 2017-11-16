import 'raf/polyfill'
import 'babel-polyfill'
import 'isomorphic-fetch'
import {toJS} from 'mobx'
import RootStore from '../../../src/js/app/common/store/RootStore'
import fetchMock from 'fetch-mock'

let messageFormStore;

beforeEach(() => {

    const rootStore = new RootStore();

    messageFormStore = rootStore.messageFormStore;
});

afterEach(() => {

    fetchMock.restore();
});

describe('Message Form Store Unit Tests', () => {

    it('Should correctly post a new message to the server', async () => {

        const id = 1;
        const content = 'Hello world!';
        const isPrivate = true;

        const expectedMessage = {id, content, isPrivate};

        messageFormStore.setContent(content);
        messageFormStore.setIsPrivate(isPrivate);

        fetchMock.mock('/api/message/post', {
            status: 200,
            body: {messageId: id}
        });

        await messageFormStore.submit();

        expect(toJS(messageFormStore.rootStore.messageListStore.messageList)).toEqual([expectedMessage]);

        expect(messageFormStore.content).toEqual('');
    });

    it('Should correctly get and set form fields', () => {

        const content = 'Hello world!';
        const isPrivate = true;

        messageFormStore.setContent(content);
        messageFormStore.setIsPrivate(isPrivate);

        expect(messageFormStore.content).toEqual(content);
        expect(messageFormStore.isPrivate).toEqual(isPrivate);
    });
});