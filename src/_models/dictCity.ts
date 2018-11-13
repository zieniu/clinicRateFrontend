export class DictCity {
  dictCityId: number;
  name: number;

  copyValues(_ticket: DictCity) {
    this.dictCityId = _ticket.dictCityId;
    this.name = _ticket.name;
  }
}
