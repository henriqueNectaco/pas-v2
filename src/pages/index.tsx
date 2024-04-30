import Image from "next/image";
import logo from '../assets/logo.svg'
import { Input } from "@nextui-org/react";
import { set, useForm } from 'react-hook-form'
import React, { useState, useEffect } from 'react';
import { string, z } from 'zod'
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from 'js-cookie';



const userName = 'henriqueEz4568'


/*
const getData = async () => {
  try {
    const response = await axios.get('https://httpstat.us/200');
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
}

// Chamada da função
getData();
*/




const Formschema = z.object({
  email: z.string().email(),
  senha: z.string(),
});

type FormschemaData = z.infer<typeof Formschema>

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isloading, setIsloading] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [emailError, setEmailError] = useState('')

  const { register, handleSubmit, setValue, } = useForm<FormschemaData>({
    resolver: zodResolver(Formschema),
  })

  const onSubmit = () => {
    console.log('data');
  }
  // const loginApi = async (data: any) => {
  //   try {
  //     const response = await axios.post('https://api.zsystems.com.br/z1/login', {
  //       email: data.email,
  //       senha: data.password
  //     });
  //     console.log(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const loginApi = async (data: FormschemaData) => {
    console.log('caiu aqui')
    try {
      const response = await axios.post('https://api.zsystems.com.br/z1/login', data);
      // console.log(response)
      const token = response.data.usuario.token; // Supondo que o token esteja disponível na resposta da API
      //console.log(token);
      Cookies.set('token', token)
      console.log(Cookies)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setIsDisabled(!(email && password)); // O botão é desabilitado se o email ou a senha estiverem vazios
  }, [email, password])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError('') // Limpa o erro ao começar a digitar no campo
  }

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-screen flex justify-center items-center   " >
      <div className=" bg-white h-full sm:flex sm:flex-col sm:justify-center sm:items-center lg:w-4/6  lg:h-4/6 md:flex md:flex-col md:items-center md:justify-center md:h-5/6 sm:p-0
      lg:grid lg:grid-cols-2 border-2  rounded-xl ">
        <div className="lg:col-start-1 lg:col-end-2 flex justify-center items-center bg-white  lg:h-full p-6  ">
          <Image alt="teste" src={logo} width={400} height={300} />
        </div>
        <div className=" border-2 lg:col-start-2 lg:col-end-3 bg-white    max-w-screen-xl mx-auto w-full  h-full lg:flex sm:flex sm:flex-col sm:items-center sm:justify-center
       lg:flex-col lg:items-center lg:justify-center lg:p-12 p-4" >

          <div className=" flex flex-col items-center justify-center lg:w-full  lg:h-full max-w-screen-xl mx-auto w-full m-0 h-full  sm:h-full p-4 lg:pr-12 lg:pl-12">
            <h1 className="text-3xl lg:text-4xl">Entrar</h1>
            <form className="mt-2 w-full p-4 lg:p-0 ml-0 mr-0 h-full  flex flex-col  items-center justify-start lg:justify-center " onSubmit={handleSubmit(loginApi)}>
              <div className="w-full">
                <label htmlFor="email" className="block mb-2 lg:text-base">Email:</label>
                <Input type="email" variant={"underlined"} {...register('email')} onChange={(e) => setEmail(e.target.value)} />

              </div>
              <div className="w-full ">
                <label htmlFor="password" className="block mb-2 lg:text-base">Senha:</label>
                <Input type="password" variant={"underlined"} {...register('senha')} onChange={(e) => setPassword(e.target.value)} />

              </div>
              <div className=" lg:h-[15vh]  h-1/4 w-full flex flex-col items-center justify-center lg:justify-end lg:p-0 gap-2
              
              
              lg:gap-4">
                <Button type='submit' variant="ghost" color="primary" fullWidth={true} radius="sm" disabled={isDisabled} className="disabled:opacity-50 disabled:cursor-not-allowed">Entrar</Button>
                <Checkbox color="primary" radius='md'
                  size="md"
                  className="">Manter conectado?</Checkbox>
              </div></form>

          </div>
        </div>
      </div >
    </div >


  )
} 