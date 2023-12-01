import React from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from 'react';
import { myHousingsReq, deleteHousingReq } from "../../api/housings";
import Loader from "../../components/Loader"
import  toast from "react-hot-toast"
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import AddHousing from './AddHousing';
import EditHousing from './EditHousing';

const Housings = () => {

  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editHousing, setEditHousing] = useState(0)
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['my_housings'],
    queryFn: myHousingsReq
  })

  const deleteHousingMutation = useMutation({
    mutationFn: deleteHousingReq,
    onSuccess: () => {
      queryClient.invalidateQueries(["my_housings"])
      toast.success("Housing deleted successfully")
    }, 
    onError: () => {
      toast.error("Failed to delete!");
    },
  })  

  return (
    <>

      {show ? (

        <AddHousing close={() => setShow(false)} />

      ) : (

          <>
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h5>
                  <span className="text-gray-300">All Housings:  {data?.length}</span>
                </h5>
              </div>
              <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <button 
                  onClick={() => setShow(true)}
                  type="button" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                  Add new housing
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">Housing</th>
                    <th scope="col" className="px-4 py-3">Address</th>
                    <th scope="col" className="px-4 py-3">City</th>
                    <th scope="col" className="px-4 py-3">Country</th>
                    <th scope="col" className="px-4 py-3">Price</th>
                    <th scope="col" className="px-4 py-3">Rating</th>
                    <th scope="col" className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>

                  {isLoading && <Loader/>}
                  {error && <>{toast.error(error.message)}</>}
                  {data?.length === 0 && <p className="text-lg text-slate-200 text-center my-2">No results</p>}

                  {data?.map((housing) => (

                    <React.Fragment key={housing.id}>                        

                        <>

                          <tr key={housing.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {housing.id}
                            <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {/*<img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} className="w-auto h-8 mr-3"/>
*/}
                              {housing.name}
                            </th>
                            <td className="px-4 py-2">
                              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                {housing.address}
                              </span>
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <div className="flex items-center">
                                <div className="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
                                {housing.city}
                              </div>
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true">
                                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                </svg>
                                {housing.country}
                              </div>
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">${housing.price_day}</td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <div className="flex items-center">
                                <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"  xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"  xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"  xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"  xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1 text-gray-500 dark:text-gray-400">
                                  {/*product.rating === null ? "0.0" : product.rating*/}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <div className="flex items-center space-x-4">
                                <BsFillTrashFill 
                                  onClick={() => {
                                    if (housing.id) {
                                      deleteHousingMutation.mutate(housing.id);
                                    }
                                  }}
                                  className="text-red-500 w-6 h-6 cursor-pointer hover:text-white"/>
                                <AiFillEdit 
                                    onClick={() => {
                                      setEdit(true)
                                      setEditHousing(housing.id)}}
                                  className="text-blue-500 w-6 h-6 cursor-pointer hover:text-white"/>
                              </div>
                            </td>
                          </tr>
        
              {edit && (
                <EditHousing param={editHousing} close={() => setEdit(false)} />
              )}
                        </>

                    </React.Fragment>

                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </>
        )}
    </>
  )
}

export default Housings