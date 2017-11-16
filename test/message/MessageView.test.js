import 'raf/polyfill'
import 'babel-polyfill'
import 'isomorphic-fetch'
import React from 'react'
import RootStore from '../../src/js/app/common/store/RootStore'
import Enzyme, {mount} from 'enzyme'
import fetchMock from 'fetch-mock'
import {Provider} from 'mobx-react'
import Adapter from 'enzyme-adapter-react-16';
import MessageListView from '../../src/js/app/message/list/MessageListView'
import MessageFormView from '../../src/js/app/message/form/MessageFormView'

Enzyme.configure({ adapter: new Adapter() });

let rootStore;

beforeEach(() => {

    rootStore = new RootStore();
});

afterEach(() => {

    fetchMock.restore();
});

describe('Messaging View', () => {

    it('Should correctly display message list', () => {

        const {messageListStore} = rootStore;

        messageListStore.setMessageList([
            {
                id: 1,
                content: 'Message 1',
                isPrivate: true
            },
            {
                id: 2,
                content: 'Message 2',
                isPrivate: false
            }
        ]);

        const messageListView = mount(
            <Provider {...rootStore}>
                <MessageListView/>
            </Provider>
        );

        expect(messageListView.find('.message').length).toEqual(2);

        expect(messageListView.find('.message .panel-body').at(0).text()).toEqual('Message 1');
        expect(messageListView.find('.message .panel-body').at(1).text()).toEqual('Message 2');

        expect(messageListView.find('.message').at(0).find('.panel-heading').length).toEqual(1);
        expect(messageListView.find('.message').at(1).find('.panel-heading').length).toEqual(0);
    });

    it('Should correctly update store fields when user types inputs', () => {

        const {messageFormStore} = rootStore;

        messageFormStore.setContent = jest.fn();
        messageFormStore.setIsPrivate = jest.fn();

        const messageListView = mount(
            <Provider {...rootStore}>
                <MessageFormView/>
            </Provider>
        );

        messageListView.find('#message-form-content').simulate('change', {target: {value: 'Hello'}});
        messageListView.find('#message-form-is-private').simulate('change', {target: {checked: true}});

        expect(messageFormStore.setContent).toHaveBeenCalledWith('Hello');
        expect(messageFormStore.setIsPrivate).toHaveBeenCalledWith(true);
    });

    it('Should correctly submit form when user sends a new message', async () => {

        const {messageFormStore} = rootStore;

        const messagingView = mount(
            <Provider {...rootStore}>
                <div>
                    <MessageListView/>
                    <MessageFormView/>
                </div>
            </Provider>
        );

        fetchMock.mock('/api/message/post', () => ({
            status: 200,
            body: {
                messageId: 1
            }
        }));

        messageFormStore.submit = jest.fn();

        messagingView.find('#message-form-content').simulate('change', {target: {value: 'Hello'}});
        messagingView.find('#message-form-is-private').simulate('change', {target: {checked: true}});

        messagingView.find('button[type="submit"]').simulate('submit');

        expect(messageFormStore.submit).toHaveBeenCalled();
    });
});