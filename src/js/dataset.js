import fetchMock from 'fetch-mock'
import {generate} from 'shortid'

const messages = [
    {
        content: "Bonjour, je m'appelle Mikaël!",
        isPrivate: false
    },
    {
        content: "Enchanté Mikaël, moi c'est Susan!",
        isPrivate: false
    },
    {
        content: "Enchanté de même!",
        isPrivate: true
    }
];

export const prepareDataset = () => {

    fetchMock('/api/message/list', {
        status: 200,
        body: messages
    });

    fetchMock('/api/message/post', () => ({
        status: 200,
        body: {
            messageId: generate()
        }
    }));
};