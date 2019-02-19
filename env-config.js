const prod = process.env.NODE_ENV === 'production';
console.log(`env : ${process.env.NODE_ENV}`)

module.exports = {
  'process.env.BASE_URL': prod ? 'https://constantine-react-portfolio.herokuapp.com' : 'http://localhost:3000',
  'process.env.NAMESPACE': 'https://constantine-react-portfolio.herokuapp.com',
  'process.env.CLIENT_ID': '9DDmUkFvqF3le7hX0OYvez5mbPiAkgg1'
}
