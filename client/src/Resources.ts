
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
  address: uAddressResource;
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

// user address resource
export type uAddressResource = {
  id?: string;
  postalCode: string;
  city: string;
};

// event address resource
export type eAddressResource = {
  id?: string;
  street: string;
  houseNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  city: string;
  stateOrRegion?: string;
  country: string;
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

export type eventResource = {
  id?: string;
  name: string;
  creator?: string;
  description: string;
  price: number;
  date?: Date;
  address: eAddressResource;
  thumbnail?: string;
  hashtags?: string[];
  category?: categoryResource[];
  chat?: string;
  participants?: string[];
};

export type eventsResource = {
  events: eventResource[];
};

export type categoryResource = {
  id?: string;
  name: string;
  description?: string;
};


