export const createMeetupValidations = values => {
  const errors = {};
  const requiredField = ['title', 'description'];
  const needLonger = 'Need to be longer';
  requiredField.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.title && values.title.length < 6) {
    errors.title = needLonger;
  }
  if (values.description && values.description.length < 6) {
    errors.description = needLonger;
  }

  return errors;
};
