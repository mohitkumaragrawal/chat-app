import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUser, User } from "./user.model";

/**
 * TODO: implements a password reset facility for the user, and add a avatar for user.
 */

// Randomly generated key using node.js crypto library
const PRIVATE_KEY = "lYTTrziD3PAC/TEmMSTIC7kxsDWO4o5gBlpyB+9w";

/**
 * Checks if the given email address is valid.
 * @param email non-validated email address
 * @returns
 */
const isValidEmail = (email: string): boolean => {
  // I don't really know what I'm doing in this regex expression, but it works ('cause copied).
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Checks if the password is satisfies the given conditions, like length of password is between 8 and 40.
 */
const isValidPassword = (password: string): boolean => {
  if (password.length >= 8 && password.length <= 40) return true;
  return false;
};

/**
 * validate the email and password
 * @returns null when everything is alright, otherwise an array repensenting errors.
 */
const validateEmailAndPassword = (
  email: string,
  pass: string
): { error: string; message?: string }[] | null => {
  const emailValidity = isValidEmail(email);
  const passValidity = isValidPassword(pass);

  let errors: { error: string; message?: string }[] = [];

  if (!emailValidity) {
    errors.push({
      error: "INVALID_EMAIL",
    });
  }

  if (!passValidity) {
    errors.push({
      error: "INVALID_PASSWORD",
      message: "Length of password should be in between 8 and 40.",
    });
  }

  if (errors.length > 0) {
    return errors;
  }
  return null;
};

/**
 * As the name suggests, it is used to generate the token for the signed in user, don't ever return
 * token to unauthenticated user.
 */
const generateToken = (user: IUser): string => {
  return jwt.sign(
    {
      email: user.email,
      _id: user._id,
    },
    PRIVATE_KEY
  );
};

/**
 * Checks if the token is valid.
 */
export async function validateToken(token: string) {
  const result = jwt.verify(token, PRIVATE_KEY) as {
    email: string;
    _id: string;
  };
  // we may need not to check the user, casue it is valid until the site private key is compromised.
  // if (result) {
  //   // token is valid.
  //   const user = await User.findOne({ email: result.email, _id: result._id });

  //   if (user) {
  //
  //     // we found the user meaning token is valid.
  //     return true;
  //   }
  // }

  if (result) return result;
  return false;
}

// POST, request body : { firstName, lastName, email, pass}
export const registerUser = (req: Request, res: Response) => {
  const validationErrors = validateEmailAndPassword(
    req.body.email,
    req.body.pass
  );

  if (validationErrors) {
    // We have got some erros
    res.status(400).json(validationErrors).end();
    return;
  }

  const pass = bcrypt.hashSync(req.body.pass, 10);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    pass: pass,
  });

  // save the user to the databse
  user.save({ timestamps: true }).then(
    (value: IUser) => {
      if (!value) {
        // saving was NOT successful
        res.status(500).end();
        return;
      }

      // create a token and then return it to user along with firstName, lastName, email
      const token: string = generateToken(value);

      res
        .status(200)
        .json({
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          token: token,
        })
        .end();
    },
    (error) => {
      res
        .status(400)
        .json({
          error: "EMAIL_ALREADY_EXISTS",
          message:
            "The users with the given email addres is already registered, try login",
        })
        .end();
    }
  );
};

// GET request, query params, email, pass
export const loginUser = (req: Request, res: Response) => {
  const token = req.header("Token");
  if (token) {
    console.log("Got a fresh token: ", token);
  }

  const email = req.query.email as string;
  const pass = req.query.pass as string;

  if (!email || !pass) {
    console.log(email, pass);
    res
      .status(400)
      .json({
        message: "Required inputs are not provided",
      })
      .end();
    return;
  }

  const errors = validateEmailAndPassword(email, pass);
  if (errors) {
    // We didn't get valid inputs
    res.status(400).json(errors).end();
    return;
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      // We didn't fine one
      res
        .status(400)
        .json({
          error: "EMAIL_NOT_REGISTERED",
          message: "the email id is not registered.",
        })
        .end();

      return;
    }

    // we found a user with a given email id.
    const result = bcrypt.compareSync(pass, user.pass);
    if (result) {
      // the given credentials are correct.
      // we need to create a token
      const token = generateToken(user);

      res
        .status(200)
        .json({
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: token,
        })
        .end();
    } else {
      // invalid credentials
      res
        .status(400)
        .json({
          error: "WRONG_PASSWORD",
          message: "The password entered by the user is wrong.",
        })
        .end();
    }
  });
};
