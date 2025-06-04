import jwt from "jsonwebtoken";
const TOKEN_DAY_EXPIRE = 7;
export const generateJwtToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: `${TOKEN_DAY_EXPIRE}d`,
  });
  res.cookie("jwt", token, {
    maxAge: TOKEN_DAY_EXPIRE * 24 * 60 * 60 * 1000,
    httpOnly: true, //Make this token not be accessible via JS, prevent XSS attacks, cros-site scripting attacks
    sameSite: "strict", // CSRF attacks
    secure: process.env.NODE_ENV !== "dev", //make is become https if env is not dev
  });
  return token;
};

export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
