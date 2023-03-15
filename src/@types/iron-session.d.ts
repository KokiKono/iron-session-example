import * as IronSession from "iron-session";

declare module "iron-session" {
  export interface IronSessionData {
    user?: {
      id: number;
      email: string;
      password: string;
      admin: boolean;
    };
  }
}
