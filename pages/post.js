import { withRouter } from 'next/router';
import BaseLayout from '../components/layouts/BaseLayout';

class Post extends React.Component {
  render() {
    return (
      <BaseLayout>
        <h2>{this.props.router.query.id}</h2>
      </BaseLayout>
    );
  }
}

export default withRouter(Post);
