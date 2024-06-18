//sign up
import { hashPassword, comparePassword } from "../helpers/hash.js";
import { generateToken } from "../helpers/jwt.js";

export const SignUp = async (req, res) => {
  try {
    const { email, password } = value;

    //Check if a user is already registered in the database
    //Replace with postgres query
    //   const existingUser = await Student.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    //hash password
    const hashedPassword = await hashPassword(password);

    //replace the plain password with the hash
    value.password = hashedPassword;

    const token = generateToken(value);
    //postgres query to create a new user
    //   const newUser = await Student.create(value);
    if (!newUser) {
      return res.status(400).json({ error: "Sign up failed" });
    }

    //respond to the front-end with these details
    res.status(201).json({
      Details: newUser,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err.message);
  }
};

//login
export const Login = async (req, res) => {
  try {
    const { email, password } = value;

    //pg db query to find a user with the email
    // const findStudent = await Student.findOne({ email });
    if (!findStudent) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isMatch = await comparePassword(password, findStudent.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = generateToken(value);

    res.status(200).json({
      Details: findStudent,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err.message);
  }
};
