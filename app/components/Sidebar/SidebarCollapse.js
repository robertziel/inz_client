import styled from 'styled-components';
import { Collapse } from 'reactstrap';

export default styled(Collapse)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 260px;
  background: #fff;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  transition: left 200ms ease-out;

  .evaporating {
    transition: opacity 200ms ease-out;
  }

  &:not(.show):not(:hover) {
    left: -200px;

    .evaporating {
      opacity: 0;
    }

    .sidebarlink-icon {
      padding-left: 10px;
      padding-top: 5px;

      .fa {
        font-size: 30px;
      }
    }

    .sidebar-collapse-link {
      .line {
        transition-delay: 200ms;
        transition: left 300ms linear;
        left: 200px;
      }
    }
  }
`;