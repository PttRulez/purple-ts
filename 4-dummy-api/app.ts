import axios from 'axios'

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
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: IAddress;
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
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
