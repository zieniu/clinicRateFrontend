export class Opinion {
  opinionId?: number;
  username?: string;
  description?: string;
  rate?: number;
  clinicId?: number;
  dateCreated?: Date;

  copyValues(_ticket: Opinion) {
    this.opinionId = _ticket.opinionId;
    this.description = _ticket.description;
    this.rate = _ticket.rate;
    this.username = _ticket.username;
    this.clinicId = _ticket.clinicId;
  }
}
