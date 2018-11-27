export class DictProvince {
  dictProvinceId: number;
  name: string;

  copyValues(_ticket: DictProvince) {
    this.dictProvinceId = _ticket.dictProvinceId;
    this.name = _ticket.name;
  }
}
