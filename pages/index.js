import BaseLayout from '../components/layouts/BaseLayout';
import axios from 'axios';

export default class Blogs extends React.Component {
  static async getInitialProps() {
    let response;
    try {
      response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    return { userData: response.data };
  }

  render() {
    const { userData } = this.props;
    return (
      <BaseLayout>
        <h1>Index</h1>
        <p>{userData.title}</p>
      </BaseLayout>
    );
  }
}
