import mongoose from 'mongoose'

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  name: {
    /* The name of this user */

    type: String,
    required: [true, 'Please provide your name.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    /* The email of this user */

    type: String,
    required: [true, "Please provide your email."],
    maxlength: [60, "Email cannot be more than 60 characters"],
  },
  password: {
    /* The password of your user */

    type: String,
    required: [true, 'Please provide your password.'],
    maxlength: [60, 'Password specified cannot be more than 40 characters'],
  },
  // dob: {
  //   /* User's DOB */

  //   type: Date,
  //   required: true,
  // },
  country: {
    /* The country of your user */

    type: String,
    required: [true, 'Please provide your country.'],
    maxlength: [60, 'Country specified cannot be more than 40 characters'],
  },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
