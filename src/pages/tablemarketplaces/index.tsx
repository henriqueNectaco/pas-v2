import Header from '../../components/Header/index'
import { useState, useEffect } from 'react'
import { CaretDown } from 'phosphor-react'
import ListMarketplaces from '../marketplaces/listMarketplaces'
import axios from 'axios'
import Cookies from 'js-cookie'

import TableTestes from './table'

export default function mktteste() {
  const [res, setResData] = useState()
  const token = Cookies.get('token')
  const getServerSideDate = async () => {
    try {
      const res = await axios.get(
        `https://api.zsystems.com.br/z1/marketplaces?status=ativo`,
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setResData(res.data.marketplaces)
      console.log('res.data sem filtro', res.data.marketplaces)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getServerSideDate()
  }, [])
  return (
    <div className=" h-full max-w-screen w-full flex flex-col items-center bg-gray-50 ">
      <Header />
      <TableTestes marketplace={res} />
    </div>
  )
}

/*

import { CaretDown } from 'phosphor-react'
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from '@nextui-org/react'


*/
