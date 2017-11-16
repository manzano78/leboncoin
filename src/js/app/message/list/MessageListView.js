import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import MessageView from "./MessageView";

@inject(
    'messageListStore'
)
@observer
export default class MessageListView extends Component {

    render(){

        const {messageListStore} = this.props;

        return (
            <div className="row messages">
                {messageListStore.messageList.map(message => (
                    <MessageView
                        key={message.id}
                        content={message.content}
                        isPrivate={message.isPrivate}
                    />
                ))}
            </div>
        )
    }
}