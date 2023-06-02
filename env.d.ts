/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_RESAS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
