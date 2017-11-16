import {observable, runInAction, computed, action} from 'mobx'
import BaseStore from './BaseStore'
import {stringify} from 'query-string'

export default class HttpStore extends BaseStore {

    static APPLICATION_JSON = 'application/json';

    @observable pendingRequestCount;

    constructor(rootStore){
        super(rootStore);
        this.pendingRequestCount = 0;
        this._handleResponseError = this._handleResponseError.bind(this);
    }

    @computed get isSynchronizing(){
        return this.pendingRequestCount !== 0;
    }

    async getJSON({url, params, headers}){

        return this._exchangeJSON({url, params, headers, method: 'GET'});
    }

    async postJSON({url, params, headers, body}){

        return this._exchangeJSON({url, params, headers, body, method: 'POST'});
    }

    @action async _exchangeJSON({url, method, params, body, headers = {}}){

        const finalUrl = params ? `${url}?${stringify(params)}` : url;
        const requestConfiguration = HttpStore._initializeRequestConfiguration({method, body, headers});

        this._incrementRequestCount();

        const response = await fetch(finalUrl, requestConfiguration).catch(this._handleResponseError);

        let responseBody = await response.json().catch(() => responseBody = null);

        this._decrementRequestCount();

        return {ok: response.ok, status: response.status, body: responseBody};
    }

    @action _incrementRequestCount(){

        this.pendingRequestCount++;
    }

    @action _decrementRequestCount(){

        this.pendingRequestCount--;
    }

    _handleResponseError(error){

        this._decrementRequestCount();
        throw error;
    }

    static _initializeRequestConfiguration({method, body, headers = {}}){

        const config = {
            method,
            credentials: 'same-origin',
            headers: {...headers, 'Accept': HttpStore.APPLICATION_JSON}
        };

        if(method === 'POST'){

            config.headers['Content-Type'] = HttpStore.APPLICATION_JSON;

            if(body)
                config.body = JSON.stringify(body);
        }

        return config;
    }
}