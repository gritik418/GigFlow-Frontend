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

interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface EmailVerificationData {
  email: string;
  otp: string;
}

type BaseResponse = {
  success: boolean;
  message: string;
};

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

type RegisterResponse = {
  success: boolean;
  message: string;
  errors?: RegisterResponseErrors;
};

type RegisterResponseErrors = {
  firstName: {
    errors: string[];
  };
  lastName: {
    errors: string[];
  };
  username: {
    errors: string[];
  };
  email: {
    errors: string[];
  };
  password: {
    errors: string[];
  };
  passwordConfirmation: {
    errors: string[];
  };
};

type EmailVerificationResponse = {
  success: boolean;
  message: string;
  errors?: EmailVerificationResponseErrors;
};

type EmailVerificationResponseErrors = {
  email: {
    errors: string[];
  };
  otp: {
    errors: string[];
  };
};

type UserProfileResponse = {
  success: boolean;
  message: string;
  data: UserInterface;
};
