export class Clinic {
  clinicId: number;
  longitude: number;
  latitude: number;
  clinicName: string;
  street: string;
  phoneNumber: string;
  postCode: string;
  province: string;
  city: string;

  copyValues(_ticket: Clinic) {
    this.clinicId = _ticket.clinicId;
    this.longitude = _ticket.longitude;
    this.latitude = _ticket.latitude;
    this.clinicName = _ticket.clinicName;
    this.street = _ticket.street;
    this.phoneNumber = _ticket.phoneNumber;
    this.postCode = _ticket.postCode;
    this.province = _ticket.province;
    this.city = _ticket.city;
  }
}
