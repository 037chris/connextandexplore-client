export type Address = {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
  stateOrRegion?: string;
  apartmentNumber?: string;
}

export type SocialMediaUrls = {
  facebook?: string;
  instagram?: string;
}

export type UserRegistration  = {
  email: string;
  name: {
    first: string;
    last: string;
  };
  password: string;
  isAdministrator?: boolean;
  address: Address;
  profilePicture?: string;
  birthDate: string;
  gender: string;
  socialMediaUrls?: SocialMediaUrls;
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