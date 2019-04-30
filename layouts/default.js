import PropTypes from "prop-types"
import React, {Component} from "react"

import Div100vh from "react-div-100vh";
import styled from "styled-components";

import Footer from "../components/footer";

/**
 * =DefaultLayout
************************************************************/

const DefaultLayout_SC = styled(Div100vh)`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

class DefaultLayout extends Component {
  static pageTransitionDelayEnter = true;

  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount () {
    this.timeoutId = setTimeout(() => {
      this.props.pageTransitionReadyToEnter();
      this.setState({ loaded: true });
    }, 100);
  }

  componentWillUnmount () {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  render () {
    // if (!this.state.loaded) return null;
    return (
      <DefaultLayout_SC style={{minHeight: "100rvh"}}>
        <main>
          {this.props.children}
        </main>
        <Footer />
      </DefaultLayout_SC>
    );
  }
}

DefaultLayout.propTypes = {
  pageTransitionReadyToEnter: PropTypes.func
}

DefaultLayout.defaultProps = {
  pageTransitionReadyToEnter: () => {}
}

export default DefaultLayout;
