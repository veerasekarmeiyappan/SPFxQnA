import * as React from 'react';
import * as strings from 'SpfxQnAApplicationCustomizerStrings';
import styles from './FooterChat.module.scss';
import { IFooterChatProps, IFooterChatState } from './IFooterChatProps';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

export default class FooterChat extends React.Component<IFooterChatProps, IFooterChatState> {
    constructor(props: IFooterChatProps, state: IFooterChatState) {
        super(props);

        this.state = {
            items: []
        };
    }

    public componentDidMount():void {
        addResponseMessage("Welcome to this awesome chat!");
    }
    private _handleNewUserMessage = (newMessage) => {
        this.props.cognitiveService.getQnaAnswer(newMessage).then((answer) => {
            addResponseMessage(answer.toString());
        });
    }

    public render() {
        return (
            <div className={styles.FooterChat}>
                <Widget
                    handleNewUserMessage={this._handleNewUserMessage}                    
                    title={strings.ChatTitle}
                    subtitle={strings.ChatSubtitle}
                />
            </div>
        );
    }
}