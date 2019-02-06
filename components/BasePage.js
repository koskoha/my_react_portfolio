import { Container } from 'reactstrap';

const BasePage = ({ children, className }) => {
  return (
    <div className={`base-page ${className}`}>
      <Container>{children}</Container>
    </div>
  );
};

BasePage.defaultProps = {
  className: ''
};

export default BasePage;
