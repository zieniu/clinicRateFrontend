export class Users {
  userId?: number;
  login?: string;
  password?: string;
  accessLevel?: number;
  deleted?: number;
  dateCreated?: Date;
  ticket: any;

  copyValues(_ticket: Users) {
    this.userId = _ticket.userId;
    this.accessLevel = _ticket.accessLevel;
    this.password = _ticket.password;
    this.login = _ticket.login;
    this.deleted = _ticket.deleted;
    this.dateCreated = _ticket.dateCreated;
  }
}

export enum Role {
  ReadOnly = 10,
  Conservator = 20,
  Moderator = 30,
  Admin = 40
}
