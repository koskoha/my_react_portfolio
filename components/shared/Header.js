import Link from 'next/link';
import '../../styles/main.scss';

export default class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/portfolio">
        <a>portfolio</a>
      </Link>
      <Link href="/cv">
        <a>cv</a>
      </Link>
      <Link href="/blogs">
        <a>Blogs</a>
      </Link>
    </React.Fragment>
    )
  }
}