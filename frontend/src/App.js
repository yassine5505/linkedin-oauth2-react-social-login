import React from 'react';
import{ LinkedInApi, NodeServer } from './config';
import axios from 'axios';
import linkedInLoginImage from './linkedin-login-images/Retina/Sign-In-Small---Default.png';

export default class App extends React.Component {
  initialState = {
    user: {},
    loggedIn: false
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  componentDidMount = () => {
    if (window.opener && window.opener !== window) {
      const code = this.getCodeFromWindowURL(window.location.href);
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

  getCodeFromWindowURL = url => {
    const popupWindowURL = new URL(url);
    return popupWindowURL.searchParams.get("code");
  };

  showPopup = () => {
    const { clientId, redirectUrl, oauthUrl, scope, state } = LinkedInApi;
    const oauthUrl = `${oauthUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`;
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

  getUserCredentials = code => {
    axios
      .get(NodeServer.baseURL + NodeServer.getUserCredentials)
      .then(res => {
        const user = res.data;
        this.setState({
          user,
          loaded: true
        })
        // Do something with user
      });
  };

  render() {
    const { loggedIn, user } = this.state;
    const contentWhenLoggedIn = (
      <>
        <img src={user.profileImageURL} alt="Profile image" />
        <h3>{`${user.firstName} ${user.lastName}`}</h3>
        <h3>{user.email}</h3>
      </>
    );
    const contentWhenLoggedOut = (
        <>
          <h2>Sign in with LinkedIn</h2>
          <img src={linkedInLoginImage} alt="Sign in with LinkedIn"onClick={this.showPopup} />
        </>
    );
    return (
      <div>
        {loggedIn ? contentWhenLoggedIn : contentWhenLoggedOut}
      </div>
    )
  };
}