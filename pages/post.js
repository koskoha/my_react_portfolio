import { withRouter } from 'next/router';
import BaseLayout from '../components/layouts/BaseLayout';
import Axios from 'axios';

class Post extends React.Component {
  static async getInitialProps({ query }) {
    let response;
    try {
      response = await Axios.get(
        `https://jsonplaceholder.typicode.com/posts/${query.id}`
      );
    } catch (err) {
      console.error(err);
    }
    return { post: response.data };
  }

  render() {
    const { post } = this.props;
    return (
      <BaseLayout>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </BaseLayout>
    );
  }
}

export default withRouter(Post);
