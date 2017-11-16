import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {Button} from 'react-bootstrap'

@inject(
    'messageFormStore',
    'uiStore'
)
@observer
export default class MessageFormView extends Component {

    render(){

        const {messageFormStore, uiStore} = this.props;

        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-md-10">
                        <textarea
                            rows="4"
                            id="message-form-content"
                            autoFocus={true}
                            placeholder={uiStore.getText('app.message.form.content_description')}
                            value={messageFormStore.content}
                            onChange={this.onContentChange}
                            onKeyDown={this.onContentKeyDown}
                        />
                    </div>
                    <div className="col-md-2 message-form-sending">
                        <div className="checkbox">
                            <label>
                                <input
                                    id="message-form-is-private"
                                    type="checkbox"
                                    checked={messageFormStore.isPrivate}
                                    onChange={this.onIsPrivateChange}
                                />
                                {uiStore.getText('app.message.send_privately')}
                            </label>
                        </div>
                        <div>
                            <Button
                                id="message-send-button"
                                disabled={!messageFormStore.content}
                                type="submit"
                                bsStyle="primary">

                                <i className="fa fa-envelope"/> {uiStore.getText('app.message.send')}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    onContentChange = (e) => {

        const {messageFormStore} = this.props;

        messageFormStore.setContent(e.target.value);
    };

    onContentKeyDown = (e) => {

        if(e.keyCode === 13 && !e.ctrlKey)
            this.onSubmit(e);
    };

    onIsPrivateChange = (e) => {

        const {messageFormStore} = this.props;

        messageFormStore.setIsPrivate(e.target.checked);
    };

    onSubmit = (e) => {

        e.preventDefault();

        const {messageFormStore} = this.props;

        return messageFormStore.submit();
    }
}