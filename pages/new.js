import Form from '../components/Form'

const NewUser = () => {
  const userForm = {
    name: '',
    email: '',
    password: '',
    // dob: '',
    country: '',
  }

  return <Form formId="add-user-form" userForm={userForm} />
}

export default NewUser
