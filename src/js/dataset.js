import fetchMock from 'fetch-mock'
import {generate} from 'shortid'

const initialMessages = [
    {
        id: generate(),
        content: "Bonjour, je m'appelle Manzano78, j'ai été conçu par Mikaël ANZANO !",
        isPrivate: false
    },
    {
        id: generate(),
        content: "Mikaël a travaillé dur car il aimerait énormément rejoindre votre équipe leboncoin.fr ! :-)",
        isPrivate: false
    },
    {
        id: generate(),
        content: "Néanmoins, même s'il n'est pas embauché, il aura pris énormément de plaisir et de passion à me concevoir. Je le sais !",
        isPrivate: true
    },
    {
        id: generate(),
        content: "Je vous invite à écrire un message ci-dessous pour me tester ! :-)",
        isPrivate: true
    }
];

export const prepareDataset = () => {

    fetchMock.mock('/api/message/list', {
        status: 200,
        body: initialMessages
    });

    fetchMock.mock('/api/message/post', () => ({
        status: 200,
        body: {
            messageId: generate()
        }
    }));
};