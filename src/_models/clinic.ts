export class Clinic {
  clinicId: number;
  longitude: number;
  latitude: number;
  clinicName: string;
  street: string;
  phoneNumber: string;
  postCode: string;
  provinceId: number;
  cityId: number;

  copyValues(_ticket: Clinic) {
    this.clinicId = _ticket.clinicId;
    this.longitude = _ticket.longitude;
    this.latitude = _ticket.latitude;
    this.clinicName = _ticket.clinicName;
    this.street = _ticket.street;
    this.phoneNumber = _ticket.phoneNumber;
    this.postCode = _ticket.postCode;
    this.provinceId = _ticket.provinceId;
    this.cityId = _ticket.cityId;
  }
}
