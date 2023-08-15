import Form from '../components/Form'

const NewUser = () => {
  const userForm = {
    name: '',
    owner_name: '',
    species: '',
    age: 0,
    poddy_trained: false,
    diet: [],
    image_url: '',
    likes: [],
    dislikes: [],
  }

  return <Form formId="add-user-form" userForm={userForm} />
}

export default NewUser
