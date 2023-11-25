
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

export type userResource = {
  id?: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
  password?: string;
  isAdministrator: Boolean;
  address: addressResource;
  profilePicture?: string;
  birthDate: Date;
  gender: string;
  socialMediaUrls?: {
    facebook?: string;
    instagram?: string;
  };
  isActive: boolean;
  oldPassword?: string;
};

export type usersResource = {
  users: userResource[];
};

export type addressResource = {
  id?: string;
  street: String;
  houseNumber: String;
  apartmentNumber?: String;
  postalCode: String;
  city: String;
  stateOrRegion?: String;
  country: String;
};

export type ValidationMessages<Type> = {
  [Property in keyof Type]?: string;
}

export type LoginResource = {
  /** The JWT */
  access_token: string;
  /** Constant value */
  token_type: "Bearer";
};
