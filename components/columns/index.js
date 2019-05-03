import styled, { css } from "styled-components";

import { _baseUnit, _flex, _screen } from "../../assets/styles/mixins/_style";

const Columns_Styled = styled.div`
	${ _flex("row") };

	margin-top: -${ _baseUnit(2) };
	margin-left: -${ _baseUnit(2) };

	&.Columns--oneAndTwo {
		> .Columns-col:nth-child(1) {
			${_screen({
				md: css`width: calc(33.3333% - ${ _baseUnit(2) });`
			})};
		}

		> .Columns-col:nth-child(2) {
			${_screen({
				md: css`width: calc(66.6666% - ${ _baseUnit(2) });`
			})};
		}
	}

	&.Columns--oneAndThree {

		> .Columns-col:nth-child(1) {
			${_screen({
				md: css`width: calc(25% - ${ _baseUnit(2) });`
			})};
		}

		> .Columns-col:nth-child(2) {
			${_screen({
				md: css`width: calc(75% - ${ _baseUnit(2) });`
			})};
		}
	}

	.Columns-col {
		margin-top: ${ _baseUnit(2) };
		margin-left: ${ _baseUnit(2) };
	}
`;

export default function (props = {}) {
	let {
		split = "",
		colOne = "",
		colTwo = ""
	} = props;

	return (
		<Columns_Styled className={`Columns--${ split }`}>
			<div className="Columns-col">{ colOne }</div>
			<div className="Columns-col">{ colTwo }</div>
		</Columns_Styled>
	);
}
