import React from 'react'
import useLanguage from '../../util/hooks/useLanguage'
import Page from '../Page'

const ChatPage = () => {

    const getString = useLanguage();

    return (
        <Page title={getString("chats")}>
            
        </Page>
    )
}

export default ChatPage
