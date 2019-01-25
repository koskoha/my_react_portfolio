import axios from 'axios';
import Link from 'next/link';

import BaseLayout from '../components/layouts/BaseLayout';

export default class Blogs extends React.Component {
  static async getInitialProps() {
    let response;
    try {
      response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    } catch (err) {
      console.log(err);
    }
    return { posts: response.data.splice(0, 10) };
  }

  renderPosts(posts) {
    return (
      <ul>
        {posts.map(post => (
          <li>
            <Link as={`/post/${post.id}`} href={`/post?id=${post.id}`}>
              <a style={{ fontSize: '20px' }}>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { posts } = this.props;
    return <BaseLayout>{this.renderPosts(posts)}</BaseLayout>;
  }
}
