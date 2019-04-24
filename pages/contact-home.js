/**
 * =Contact
************************************************************/

import {withRouter} from "next/router";
import React, {Component} from "react";

import DefaultLayout from "../layouts/default";
import SectionTitle from "../components/section-title";
import ContentWrapper from "../components/content-wrapper";

/**
 * =Form
************************************************************/

function ContactForm (props = {}) {
    let {
        handleSubmit,
        handleChange,
        ...fields
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Your Name:
                    <input
                        type="text"
                        name="name"
                        value={fields.name}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Your Email:
                    <input
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Message:
                    <textarea
                        name="message"
                        value={fields.message}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <button type="submit">Send</button>
            </div>
        </form>
    )
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
