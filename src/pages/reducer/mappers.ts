import { get } from "lodash";
import { IUser } from "./use-reducer";

const User = (item: any): IUser => {
  return {
    id: get(item, "id") || "",
    name: get(item, "name") || "",
    username: get(item, "username") || "",
    email: get(item, "email") || "",
    city: get(item, "address.city") || "",
    zipcode: get(item, "address.zipcode") || "",
    website: get(item, "website") || "",
    company: get(item, "company.name") || "",
  };
};

export default User;

/*

 {
  id: string;
  name: string;
  username: string;
  email: string;
  city: string;
  zipcode: string;
  website: string;
  company: string;
}

*/
