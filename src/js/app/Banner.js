import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {Button} from 'react-bootstrap'

@inject('uiStore')
@observer
export default class Banner extends Component {

    render(){

        const {uiStore} = this.props;

        return (
            <nav id="banner" className="navbar navbar-fixed-top">

                <ul className="nav navbar-nav navbar-right" style={{paddingRight: 12}}>
                    {uiStore.availableLanguages.map(({languageKey, languageLabel}, i) => (
                        <li key={languageKey}>
                            {i !== 0 && (
                                <span>&#124;</span>
                            )}
                            <Button
                                disabled={languageKey === uiStore.currentLanguage}
                                bsStyle="link"
                                onClick={() => uiStore.setCurrentLanguage(languageKey)}>
                                {languageLabel}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}