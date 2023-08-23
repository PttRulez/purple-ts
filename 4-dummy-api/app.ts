import axios from 'axios'

enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

enum BloodGroup {
  'A-' = 'A-',
  'A+' = 'A+',
  'B-' = 'B-',
  'B+' = 'B+',
  'O-' = 'O-',
  'O+' = 'O+',
  'AB-' = 'AB-',
  'AB+' = 'AB+'
}

enum HairType {
  CURLY = 'Curly',
  VERY_CURLY = 'Very curly',
  STRAIGHT = 'Straight',
  STRANDS = 'Strands',
  WAVY = 'Wavy'
}

enum CardType {
  AMERICAN_EXPRESS = 'americanexpress',
  BANKCARD = 'bankcard',
  DINERS_BLANCHE = 'diners-club-carte-blanche',
  DINERS_ENROUTE = "diners-club-enroute",
  INSTAPAYMENT = 'instapayment',
  JCB = 'jcb',
  MAESTRO = 'maestro',
  MASTERCARD = 'mastercard',
  SOLO = 'solo',
  SWITCH = 'switch',
  VISA_ELECTRON = 'visa-electron',
}

enum Currency {
  DOLLAR = 'Dollar',
  EURO = 'Euro',
  HRYVNIA = 'Hryvnia',
  KORUNA = 'Koruna',
  PESO = 'Peso',
  IRANIAN_RIAL = 'Rial',
  BRAZILIAN_REAL = 'Real',
  RINGGIT = 'Ringgit',
  RUBLE = 'Ruble',
  INDONESIAN_RUPIAH = 'Rupiah',
  INIDIAN_RUPEE = 'Rupee',
  YEN = 'YEN',
  YUAN = 'Yuan Renminbi',
  ZLOTY = 'Zloty'
}

interface IAddress {
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  }
  postalCode: string;
  state: string;
}

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: BloodGroup;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: HairType;
  };
  domain: string;
  ip: string;
  address: IAddress;
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: CardType;
    currency: Currency;
    iban: string;
  };
  company: {
    address: IAddress;
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
}

interface IResponse {
  users: IUser[];
  total: number;
  skip: 0;
  limit: 30;
}

async function getUsers(): Promise<IUser[]> {
  const { data } = await axios.get<IResponse>("https://dummyjson.com/users")
  return data.users;
}

const main: () => void = async () => {
  const users = await getUsers()
  console.log('users:', users)
}

main()
