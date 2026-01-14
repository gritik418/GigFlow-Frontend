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
  ownerId: UserInterface;
  status: "open" | "assigned";
  createdAt: string;
}

interface Bid {
  _id: string;
  gigId: Gig;
  freelancerId: UserInterface;
  message: string;
  price: number;
  status: "pending" | "hired" | "rejected";
  createdAt: string;
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

interface CreateGigData {
  title: string;
  description: string;
  budget: number;
}

interface PlaceBidData {
  message: string;
  price: number;
  gigId: string;
}

interface PlaceBidResponse {
  success: boolean;
  message: string;
  errors?: PlaceBidErrors;
  data?: Bid;
}

interface CreateGigResponse {
  success: boolean;
  message: string;
  errors?: CreateGigErrors;
  data?: Gig;
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

type CreateGigErrors = {
  title: {
    errors: string[];
  };
  description: {
    errors: string[];
  };
  budget: {
    errors: string[];
  };
};

type PlaceBidErrors = {
  message: {
    errors: string[];
  };
  price: {
    errors: string[];
  };
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
