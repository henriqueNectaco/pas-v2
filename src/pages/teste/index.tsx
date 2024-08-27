import DateRangeWithTimer from '@/components/dateRangePickerWithTimer'
import { api } from '../api/useApi'
import { useEffect } from 'react'
export default function Teste() {
  const teste = async () => {
    try {
      const res = await api.get('/crons/logs')
      console.log(res.data.cronsLogs)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    teste()
  }, [])
  return (
    <div className="max-w-screen  h-screen bg-gray-50">
      <>
        {/* <FilePondComponents /> */}
        <DateRangeWithTimer />
      </>
    </div>
  )
}
