import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

/* Allows you to view user card info and delete user card*/
const UserPage = ({ user }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const userID = router.query.id;

    try {
      await fetch(`/api/users/${userID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the user.");
    }
  };

  return (
    <div key={user._id}>
      <div className="card">
        <img src={user.image_url} />
        <h5 className="user-name">Name: {user.name}</h5>
        <div className="main-content">
          <p className="user-name">Name: {user.name}</p>
          <p className="email">Email: {user.email}</p>
          <p className="email">Password: {user.password}</p>
          {/* <p className="email">Date of Birth: {user.dob}</p> */}
          {/* <p className="email">typeof Date of Birth: {typeof user.dob}</p> */}
          <p className="email">Country: {user.country}</p>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${user._id}/edit`} legacyBehavior>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const user = await User.findById(params.id).lean();
  user._id = user._id.toString();

  return { props: { user } };
}

export default UserPage;
