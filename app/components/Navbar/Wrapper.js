import styled from 'styled-components';

const Wrapper = styled.nav`
  background: #fafbfc;
  box-shadow: 0 10px 35px rgba(4, 9, 20, 0.04),
    -18px -30px 23px rgba(4, 9, 20, 0.04), 0 1px 8px rgba(4, 9, 20, 0.06),
    0 2px 2px rgba(4, 9, 20, 0.04);
  height: 60px;

  .navbar-right {
    float: right;
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
`;

export default Wrapper;
