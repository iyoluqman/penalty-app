type IntraFacilityListDTO = {
  receiptNo: string;
  receiveType: string;
  indentNo: string;
  receiveDate: string;
  noteNo: string;
  receiveFromUnitName: string;
  createdBy: string;
  status: string;
};
type IntraFacIndentNoDTO = {
  indentNo: string;
  indentDate: string;
};

type ReceiptNoDTO = {
  receiptNo: string;
  receiveDate: string;
};

type ReceiveIntraCreatedByDTO = {
  userSec: string;
  userFirstName: string;
  userLastName: string;
};

type ReceiveIntraNoteNoDTO = {
  noteNo: string;
  fromUnit: string;
  noteDate: string;
};

type ReceiveIntraFromUnitDTO = {
  unitSeqno: string;
  unitName: string;
  unitCode: string;
};
