
export type  UserRegistration = {
  email: string;
  name: {
    first: string;
    last: string;
  };
  password: string;
  isAdministrator?: boolean;
  address: {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    country: string;
    stateOrRegion?: string;
    apartmentNumber?: string;
  };
  profilePicture?: string;
  birthDate: string;
  gender: string;
  socialMediaUrls?: {
    facebook?: string;
    instagram?: string;
  };
}


export type ValidationMessages<Type> = {
  [Property in keyof Type]?: string;
}

export type LoginResource = {
  /** The JWT */
  access_token: string;
  /** Constant value */
  token_type: "Bearer";
};
