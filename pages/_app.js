import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>User Care App</title>
      </Head>

      <div className="top-bar">
        <p>Users</p>
        <div className="nav">
          <Link href="/">Home</Link>
          <Link href="/new">Add User</Link>
        </div>

        {/* <img
          id="title"
          src="https://upload.wikimedia.org/wikipedia/commons/1/1f/User_logo_with_flowers.png"
          alt="user care logo"
        ></img> */}
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
