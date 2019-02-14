import Header from '../shared/Header';
import Head from 'next/head';

const BaseLayout = ({ children, className, isAuthenticated, user, headerType }) => {
  const headerTypes = headerType || 'default';
  return (
    <React.Fragment>
      <Head>
        <title>Constantine Kobylinskyi</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous" />
      </Head>
      <div className="layout-container">
        <Header className={`port-nav-${headerTypes}`} isAuthenticated={isAuthenticated} user={user} />
        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default BaseLayout;
