import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

const Form = ({ formId, userForm, forNewUser = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: userForm.name,
    email: userForm.email,
    password: userForm.password,
    // dob: userForm.dob,
    country: userForm.country,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/users/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update user");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add user");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    // if (name === "dob") {
    //   const value = target.value.str.substring(0, 10);
    // }
    let value = target.value;
    console.log("value ===> ", value);
    console.log("typeof value ===> ", typeof value);
    console.log("typeof name ===> ", typeof name);

    setForm({
      ...form,
      [name]: value,
    });
  };

  /* Makes sure user info is filled for user name, email, password, dob, country */
  const formValidate = () => {
    let err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.email) err.email = "Email is required";
    if (!form.password) err.password = "Password is required";
    // if (!form.dob) err.dob = "DOB is required";
    if (!form.country) err.country = "Country is required";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    console.log("errs ===> ", errs);
    if (Object.keys(errs).length === 0) {
      forNewUser ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength="20"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          maxLength="20"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          maxLength="30"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* <label htmlFor="dob">DOB</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        /> */}

        <label htmlFor="country">Country</label>
        <input
          type="text"
          maxLength="30"
          name="country"
          value={form.country}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
