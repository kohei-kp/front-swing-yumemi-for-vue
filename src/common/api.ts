import axios, { AxiosError, AxiosResponse } from 'axios';

export type Prefecture = {
  prefCode: number;
  prefName: string;
};
export type Prefectures = {
  message: string | null;
  result: Prefecture[];
};
export type PopulationCompositonParams = {
  prefCode: number;
  cityCode: number | '-';
  addArea?: string;
};
export type PopulationComposition = {
  label: string;
  data: { year: number; value: number; rate?: number }[];
};
export type PopulationCompositions = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: PopulationComposition[];
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

const prefectures = () => api.get<Prefectures>('/prefectures').then(handleSuccess).catch(handleError);
const populationComposition = async (params: PopulationCompositonParams) => {
  return api
    .get<PopulationCompositions>('/population/composition/perYear', { params })
    .then(handleSuccess)
    .catch(handleError);
};

export default { prefectures, populationComposition };
