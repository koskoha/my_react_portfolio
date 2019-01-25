import Header from '../shared/Header';

const BaseLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default BaseLayout;
