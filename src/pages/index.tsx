import Image from 'next/image'
import logo from '../assets/logo.svg'
import { Input, Button, Checkbox } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeSlash, Eye } from 'phosphor-react'

// Esquema de validação com Zod
const Formschema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})
type FormschemaData = z.infer<typeof Formschema>

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormschemaData>({
    resolver: zodResolver(Formschema),
    mode: 'onChange', // Isso permitirá que a validação ocorra a cada mudança no formulário
  })

  const router = useRouter()

  const onSubmit = async (data: FormschemaData) => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        'https://api.zsystems.com.br/z1/login',
        data,
      )
      if (response.data.success === true) {
        setIsLoading(false)
        Cookies.set('token', response.data.usuario.token)
        toast.success('Login realizado com sucesso!')

        router.push('/dashboard')
      } else {
        setIsLoading(false)
        toast.error('Login não encontrado')
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      toast.error('Algo inesperado aconteceu')
    }
  }

  const auth = async () => {
    try {
      const response = await axios.post(
        'https://api.zsystems.com.br/z1/autenticar',
        { token: Cookies.get('token') },
      )
      if (response.data.success === true) {
        toast.success('Login Encontrado')
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    auth()
  })

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-screen flex justify-center items-center p-4">
      <div className=" h-full md:h-4/6 lg:w-4/6 lg:h-4/6 shadow-2xl bg-white  sm:flex sm:flex-col sm:justify-center sm:items-center  md:flex md:flex-col md:items-center md:justify-center  sm:p-0 lg:grid lg:grid-cols-2  lg:rounded-md">
        <div className=" lg:rounded-2xl lg:col-start-1 lg:col-end-2 flex justify-center items-center bg-white lg:h-full p-4  ">
          <Image
            quality={100}
            alt="teste"
            src={logo}
            width={400}
            height={300}
          />
        </div>
        <div className="border-l-2  border-gray-300 rounded-r-2xl lg:col-start-2 lg:col-end-3 bg-white max-w-screen-xl mx-auto w-full h-full lg:flex sm:flex sm:flex-col sm:items-center sm:justify-center lg:flex-col lg:items-center lg:justify-center lg:p-8 lg:pt-12 p-4">
          <div className="flex flex-col items-center justify-center  lg:w-full lg:h-full max-w-screen-xl mx-auto w-full m-0 h-full sm:h-full p-4 ">
            <h1 className="text-3xl lg:text-4xl">Entrar</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="  mt-2 w-full p-4   h-full flex flex-col items-center justify-start lg:justify-center "
            >
              <div className=" w-full lg:p-4 flex flex-col gap-3">
                <label htmlFor="email" className="block lg:text-base">
                  Email:
                </label>
                <Input
                  type="email"
                  variant="underlined"
                  {...register('email')}
                  required={true}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm lg:text-md">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="w-full lg:p-4  flex flex-col gap-3 ">
                <label htmlFor="password" className="  lg:text-base">
                  Senha:
                </label>
                <Input
                  required={true}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <EyeSlash
                          size={30}
                          className="text-2xl text-default-400 pointer-events-none"
                        />
                      ) : (
                        <Eye
                          size={30}
                          className="text-2xl text-default-400 pointer-events-none"
                        />
                      )}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'}
                  variant="underlined"
                  {...register('senha')}
                />
                {errors.senha && (
                  <span className="text-red-500 text-sm lg:text-md">
                    {errors.senha.message}
                  </span>
                )}
              </div>
              <div className=" lg:p-4 lg:h-[15vh] h-1/4 w-full flex flex-col items-center justify-center lg:justify-end  gap-2 lg:gap-4 ">
                <Button
                  type="submit"
                  variant="ghost"
                  color="primary"
                  fullWidth={true}
                  isLoading={isLoading}
                  radius="sm"
                  disabled={!isValid || isLoading}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Entrar
                </Button>
                <Checkbox color="primary" radius="md" size="md" className="">
                  Manter conectado?
                </Checkbox>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
