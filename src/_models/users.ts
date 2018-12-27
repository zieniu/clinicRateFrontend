export class Users {
  userId?: number;
  username?: string;
  password?: string;
  accessLevel?: number;
  deleted?: number;
  dateCreated?: Date;
  ticket: any;

  copyValues(_ticket: Users) {
    this.userId = _ticket.userId;
    this.accessLevel = _ticket.accessLevel;
    this.password = _ticket.password;
    this.username = _ticket.username;
    this.deleted = _ticket.deleted;
    this.dateCreated = _ticket.dateCreated;
  }
}

export enum Role {
  User = 0,
  Moderator = 1,
  Admin = 2
}
