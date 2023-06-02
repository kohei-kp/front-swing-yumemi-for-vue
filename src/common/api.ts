import axios, { AxiosError, AxiosResponse } from 'axios'

export type Prefecture = {
  prefCode: number
  prefName: string
}

export type Prefectures = Prefecture[]

export type PopulationCompositionParams = {
  prefCode: number
  cityCode: number | '-'
  addAre?: string
}

export type PopulationComposition = {
  label: string
  data: { year: number; value: number; rate?: number }[]
}

export type PopulationCompositions = {
  boundaryYear: number
  data: PopulationComposition[]
}
export type ApiResponse<T> = {
  message: string | null
  result: T
}

const api = axios.create({
  baseURL: 'https://opendata.resas-portal.go.jp/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY
  }
})

const handleSuccess = <T>(response: AxiosResponse<ApiResponse<T>>) => Promise.resolve(response.data)
const handleError = (error: AxiosError) => Promise.reject(error)

export async function prefectures(): Promise<ApiResponse<Prefectures>> {
  return api.get<ApiResponse<Prefectures>>('/prefectures').then(handleSuccess).catch(handleError)
}

export async function populationComposition(
  params: PopulationCompositionParams
): Promise<ApiResponse<PopulationCompositions>> {
  return api
    .get<ApiResponse<PopulationCompositions>>('/population/composition/perYear', { params })
    .then(handleSuccess)
    .catch(handleError)
}

export default {
  prefectures,
  populationComposition
}
