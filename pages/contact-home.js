/**
 * =Contact
************************************************************/

import {withRouter} from "next/router";
import React, {Component} from "react";
import styled from "styled-components";

import DefaultLayout from "../layouts/default";

import Button from "../components/button";
import ContentWrapper from "../components/content-wrapper";
import SectionTitle from "../components/section-title";

import {COL, TYPE} from "../assets/styles/theme/_style";
import {_baseUnit} from "../assets/styles/mixins/_style";

/**
 * =Form
************************************************************/

const ContactForm_Styled = styled.form`
    margin: 0 auto;
    width: 100%;
        max-width: ${_baseUnit(40)};

	.Form-row {
		margin-top: ${_baseUnit()};
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
        padding: ${_baseUnit(.5)};
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

function ContactForm (props = {}) {
    let {
        handleSubmit,
        handleChange,
        ...fields
    } = props;

    return (
		<ContactForm_Styled onSubmit={handleSubmit}>
			<div className="Form-row">
				<label>
					<span>Full name:</span>
					<input
						type="text"
						name="name"
						value={fields.name}
						onChange={handleChange}
						placeholder={"Ms Name Surname"}
					/>
				</label>
			</div>
			<div className="Form-row">
				<label>
					<span>Email address:</span>
					<input
						type="email"
						name="email"
						value={fields.email}
						onChange={handleChange}
						placeholder={"your@email.com"}
					/>
				</label>
			</div>
			<div className="Form-row">
				<label>
					<span>Message:</span>
					<textarea
						name="message"
						value={fields.message}
						onChange={handleChange}
						placeholder={"Hello, Girardot!"}
					/>
				</label>
			</div>
			<div className="Form-row">
				<Button
					handleClick={true}
					options={{
						type: "cta",
						text: "Send",
						align: "left"
					}}
				/>
			</div>
		</ContactForm_Styled>
	);
}

/**
 * =Page
************************************************************/

function encode (date) {
    return Object.keys.data.map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(date[key])
    }).join("&");
}

class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageData: props.router.query,
            name: "",
            email: "",
            message: ""
        }
    }

    handleSubmit(e) {
        fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                body: encode({
                    "form-name": "contact",
                    ...this.state
                })
            }
        })
        .then(() => console.log("Success"))
        .catch(err => console.log(err));

        e.preventDefault();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
	}

	handleClick() {
		console.log("Submitting form...");
	}

    render() {
        const {router} = this.props;
        const pageData = this.state.pageData;

        const {
            name,
            email,
            message
        } = this.state;

        return (
            <DefaultLayout>
                <SectionTitle title={pageData.title} isHeader={true} />
                <ContentWrapper>
                    <ContactForm
                        handleChange={this.handleChange.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                        fields={{
                            name,
                            email,
                            message
                        }}
                    />
                </ContentWrapper>
            </DefaultLayout>
        );
    }
}

export default withRouter(ContactPage);
