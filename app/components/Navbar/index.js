import React from 'react';

import FontAwesome from 'react-fontawesome';
import LanguageToggle from 'components/LanguageToggle/index';
import SignOutSignInButton from 'components/SignOutSignInButton/index';
import { Button } from 'components/_ui-elements';
import { Link } from "react-router-dom";

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
      <div className="navbar-right">
        <Link to="/"><Button navbar><FontAwesome name="home" /></Button></Link>
      </div>
      <div className="navbar-right">
        <Link to="/profile"><Button navbar><FontAwesome name="user" /></Button></Link>
      </div>
    </Wrapper>
  );
}

export default Navbar;
