import { useState, useEffect } from 'react';
import Select from 'react-select'
import { axi } from '../../api/authAxios'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHousingReq } from '../../api/housings';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';


// eslint-disable-next-line react/prop-types
const AddHousing = ({ close }) => {

    const [values, setValues] = useState({
      name: '',
      price_day: 0,
      address: '',
      city: '',
      country: '',
      description: '',
      capacity: 0,
      pets: true,
      services: []
    })
    const [servicesOptions, setServicesOptions] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    
    useEffect(() => {
      axi.get('/all_services/') // Obtener opciones de servicios disponibles
      .then(response => {
        setServicesOptions(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }, []);
    

    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      // Limit to 5 files
      if (files.length > 5) {
        alert('Solo se permite subir un máximo de 5 archivos');
        return;
      }
      setSelectedFiles(files);
    };

    const queryClient = useQueryClient();

    const addHousingMutation = useMutation({
      mutationFn: createHousingReq,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["my_housings"] });
        toast.success("Housing created successfully")
      },
      onError: () => {
        toast.error("Error!");
      },
    });

const handleSubmit = (event) => {
    event.preventDefault();
    addHousingMutation.mutate({
        name: values.name,
        address: values.address,
        city: values.city,
        country: values.country,
        description: values.description,
        services: values.services.map(service => service.value), //Enviando lista con ids de services
        capacity: values.capacity,
        pets: values.pets,
        price_day: parseInt(values.price_day),
        images: selectedFiles
    });
    close()
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setValues({ ...values, [name]: value });
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsHovered(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsHovered(false);
    };


    const removeImage = () => {
      setSelectedFiles([])
      setIsHovered(false)
    }

  if(addHousingMutation.isLoading) return (<Loader/>)

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-4/5 rounded-md">
        <div className="relative p-1 w-full h-full md:h-auto">

          <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 p-5 md:py-0 md:px-7">
            <div className="flex justify-end rounded-t">
              <button 
                onClick={close}
                type="button" className="rounded-lg text-sm p-1.5 hover:bg-gray-600 hover:text-white" data-modal-toggle="defaultModal">
                <svg aria-hidden="true" className="w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-2 mb-4 sm:grid-cols-6">

                <div className='col-span-3'>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input 
                    value={values.name} onChange={handleChange} required type="text" 
                    name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type housing name"/>
                </div>

                <div className='col-span-3'>
                  <label htmlFor="price_day" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input 
                    value={values.price_day} onChange={handleChange} required type="number"
                    min={0} name="price_day" id="price_day" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999"/>
                </div>

                <div className='col-span-2'>
                  <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                  <input 
                    value={values.address} onChange={handleChange} required type="text"
                    name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Belgrano N° 123"/>
                </div>

                <div className='col-span-2'>
                  <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">City</label>
                  <input 
                    value={values.city} onChange={handleChange} required type="text"
                    name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Salta"/>
                </div>

                <div className='col-span-2'>
                  <label htmlFor="country" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                  <input 
                    value={values.country} onChange={handleChange} required type="text"
                    name="country" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Argentina"/>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <input
                    value={values.description} onChange={handleChange} id="description"
                    name="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write housing description here"></input>                    
                </div>

                <div className="col-span-2">
                  <label htmlFor="services" className="block mb-1 text-sm font-medium text-white"> Services
                    <Select
                      isMulti id="services" name="services" className="block p-1 w-full text-sm rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      options={servicesOptions.map(service => ({ value: service.id, label: service.name }))}
                      value={values.services} onChange={handleChange} required
                    />
                    {/* selectedOptions => setServices(selectedOptions) */}
                  </label>                  
                </div>

                <div className="col-span-2">
                  <label htmlFor="capacity" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Capacity</label>
                  <input
                    value={values.capacity} onChange={handleChange} required type="number"
                    min={0} id="capacity" name="capacity" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"></input>                    
                </div>

                <div className="col-span-2 my-auto">
                  <label htmlFor="pets" className="text-sm font-medium text-white px-4">Pets</label>
                  <input
                    value={values.pets} onChange={handleChange} type='checkbox' defaultChecked
                    id="pets" name="pets" className="rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"></input>                    
                </div>

                <div className="col-span-6">
                  <div className="flex items-center justify-center w-full">
                    {selectedFiles.length === 0 ? (
                    <label
                      htmlFor="dropzone-file"
                      className={`flex flex-col items-center justify-center w-72 h-52 
                        border-2 border-gray-600 border-dashed rounded-lg 
                        cursor-pointer bg-gray-40 ${
                        isHovered ? 'bg-gray-600' : 'hover:bg-gray-600'
                      }`}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                    >
                      <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <div className="flex flex-col items-center justify-center py-6">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        type="file"
                        id="dropzone-file"
                        multiple={true}
                        onChange={handleFileChange}
                        required
                        className="absolute w-full h-[250px] opacity-0"
                      />
                    </label>
                    ) : (
                    <div>
                      {selectedFiles.map((file) => (
                        <img key={file.name} src={URL.createObjectURL(file)} alt={file.name} className='w-44 h-44 rounded object-cover inline m-1' />
                      ))}
                      <button 
                      onClick={removeImage}
                      type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      <span className="sr-only">Close modal</span>
                      </button>
                    </div>

                    )}
                  </div> 
                </div>
              </div>
              <button type="submit" className="text-white inline-flex items-center focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-center bg-bordo hover:bg-rojo-claro focus:ring-primary-800">
              <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              Add new housing
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddHousing