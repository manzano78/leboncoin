import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {inject, observer} from 'mobx-react'

@inject(
    'uiStore'
)
@observer
export default class MessageView extends Component {

    static propTypes = {
        content: PropTypes.string.isRequired,
        isPrivate: PropTypes.bool.isRequired
    };

    render(){

        const {content, isPrivate, uiStore} = this.props;

        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-6">
                    <div className="panel panel-default message">
                        {isPrivate && (
                            <div className="panel-heading">
                                <i className="fa fa-lock"/> {uiStore.getText('app.message.private_message_description')}
                            </div>
                        )}
                        <div className={classnames('panel-body', {'public-message-content': !isPrivate})}>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}