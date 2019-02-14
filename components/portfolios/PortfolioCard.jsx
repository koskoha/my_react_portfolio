import { Card, CardHeader, CardTitle, CardText, Button, CardBody } from "reactstrap";
import PortfolioCardDetails from "./PortfolioCardDetails";


export default class PortfolioCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleToggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const { portfolio, children } = this.props;
    const { isOpen } = this.state;
    return (
      <span onClick={this.handleToggle}>
        <PortfolioCardDetails isOpen={isOpen} toggle={this.handleToggle} portfolio={portfolio} />
        <Card className="portfolio-card">
          <CardHeader className="portfolio-card-header">{portfolio.position}</CardHeader>
          <CardBody>
            <p className="portfolio-card-city">{portfolio.location} </p>
            <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
            <CardText className="portfolio-card-text">{portfolio.description}</CardText>
            <div className="readMore">
              {children}
            </div>
          </CardBody>
        </Card>
      </span>
    )
  }
}