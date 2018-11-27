export class DictCity {
  dictCityId: number;
  name: string;

  copyValues(_ticket: DictCity) {
    this.dictCityId = _ticket.dictCityId;
    this.name = _ticket.name;
  }
}
