import { useState } from "react";
import PropTypes from 'prop-types';

export default function useForm(initialValues) {
  const [state, setState] = useState(initialValues);

  return [
    state,
    //setState
    e => setState({
      ...state,
      [e.target.name]: e.target.value
    })
  ];
}

useForm.propTypes = {
  initialValues: PropTypes.object.isRequired
};
