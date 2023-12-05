// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public id?: ObjectId
  ) {}
}
