// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';
import moment from 'moment';
import { Button, Alert } from 'reactstrap';

const validateInputs = (values) => {
  let errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!values[key] && key !== 'endDate') {
      errors[key] = `Field ${key} is required!`;
    }
  });

  const startDate = moment(values.startDate);
  const endDate = moment(values.endDate);

  if (startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = "End date can't be before start data.";
  }

  return errors;
}

const PortfolioCreateForm = ({ initialValues, onSubmit, error }) => (
  <div>
    <Formik
      initialValues={initialValues}
      validate={validateInputs}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field label="Title" type="text" name="title" component={PortInput} />
          <Field label="Company" type="text" name="company" component={PortInput} />
          <Field label="Location" type="text" name="location" component={PortInput} />
          <Field label="Position" type="text" name="position" component={PortInput} />
          <Field label="Description" type="textarea" name="description" component={PortInput} />
          <Field label="Start Date" initialDate={initialValues.startDate} name="startDate" component={PortDate} />
          <Field label="End Date" initialDate={initialValues.endDate} canBeDisabled={true} name="endDate" component={PortDate} />
          {
            error && <Alert color="danger">
              {error}
            </Alert>
          }
          <Button color="success" size="lg" type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;












// export default class PortfolioCreateForm extends React.Component {

//   state = { title: '', description: '', language: "eng" };

//   handleChange = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   }

//   handleSubmit = (event) => {
//     alert(`A name: ${this.state.title}, description: ${this.state.description}, language: ${this.state.language}`);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Title:
//             <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
//         </label>
//         <label>
//           Description
//           <textarea name="description" value={this.state.description} onChange={this.handleChange} />
//         </label>
//         <label>
//           Pick your favorite Programming Language
//           <select name="language" value={this.state.language} onChange={this.handleChange}>
//             <option value="java">Java</option>
//             <option value="js">JavaScript</option>
//             <option value="python">Python</option>
//           </select>
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }