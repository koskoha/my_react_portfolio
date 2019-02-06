import Header from '../shared/Header';

const BaseLayout = ({ children, className, isAuthenticated, user }) => {
  return (
    <div className="layout-container">
      <Header isAuthenticated={isAuthenticated} user={user}/>
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
    </div>
  );
};

export default BaseLayout;
