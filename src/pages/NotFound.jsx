import { Link } from 'react-router-dom';
import Mango from '../components/Mango';

export default function NotFound() {
  return (
    <section className="section notfound">
      <Mango size={160} className="bob" />
      <h1>404</h1>
      <p>This mango rolled away. Let’s get you back.</p>
      <Link to="/" className="btn btn--primary">Go Home</Link>
    </section>
  );
}
