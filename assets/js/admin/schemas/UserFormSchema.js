import * as Yup from 'yup';
import { validationMessages as mess } from '@utils';

export default Yup.object().shape({
  name: Yup.string()
    .min(3, mess.valueShort(3))
    .max(32, mess.valueLong(32))
    .matches(/[a-zA-Z0-9 \-_]/, mess.alphanumeric('spacje, myślniki i podkreślenia'))
    .required(mess.required),
  email: Yup.string().email(mess.badEmail).required(mess.required),
  roles: Yup.array().of(Yup.string()),
});
