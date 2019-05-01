import styled, { css } from "styled-components";

import { _baseUnit, _screen } from "../../assets/styles/mixins/_style";

const Map_Styled = styled.div`
	position: relative;
	width: 100%;
	height: 450px;

	${_screen({
		md: css`height: 600px;`
	})}

	.Map-embed {
		position: absolute;
		top: 0;
		left: 0;
	}
`;

export default function(props = {}) {
	let {
		mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.9444254639275!2d-0.13927068416581528!3d51.49588731936576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604de5acb7d69%3A0x58c628f77af08643!2sGirardot!5e0!3m2!1sen!2suk!4v1556702113497!5m2!1sen!2suk"
	} = props;

	return (
		<Map_Styled>
			<iframe
				className="Map-embed"
				src={mapSrc}
				width="100%"
				height="100%"
				frameborder="0"
				style={{border: "0"}}
				allowfullscreen
			/>
		</Map_Styled>
	);
}
