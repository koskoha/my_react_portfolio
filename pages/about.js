import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage';

export default class About extends React.Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          About
        </BasePage>
      </BaseLayout>
    );
  }
}
