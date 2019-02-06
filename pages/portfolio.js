import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

export default class Portfolio extends React.Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>Portfolio</BasePage>
      </BaseLayout>
    );
  }
}
