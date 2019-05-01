/**
 * =Contact
 ************************************************************/

import { withRouter } from "next/router";
import React, { Component } from "react";
import NetlifyForm from "react-netlify-form";
import styled from "styled-components";

import DefaultLayout from "../layouts/default";

import Button from "../components/button";
import Copy from "../components/copy";
import ContentWrapper from "../components/content-wrapper";
import Head from "../components/head";
import Map from "../components/map";
import SectionTitle from "../components/section-title";

import { COL, TYPE } from "../assets/styles/theme/_style";
import { _baseUnit, _flex } from "../assets/styles/mixins/_style";

/**
 * =Form
 ************************************************************/

const ContactForm_Styled = styled.div`
	border-top: 2px solid ${COL.grey_light};
	margin: ${_baseUnit(2.5)} auto 0;
	padding-top: ${_baseUnit(2.5)};
	width: 100%;
		max-width: ${_baseUnit(40)};

	.Form-title {
		color: ${COL.brand_main_base};
		font-size: ${TYPE.scale.md};
		margin-bottom: ${_baseUnit(2)};
	}

	.Form-row {
		margin-top: ${_baseUnit()};
	}

	.Form-message {
		color: ${COL.grey_base};
		margin-bottom: ${_baseUnit(2)};
	}

	label,
	label > span {
		display: block;
	}

	label > span {
		color: ${COL.grey_base};
		display: block;
		font-size: ${TYPE.scale.xs};
	}

	label > input,
	label > textarea {
		border: 2px solid ${COL.grey_light};
		padding: ${_baseUnit(0.5)};
		width: 100%;

		&::placeholder {
			color: ${COL.grey_lightest};
		}
	}

	label > textarea {
		resize: vertical;
		height: ${_baseUnit(10)};
	}
`;

function ContactForm(props = {}) {
	let { handleSubmitClick } = props;

	return (
		<ContactForm_Styled>
			<NetlifyForm name="Contact Form">
				{({ loading, error, success }) => (
					<div>
						<h2 className="Form-title">Send us a message</h2>

						{loading && (
							<div className="Form-message">Loading...</div>
						)}
						{error && (
							<div className="Form-message">
								Your information was not sent. Please ensure all fields are properly completed (or check your network connection).
							</div>
						)}
						{success && (
							<div className="Form-message">
								Thank you for contacting us!
							</div>
						)}
						{!loading && !success && (
							<>
								<div className="Form-row">
									<label>
										<span>Full name:</span>
										<input
											type="text"
											name="name"
											placeholder={
												"Your name and surname"
											}
										/>
									</label>
								</div>
								<div className="Form-row">
									<label>
										<span>Email address:</span>
										<input
											type="email"
											name="email"
											placeholder={"your@email.com"}
										/>
									</label>
								</div>
								<div className="Form-row">
									<label>
										<span>Message:</span>
										<textarea
											name="message"
											placeholder={"Hello, Girardot!"}
										/>
									</label>
								</div>
								<div className="Form-row">
									<Button
										handleClick={handleSubmitClick}
										options={{
											type: "cta",
											text: "Send",
											align: "left"
										}}
									/>
								</div>
							</>
						)}
					</div>
				)}
			</NetlifyForm>
		</ContactForm_Styled>
	);
}

/**
 * =Columns
************************************************************/

const Columns_Styled = styled.section`
	border-top: 2px solid ${COL.grey_light};
	margin: ${_baseUnit(2.5)} auto 0;
	width: 100%;
		max-width: ${_baseUnit(40)};
	padding-top: ${_baseUnit(2.5)};

	.Columns-inner {
		${_flex("row")};

		margin: -${_baseUnit(2)} 0 0 -${_baseUnit(2)};
	}

	.Columns-col {
		width: calc(50% - ${_baseUnit(2)});
		margin: ${_baseUnit(2)} 0 0 ${_baseUnit(2)};
	}
`;

function Columns (props = {}) {
	let {
		columnOne,
		columnTwo
	} = props;

	return (
		<Columns_Styled>
			<div className="Columns-inner">
				<div className="Columns-col">
					<Copy copy={columnOne} options={{copyStyle: "secondary"}} />
				</div>
				<div className="Columns-col">
					<Copy copy={columnTwo} options={{copyStyle: "secondary"}} />
				</div>
			</div>
		</Columns_Styled>
	);
}


/**
 * =Page
 ************************************************************/

class ContactPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageData: props.router.query
		};
	}

	handleSubmitClick() {
		console.log("Submitting form...");
	}

	render() {
		const { router } = this.props;
		const pageData = this.state.pageData;

		return (
			<DefaultLayout>
				<Head pageTitle={pageData.title} />

				<SectionTitle title={pageData.title} isHeader={true} />
				<ContentWrapper>
					<Map />

					<ContactForm handleSubmitClick={this.handleSubmitClick.bind(this)} />

					<Columns
						columnOne={pageData.columnOne}
						columnTwo={pageData.columnTwo}
					/>
				</ContentWrapper>
			</DefaultLayout>
		);
	}
}

export default withRouter(ContactPage);
