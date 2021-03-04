import * as Yup from 'yup';
import { validationMessages as mess } from '@utils';

export default Yup.object().shape({
  email: Yup.string().email(mess.badEmail).required(mess.required),
  password: Yup.string().min(5, mess.valueShort(5)).required(mess.required),
});
