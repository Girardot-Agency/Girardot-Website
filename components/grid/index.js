/**
 * =Grid
************************************************************/

import Fade from "react-reveal/Fade";
import React, {Component} from "react";
import styled, {css} from "styled-components";

// External parts
import Button from "../button"
import CTA from "../cta"
import ContentWrapper from "../../components/content-wrapper";

// Mixins/theme/helpers
import {_baseUnit, _flex, _screen} from "../../assets/styles/mixins/_style";

/**
 * =Styles
******************************/

const Grid_SC = styled.section`
  ${_flex("row")}

  margin: -${_baseUnit(2.5)} 0 0 -${_baseUnit(1.25)};

  ${_screen({
    xl: css`
      margin: -${_baseUnit(2.5)} 0 0 -${_baseUnit(2.5)};
    `
  })};

  .Grid-cell {
    margin: ${_baseUnit(1.25)} 0 0 ${_baseUnit(1.25)};
    flex-basis: 100%;

    ${_screen({
      sm: css`
        flex-basis: calc(50% - ${_baseUnit(1.25)});
      `,
      md: css`
        flex-basis: calc(50% - ${_baseUnit(1.25)});
      `,
      lg: css`
        flex-basis: calc(33.3333% - ${_baseUnit(1.25)});
      `,
      xl: css`
        flex-basis: calc(33.3333% - ${_baseUnit(2.5)});
        margin: ${_baseUnit(2.5)} 0 0 ${_baseUnit(2.5)};
      `
    })};
  }
`;

/**
 * =Component
******************************/

export default class Grid extends Component {
  constructor(props) {
    super(props);

    let buttonOptions = {
      type: this.props.buttonOptions.type, // [String] "loadMore" | "viewMore"
      href: this.props.buttonOptions.href, // [String]
      align: this.props.buttonOptions.align // [String]
    };

    this.state = {
      buttonOptions: buttonOptions,
      cells: this.props.cells,
      visible: 6,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: 6
    })
  }

  loadMore() {
    this.setState((cells) => {
      return {
        visible: cells.visible + 3,
      }
    })
  }

  render() {
    return (<>
      <Grid_SC>
        {
          this.props.cells.slice(0, this.state.visible).map((cell, index) => {
            let delay = 0;
            if (index > 0) delay = index * 100;

            return (
              <div
                key={`grid-cell-${index}`}
                className="Grid-cell"
              >
                <Fade
                  bottom
                  duration={600}
                  delay={delay}
                >
                  {cell}
                </Fade>
              </div>
            );
          })
        }
      </Grid_SC>

      { this.state.buttonOptions
        && (
          <ContentWrapper>
            { this.state.buttonOptions.type == "viewMore"
              ? (
                <CTA
                  options={{
                    type: "link",
                    href: this.state.buttonOptions.href,
                    text: "View more",
                    align: this.state.buttonOptions.align
                  }}
                />
              )
              : (
                this.state.visible < this.props.cells.length
                && <Button
                  handleClick={this.loadMore.bind(this)}
                  options={{
                    type: "cta",
                    text: "Load more",
                    align: this.state.buttonOptions.align
                  }}
                />
              )
            }
          </ContentWrapper>
        )
      }
    </>);
  }
}
