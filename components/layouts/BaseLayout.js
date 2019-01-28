import Header from '../shared/Header';

const BaseLayout = ({ children, className }) => {
  return (
    <div className="layout-container">
      <Header />
      <main className={className}>
        <div className="wrapper">{children}</div>
      </main>
    </div>
  );
};

export default BaseLayout;
