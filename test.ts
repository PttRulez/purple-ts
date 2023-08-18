interface IPayment {
  sum: number;
  from: number;
  to: number;
}

enum PaymentStatus {
  Success = 'success',
  Failed = 'failed'
}

interface IPaymentRequest extends IPayment {}

interface IDataSuccess extends IPayment {
  databaseId: number;
}

interface IDataFailed {
  errorMessage: string;
  errorCode: number;
}

interface IResponseSuccess {
  status: PaymentStatus.Success;
  data: IDataSuccess;
}

interface IResponseFailed {
  status: PaymentStatus.Failed;
  data: IDataFailed;
}

function isSuccess (res: IResponseFailed | IResponseSuccess): res is IResponseSuccess {
  return res.status === PaymentStatus.Success
}
type f = (res: IResponseFailed | IResponseSuccess) => number;

const myFunc: f = (res: IResponseFailed | IResponseSuccess) => {
  if (isSuccess(res)) {
    return res.data.databaseId
  } else {
    throw new Error(res.data.errorMessage)
  }
}