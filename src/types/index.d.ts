interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  isVerified: boolean;
  verificationCode?: string;
  verificationCodeExpiry?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpiry?: Date;
}

interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  ownerId: string;
  status: "open" | "assigned";
}

interface Bid {
  _id: string;
  gigId: string;
  freelancerId: string;
  message: string;
  price: number;
  status: "pending" | "hired" | "rejected";
}

interface LoginData {
  identifier: string;
  password: string;
}

type LoginResponse = {
  success: boolean;
  message: string;
  errors?: LoginResponseErrors;
};

type LoginResponseErrors = {
  identifier: {
    errors: string[];
  };
  password: {
    errors: string[];
  };
};

type UserProfileResponse = {
  success: boolean;
  message: string;
  data: UserInterface;
};
