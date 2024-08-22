// import 'filepond/dist/filepond.min.css'
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from '@/components/ui/card'
// import { Checkbox } from '@nextui-org/checkbox'
// import { FormschemaCadastroMarketplace, typePropsCadastroMarketplace } from '@/lib/types/marketplaces'
// import { Button } from '@nextui-org/button'
// import { Input } from '@nextui-org/input'
// import React from 'react'
// import StepperComponent from './steper'
// import FilePonds from './filepond'
// import { z } from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { register } from 'module'

// export function CadastrarMarketplace(props: typePropsCadastroMarketplace) {

//   return (
//     <div className="flex flex-col items-center  h-full lg:max-h-screen bg-gray-200 p-4 ">
//       <form className="w-full max-w-7xl"  >
//         <Card className="w-full max-w-7xl bg-white ">
//           <CardHeader className="pb-4">
//             <CardTitle className="flex items-center justify-center ">
//               Cadastrar MarketPlace (Zoop)
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className=" hidden xl:flex md:flex lg:flex w-full border-b border-black  items-center  justify-center lg:mb-6">
//               <StepperComponent stepsData={props.stepsData} activeStep={props.activeStep} />
//             </div>

//             {props.activeStep === 0 ? (
//               <>
//                 <div className="flex flex-col lg:grid lg:grid-cols-2  gap-6 p-6 pt-2 ">

//                   <Input

//                     onChange={props.onChange}
//                     name='nome'
//                     value={props.data.nome}
//                     placeholder={'Nome'}
//                     required={true}
//                     variant="underlined"
//                     labelPlacement="inside"
//                   />

//                   <Input
//                     value={props.data.zoopMarketplaceId}
//                     onChange={props.onChange}
//                     name='zoopMarketplaceId'
//                     placeholder={'Zoop Marketplace Id'}
//                     required={true}
//                     variant="underlined"
//                     labelPlacement="inside"
//                   />

//                   <Input
//                     onChange={props.onChange}
//                     name='dominio'
//                     value={props.data.dominio}
//                     placeholder={'Dominio'}
//                     required={true}
//                     variant="underlined"
//                     labelPlacement="inside"
//                   />

//                   <Input
//                     value={props.data.mainSellerId}
//                     onChange={props.onChange}
//                     name='sellerId'
//                     placeholder={'mainSellerId'}
//                     required={true}
//                     variant="underlined"
//                     labelPlacement="inside"
//                   />
//                   <div>
//                     <Input

//                       //value={props.data.website}
//                       //onChange={props.onChange}
//                       name='website'
//                       placeholder={'Website'}
//                       required={true}
//                       variant="underlined"
//                       labelPlacement="inside"
//                     />

//                   </div>
//                   <Input
//                     value={props.data.zpk}
//                     onChange={props.onChange}
//                     name='zpk'
//                     placeholder={'zpk'}
//                     required={true}
//                     variant="underlined"
//                     labelPlacement="inside"
//                   />
//                   {props.data.cobrancaPorTransacao === true && (<>
//                     <Input
//                     //  value={props.data.cobrancaValor}
//                       onChange={props.onChange}
//                       name='cobrancaValor'
//                       placeholder={'Valor da Cobrança*'}
//                       required={true}
//                       variant="underlined"
//                       labelPlacement="inside"
//                       type='number'
//                     />

//                     <Input
//                       value={props.data.cobrancaEmail}
//                       onChange={props.onChange}
//                       name='cobrancaEmail'
//                       placeholder={'Email da Cobrança*'}
//                       required={true}
//                       variant="underlined"
//                       labelPlacement="inside"
//                     /></>
//                   )}

//                 </div>

//                 <div className="p-6  flex flex-col justify-start lg:flex lg:flex-row gap-4 ">
//                   <div className="flex items-center lg:justify-center justify-start space-x-2 ">
//                     <Checkbox name='cobrancaPorTransacao' onChange={props.onChange}>Cobrança por transação</Checkbox>
//                   </div>
//                   <div className="flex items-center lg:justify-center space-x-2 justify-start">
//                     <Checkbox name='taxaAdministrativa' onChange={props.onChange}>Taxa Administrativa</Checkbox>
//                   </div>
//                   <div className="flex items-center lg:justify-center space-x-2 justify-start">
//                     <Checkbox name='carne' onChange={props.onChange}>Carnê</Checkbox>
//                   </div>
//                 </div>
//               </>
//             ) : null}
//             {props.activeStep === 1 ? (

//               <> <div className=' lg:w-2/6 w-full'>
//                 <span>Cor do estabelecimento</span>
//                 <Input variant='flat' onChange={props.onChange} name='color' type="color" />
//               </div>
//                 <div className=' lg:grid-cols-3 lg:grid h-full '>
//                   <div className='h-full p-2'>
//                     <h1 className='flex justify-center items-center font-bold'>Logo</h1>
//                     <FilePonds titulo=' Logo' files={props.filesLogo} setFiles={props.setFilesLogo} />
//                   </div>
//                   <div className='h-full p-2'>
//                     <h1 className='flex justify-center items-center font-bold'>Loader</h1>
//                     <FilePonds titulo='Loader' files={props.filesLoader} setFiles={props.setFilesLoader} />
//                   </div>
//                   <div className='h-full p-2'>
//                     <h1 className='flex justify-center items-center font-bold'>FavIcon</h1>

//                     <FilePonds titulo='FavIcon' files={props.filesFavIcon} setFiles={props.setFilesFavIcon} />
//                   </div>

//                 </div>

//               </>) : null}
//             {props.activeStep === 2 ? (<>

//             </>
//             ) : null}
//             {props.activeStep === 3 ? <p>step 4</p> : null}

//           </CardContent>
//           <CardFooter className="flex justify-center lg:justify-end space-x-4">
//             {props.activeStep !== 0 && (<Button
//               variant="bordered"
//               radius="sm"
//               color="primary"
//               isLoading={props.isLoading}
//               onClick={props.handlePrevStep}
//             >
//               Voltar
//             </Button>)}

//             <Button
//               isLoading={props.isLoading}
//               onClick={props.onClickNextStep}
//               variant="bordered"
//               radius="sm"
//               color="primary"
//               type={props.activeStep === 2 ? 'submit' : 'Next'}
//             >
//               Próximo
//             </Button>
//           </CardFooter>
//         </Card></form>
//     </div >
//   )
// }
