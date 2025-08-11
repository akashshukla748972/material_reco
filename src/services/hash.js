import bcrypt from "bcryptjs";

export const genHash = async (password) => {
  if (!password) {
    return {
      isSuccess: false,
      message: "Password is required for hashing.",
    };
  }

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    return {
      isSuccess: true,
      hashedPassword,
    };
  } catch (error) {
    console.log(`Error while genrating hash: ${error}`);
    return {
      isSuccess: false,
      message: "Internal server error.",
    };
  }
};
