import React from 'react';

import LanguageToggle from 'components/LanguageToggle/index';
import SignOutSignInButton from 'components/SignOutSignInButton/index';

import Wrapper from './Wrapper';

function Navbar() {
  return (
    <Wrapper>
      <div className="navbar-right">
        <SignOutSignInButton />
      </div>
      <div className="navbar-right">
        <LanguageToggle />
      </div>
    </Wrapper>
  );
}

export default Navbar;
