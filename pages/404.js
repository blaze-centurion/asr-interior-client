import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';

const NotFound = () => {
  return (
      <>
        <Header />
        <div className="container">
            <h1>Sorry this page is not available!</h1>
            <Link href="/">
                <a>Go to Home</a>
            </Link>
        </div>
        <Footer />
        <style jsx>{`
            .container {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                min-height: 50vh;
            }
            h1 {
                font-family: var(--poppins);
                font-size: 25px;
                font-weight: 500;
            }
            a {
                display: block;
                margin-top: 10px;
                border: none;
                outline: none;
                background: #fe6948;
                color:#fff;
                padding: 9px 20px;
                border-radius: 10pc;
                font-family:var(--poppins);
                font-size: 13px;
            }
        `}</style>
      </>
  )
}

export default NotFound