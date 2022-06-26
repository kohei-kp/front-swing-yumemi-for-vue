import axios, { AxiosError, AxiosResponse } from 'axios';

export type Prefecture = {
  prefCode: number;
  prefName: string;
};
export type Prefectures = {
  message: string | null;
  result: Prefecture[];
};
export type CompositonParams = {
  prefCode: number;
  cityCode: number | '-';
  addArea?: string;
};
export type Compositon = {
  label: string;
  data: { year: number; value: number; rate?: number }[];
};
export type Compositons = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: Compositon[];
  };
};

const api = axios.create({
  baseURL: 'https://opendata.resas-portal.go.jp/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': import.meta.env.VITE_API_KEY,
  },
});

const handleSuccess = (res: AxiosResponse) => Promise.resolve(res.data);
const handleError = (err: AxiosError) => Promise.reject(err);

const prefectures = () => api.get('/prefectures').then<Prefectures>(handleSuccess).catch(handleError);
const populationComposition = async (params: CompositonParams) => {
  return api
    .get<CompositonParams>('/population/composition/perYear', { params })
    .then<Compositons>(handleSuccess)
    .catch(handleError);
};

export default { prefectures, populationComposition };
