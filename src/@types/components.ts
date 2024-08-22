import { FilePondFile, ActualFileObject, FilePondInitialFile } from 'filepond'
import { Dispatch, SetStateAction } from 'react'
export type typeDataRenovarCache = {
  date: string | null
}
export type typePropsDropDownMenuCache = {
  title: string
  items: Array<string>
  setData: Dispatch<SetStateAction<typeDataRenovarCache>>
}

export type typeFilePond = {
  handleUpdateFiles: (fileItems: FilePondFile[]) => void
  // setFiles: React.Dispatch<SetStateAction<ActualFileObject[]>>
  files: (string | Blob | ActualFileObject | FilePondInitialFile)[] | undefined
  titulo: string
  name: string
  required?: boolean
}
export type paginatorProps = {
  onCickPrevious: () => void
  onClickNext: () => void
  page: number
  total: number
  onChangeCurrentPage: Dispatch<SetStateAction<number>>
}
