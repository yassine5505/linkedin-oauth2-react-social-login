import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        window.addEventListener('message', this.handlePostMessage);
    };

    handlePostMessage = event => {
        if (event.data.type === 'code') {
          const { code } = event.data;
          this.loginWithLinkedin(code);
        }
    };

    getUserCredentials = code => {
        
    }

    showPopup = () => {
        const clientId = LinkedInApi.clientId;
        const redirectUrl = LinkedInApi.redirectUrl;
        const oauthUrl = `${LinkedInApi.oauthUrl}&client_id=${clientId}&scope=${LinkedInApi.scope}&state=123456&redirect_uri=${redirectUrl}`;
        const width = 450,
          height = 730,
          left = window.screen.width / 2 - width / 2,
          top = window.screen.height / 2 - height / 2;
        window.open(
          oauthUrl,
          'Linkedin',
          'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' +
          width +
          ', height=' +
          height +
          ', top=' +
          top +
          ', left=' +
          left
        );
    };

    render() {
        return (
            <div>
                <h2>Sign in with LinkedIn</h2>
                <button onClick={this.showPopup}></button>
            </div>
        )
    };
}