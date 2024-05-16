





export default function TableTestes(){

 return(


  <div className="max-w-screen w-full h-full ">

  <div className="p-5 h-screen bg-gray-100">
    <h1 className="text-xl mb-2">Your orders</h1>
 
    <div className="overflow-auto rounded-lg shadow hidden md:block border-2 border-blue-500">
      <table className="w-full">
        <thead className="w-4/5  border-b-2 border-2 border-black ">
        <tr className=" w-full  border-2 ">
          <th className="border-2  p-3 text-sm font-semibold tracking-wide text-left">Id</th>
          <th className="border-2 w-1/4     p-3 text-sm font-semibold tracking-wide text-left">Id EC</th>
          <th className="border-2  p-3 text-sm font-semibold tracking-wide text-left">MarketPlace</th>
          <th className="border-2  p-3 text-sm font-semibold tracking-wide text-left">Email</th>
          
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
        <tr className="bg-white">
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            <a href="#" className="font-bold text-blue-500 hover:underline">10001</a>
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            Kring New Fit office chair, mesh + PU, black
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap flex flex-col items-start ">
          <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            <a href="#" className="font-bold text-blue-500 hover:underline">10002</a>
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Kring New Fit office chair, mesh + PU, black</td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">Shipped</span>
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td>
        </tr>
        <tr className="bg-white">
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            <a href="#" className="font-bold text-blue-500 hover:underline">10002</a>
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Kring New Fit office chair, mesh + PU, black</td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">Cancelled</span>
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td>
        </tr>
        </tbody>
      </table>
    </div>
 
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
      <div className="bg-white space-y-3 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2 text-sm">
          <div>
            <a href="#" className="text-blue-500 font-bold hover:underline">#1000</a>
          </div>
          <div className="text-gray-500">10/10/2021</div>
          <div>
            <span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          Kring New Fit office chair, mesh + PU, black
        </div>
        <div className="text-sm font-medium text-black">
          $200.00
        </div>
      </div>
      <div className="bg-white space-y-3 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2 text-sm">
          <div>
            <a href="#" className="text-blue-500 font-bold hover:underline">#1001</a>
          </div>
          <div className="text-gray-500">10/10/2021</div>
          <div>
            <span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">Shipped</span>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          Kring New Fit office chair, mesh + PU, black
        </div>
        <div className="text-sm font-medium text-black">
          $200.00
        </div>
      </div>
      <div className="bg-white space-y-3 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2 text-sm">
          <div>
            <a href="#" className="text-blue-500 font-bold hover:underline">#1002</a>
          </div>
          <div className="text-gray-500">10/10/2021</div>
          <div>
            <span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">Canceled</span>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          Kring New Fit office chair, mesh + PU, black
        </div>
        <div className="text-sm font-medium text-black">
          $200.00
        </div>
      </div>
    </div>
  </div>


  </div>
 )   
}