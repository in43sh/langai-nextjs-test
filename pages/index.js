import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import User from '../models/User'

const Index = ({ users }) => (
  <>
    {/* Create a card for each user */}
    {users.map((user) => (
      <div key={user._id}>
        <div className="card">
          <img src={user.image_url} />
          <h5 className="user-name">{user.name}</h5>
          <div className="main-content">
            <p className="user-name">{user.name}</p>
            <p className="email">Email: {user.email}</p>

            {/* Extra User Info: Likes and Dislikes */}
            {/* <div className="likes info">
              <p className="label">Likes</p>
              <ul>
                {user.likes.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul>
            </div>
            <div className="dislikes info">
              <p className="label">Dislikes</p>
              <ul>
                {user.dislikes.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul>
            </div> */}

            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${user._id}/edit`} legacyBehavior>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${user._id}`} legacyBehavior>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)

/* Retrieves user(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await User.find({})
  const users = result.map((doc) => {
    const user = doc.toObject()
    user._id = user._id.toString()
    return user
  })

  return { props: { users: users } }
}

export default Index
