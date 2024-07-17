import FilterEstabeleciments from '@/components/marketplaces/filterEstabeleciments';
import Header from '@/components/Header/index';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'sonner';
import Table from '@/components/table';
import { Spinner } from '@nextui-org/react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import nextCookies from 'next-cookies'
import Paginator from '@/components/marketplaces/pagination';


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = nextCookies(context)

  const authRes = await axios.post(
    `https://api.zsystems.com.br/z1/autenticar`,
    { token }
  )

  if (authRes.data.success === false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const { id } = context.query
  const res = await axios.get(
    `https://api.zsystems.com.br/z1/marketplace/${id}/estabelecimentos?limit=30&page=1`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  return { props: { dataEstabeleciments: res.data.estabelecimentos } }
}


export default function Estabelecimentos({ dataEstabeleciments }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [token] = useState(Cookies.get('token'));
  const [estabeleciments, setEstabeleciments] = useState(dataEstabeleciments);
  const [data, setData] = useState({
    id_estabelecimento: '',
    identificacao_fatura: '',
    nome_fantasia: '',
    limit_page: 30,
    page: 1
  });

  const router = useRouter();
  const { id } = router.query;

  const fetchEstabeleciments = async () => {
    try {
      const res = await axios.get(
        `https://api.zsystems.com.br/z1/marketplace/${id}/estabelecimentos?limit=30&page=1`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success === true) {
        setEstabeleciments(res.data.estabelecimentos);
      } else {
        console.log(res.data.success);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const queryParams = {
    limit: data.limit_page,
    page: data.page,
    id_estabelecimento: data.id_estabelecimento,
    identificacao_fatura: data.identificacao_fatura,
    nome_fantasia: data.nome_fantasia,
  }
  const handleFilter = async () => {
    try {
      setEstabeleciments(null);
      const res = await axios.get(
        `https://api.zsystems.com.br/z1/marketplace/1/estabelecimentos`,
        {
          params: queryParams, headers: { Authorization: `Bearer ${token}` }
        },

      );
      if (res.data.success === true) {
        setEstabeleciments(res.data.estabelecimentos);
        console.log('Requisição bem-sucedida');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const auth = async () => {
    try {
      const res = await axios.post(`https://api.zsystems.com.br/z1/autenticar`, { token });
      if (res.data.success === false) {
        toast.error('Sua sessão expirou, faça login novamente');
        router.push('/');
      } else {
        fetchEstabeleciments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCleanFilter = () => {
    setData({
      id_estabelecimento: '',
      identificacao_fatura: '',
      nome_fantasia: '',
    });

  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <div className="max-w-screen w-full">
      <Header />
      <div className="w-full p-4 bg-gray-200">
        <FilterEstabeleciments
          onChange={handleChange}
          filtrar={handleFilter}
          limparFiltro={handleCleanFilter}
          data={data}
        />
        {estabeleciments !== null ? (
          <div className='gap-4 flex flex-col items-center justify-center'>
            <Table
              array={['Id', 'Nome', 'Nome na Fatura', 'Data de criação', '']}
              contentArray={['id', 'nome_fantasia', 'identificacao_fatura', 'created']}
              ColsBody={5}
              currentPage="estabelecimentosFilhos"
              data={estabeleciments}
            />
            <Paginator total={30} />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
