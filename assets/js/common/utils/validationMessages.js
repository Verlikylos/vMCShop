export default {
  required: 'To pole nie może być puste!',
  badEmail: 'To nie jest poprawny adres e-mail!',
  valueShort: (number) => `To pole musi zawierać co najmniej ${number} znaków!`,
  valueLong: (number) => `To pole może zawierać maksymalnie ${number} znaków!`,
  alphanumeric: (chars) =>
    `To pole może zaiwerać jedynie znaki alfanumeryczne${chars ? ` oraz ${chars}` : ''}!`,
};
