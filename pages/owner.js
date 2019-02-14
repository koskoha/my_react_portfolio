import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';

class Owner extends React.Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>IM owner</BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(Owner)


