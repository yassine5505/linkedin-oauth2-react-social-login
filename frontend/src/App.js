import React from 'react';
import{ LinkedInApi, NodeServer } from './config';
import axios from 'axios';

export default class App extends React.Component {

    componentDidMount = () => {
      if (window.opener && window.opener !== window) {
        const code = getCode(window.location.href);
        window.opener.postMessage({'type': 'code', 'code': code}, '*')
        window.close();
      }
        window.addEventListener('message', this.handlePostMessage);
    };

    handlePostMessage = event => {
        if (event.data.type === 'code') {
          const { code } = event.data;
          this.getUserCredentials(code);
        }
    };

    getUserCredentials = code => {
      axios
        .get(NodeServer.baseURL + NodeServer.getUserCredentials)
        .then(res => {
            // Do something with data
            console.log(res.data);
        })
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

    getCode = url => {
      const popupWindowURL = new URL(url);
      return popupWindowURL.searchParams.get("code");
  }

    render() {
        return (
            <div>
                <h2>Sign in with LinkedIn</h2>
                <button onClick={this.showPopup}>Sign</button>
            </div>
        )
    };
}