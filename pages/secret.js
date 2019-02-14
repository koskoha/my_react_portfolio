import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import { getSecretData, getSecretDataServer } from '../actions';

class Secret extends React.Component {
  state = { secretData: [] }

  static async getInitialProps({ req }) {
    const anotherSD = await getSecretData(req);
    return { anotherSD };
  }

  async componentDidMount() {
    const secretData = await getSecretData();

    this.setState({ secretData })
  }


  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>Secret Page</h1>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth()(Secret);
