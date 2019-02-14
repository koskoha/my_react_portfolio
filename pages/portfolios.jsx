import { Router } from '../routes';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col, Button } from 'reactstrap';
import { getPortfolios, deletePortfolio } from '../actions';
import PortfolioCard from '../components/portfolios/PortfolioCard';

class Portfolios extends React.Component {
  static async getInitialProps() {
    let portfolios = [];
    try {
      portfolios = await getPortfolios()
    } catch (err) {
      console.log(err);
    }
    return { portfolios };
  }

  navigateToEdit = (e, portfolioId) => {
    e.stopPropagation();
    Router.pushRoute(`/portfolios/${portfolioId}/edit`);
  }

  displayDeleteWarning(e, portfolioId) {
    e.stopPropagation();
    const isConfirm = confirm('Are you sure you want to delete this portfolio?');

    if (isConfirm) {
      this.deletePortfolio(portfolioId);
    }
  }

  deletePortfolio(portfolioId) {
    deletePortfolio(portfolioId)
      .then(() => {
        Router.pushRoute('/portfolios');
      })
      .catch(err => console.error(err));
  }

  renderPosts(portfolios) {
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    return portfolios.map((portfolio, index) => (
      <Col md="4" key={index}>
        <PortfolioCard portfolio={portfolio} >
          {isAuthenticated && isSiteOwner &&
            <React.Fragment>
              <Button onClick={(e) => this.navigateToEdit(e, portfolio._id)} color="warning">Edit</Button> {' '}
              <Button onClick={(e) => this.displayDeleteWarning(e, portfolio._id)} color="danger">Delete</Button>
            </React.Fragment>
          }
        </PortfolioCard>
      </Col >
    ))
  }

  render() {
    const { portfolios, auth: { isAuthenticated, isSiteOwner } } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-page" title="Portfolios page">
          {isAuthenticated && isSiteOwner &&
            <Button onClick={() => Router.pushRoute('/portfolioNew')}
              color="success"
              className="create-port-btn">
              Create Portfolio
            </Button>
          }
          <Row>
            {this.renderPosts(portfolios)}
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolios;