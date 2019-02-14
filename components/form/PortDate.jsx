import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import moment from "moment";
import { FormGroup, Label, Button } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";

class PortDate extends React.Component {

  constructor(props) {
    super(props)

    const dateValue = props.initialDate ? moment(props.initialDate) : moment();
    const isHidden = props.initialDate ? false : true;

    this.state = {
      dateValue,
      isHidden
    };
  }

  setFieldValueAndTouched(date, touched) {
    const { setFieldValue, setFieldTouched } = this.props.form;
    const { name } = this.props.field;

    setFieldValue(name, date, true);
    setFieldTouched(name, touched, true);
  }

  handleChange = (date) => {
    this.setState({
      dateValue: date
    });
    this.setFieldValueAndTouched(date, true)
  }

  toggleDate(date) {
    this.setState({ isHidden: !this.state.isHidden })
    this.setFieldValueAndTouched(date, true)
  }

  render() {
    const { isHidden, dateValue } = this.state;
    const { label, form: { touched, errors }, field, canBeDisabled } = this.props;
    return (
      <React.Fragment>
        <FormGroup>
          <Label>{label}</Label>
          <div className="input-group">
            {!isHidden &&
              <DatePicker
                selected={dateValue}
                onChange={this.handleChange}
                peekNextMonth
                showMonthDropdown
                showMonthYearDropdown
                minDate={moment().subtract(100, "years")}
                maxDate={moment()}
                dropdownMode="select"
              />
            }
          </div>
          {canBeDisabled && !isHidden && <Button onClick={() => this.toggleDate(null)}> Still Working Here...</Button>}

          {canBeDisabled && isHidden &&
            <React.Fragment>
              <span>Still Working Here...</span>
              <Button onClick={() => this.toggleDate(dateValue)} > Set End Date</Button>
            </React.Fragment>
          }

          {touched[field.name] &&
            errors[field.name] && <div className="error">{errors[field.name]}</div>}
        </FormGroup>
      </React.Fragment >
    );
  }
}

export default PortDate;