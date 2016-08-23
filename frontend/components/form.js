import React from 'react';
import _ from 'lodash';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this._validations = {};
    }

    setValidations(validations) {
        _.extend(this._validations, validations);
    }

    *_validateField(name, value, validations) {
        if (validations.required && !value) {
            yield 'Field is required';
        }
    }

    reset() {

        let state = {};

        _.each(this.state, (value, key) => {
            if (key.endsWith('_visited') && value) {
                state[key] = false;
                state[key.substring(0, key.length-8)] = undefined;
            }
        });

        this.setState(state);
        this.validate(state);
    }

    validate(newState) {

        this._validationErrors = {};
        var isValid = true;

        _.each(this._validations, (validation, name) => {
            let value;

            if (newState && newState.hasOwnProperty(name)) {
                value = newState[name];
            } else {
                value = this.state && this.state[name];
            }

            let errors = [...this._validateField(name, value, validation)];
            this._validationErrors[name] = errors;
            if (errors && errors.length) {
                isValid = false;
            }
        });

        this.setState({ isValid });
    }

    componentWillMount() {
        this.validate();
    }

    _updateField(name, value) {

        var validations = this._validations[name];

        if (validations) {
            let errors = [...this._validateField(name, value, validations)];
            let previousErrors = this._validationErrors[name];
            this._validationErrors[name] = errors;
            if ((errors.length !== 0) != (previousErrors.length !== 0)) {
                let isValid;
                if (errors.length !== 0) {
                    isValid = false;
                } else {
                    isValid = !_.find(this._validationErrors, (value, key) => value && value.length);
                }
                this.setState({ isValid });
            }
        }

        this.setState({
            [name]: value
        });
    }

    field(name) {

        let validationErrors = this._validationErrors && this._validationErrors[name];

        let errorText = '';
        let value = (this.state && this.state[name]) || '';
        const visitedField = name + '_visited';

        if (this.state[visitedField] && validationErrors && validationErrors.length) {
            errorText = validationErrors[0];
        }

        return {
            name: name,
            value: value,
            errorText: errorText,
            onChange: event => {
                this.setState({ [visitedField]: true });
                if (event.target.value !== ((this.state && this.state[name]) || '')) {
                    this._updateField(name, event.target.value);
                }
            },
            onBlur: () => {
                this.setState({ [visitedField]: true });
            }
        };
    }
}

export default Form;
