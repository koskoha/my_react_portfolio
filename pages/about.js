import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Row, Col } from 'reactstrap';

class About extends React.Component {
  render() {
    return (
      <BaseLayout
        title="Constantine Kobylinskyi - Learn More About Me"
        {...this.props.auth}
      >
        <BasePage className="about-page">
          <Row className="mt-5">
            <Col md="6">
              <div className="left-side">
                <h1 className="title fadein">Hello, Welcome</h1>
                <h4 className="subtitle fadein">To About Page</h4>
                <p className="subsubTitle fadein">
                  Feel free to read short description about me.
                </p>
              </div>
            </Col>
            <Col md="6">
              <div className="fadein">
                <p>
                  My name is Constantine Kobylinskyi and I am an experienced
                  software engineer and freelance developer.{' '}
                </p>
                <p>
                  I have a Bachelor's degree in Program Engineering and several
                  years of experience working on a wide range of technologies
                  and projects from Web applications to modern mobile
                  applications in React, React Native and Node.
                </p>
                <p>
                  Languages: • Proficient in: JavaScript/ES6, Java, HTML, CSS,
                  SQL. Frameworks/Libraries: • React JS, React Native, Redux,
                  Node JS, Express JS, JQuery, Next JS, SASS. Tools: • Webpack,
                  Babel, Jest, Enzyme, Docker DB: MongoDB, MySQL
                </p>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default About;
