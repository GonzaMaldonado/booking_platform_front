import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { updateHousingReq, myHousingReq } from '../../api/housings';
import Loader from '../../components/Loader';
import { toast } from 'react-hot-toast';


const baseURL = import.meta.env.VITE_BACKEND_URL


// eslint-disable-next-line react/prop-types
const EditHousing = ({ param, close }) => {

    const [values, setValues] = useState({
    name: '',
    countInStock: 1,
    category: '',
    slug: '',
    description: '',
    price: 0
  });

    const [image, setImage] = useState(null);
    const [filePreview, setFilePreview] = useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const queryClient = useQueryClient();

    const { data } = useQuery({
      queryFn: () => myHousingReq(param),
      queryKey: ['my_housing']
    });


useEffect(() => {
        if (data) {
            setValues({
                name: data.name,
                countInStock: data.count_in_stock,
                category: data.category,
                slug: data.slug,
                description: data.description,
                price: data.price
            })
            setFilePreview(`${baseURL}${data.image}`)
        }
        }, [data]);


const editHousingMutation = useMutation({
    mutationFn: updateHousingReq,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["my_housing"] });
        toast.success("Housing updated!");
    },
    onError: () => {
        toast.error("Failed to update!");
    },
});

const handleSubmit = (event) => {
    event.preventDefault();
    editHousingMutation.mutate({
        id: param,
        name: values.name,
        count_in_stock: values.countInStock,
        category: values.category,
        description: values.description,
        price: values.price,
        image: image,
        slug: values.slug
    });
close()
    };
    console.log(image, filePreview);
    

const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

const handleCountChange = (event) => {
    const newNumber = parseInt(event.target.value, 10);
    setValues({...values, ['countInStock']: newNumber});
};

const handlePriceChange = (event) => {
    const newNumber = parseInt(event.target.value, 10);
    setValues({...values, ['price']: newNumber});
};

const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
        setImage(file)
        setFilePreview(reader.result)
      };
      reader.readAsDataURL(file);
    }
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
    setFilePreview('')
    setImage(null)
    setIsHovered(false)
}


if(editHousingMutation.isLoading) return (<Loader/>)

return (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full sm:w-5/6 rounded-md">
            <div className="relative p-2 w-full h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Housing
            </h3>
            <button 
            onClick={close}
            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close modal</span>
            </button>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="grid gap-3 mb-3 sm:grid-cols-2">

            <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
    <input 
    value={values.name}
    onChange={handleChange}
    type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name"/>
    </div>

    <div>
    <label htmlFor="count_in_stock" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Count in Stock</label>
    <input 
    value={values.countInStock}
    onChange={handleCountChange}
    type="number" name="count_in_stock" id="count_in_stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Count in Stock"/>
    </div>

    <div>
    <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Price</label>
    <input 
    value={values.price}
    onChange={handlePriceChange}
    type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999"/>
    </div>

    <div>
    <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Category</label>
    <input 
    value={values.category}
    onChange={handleChange}
    type="text" name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Category"/>
    </div>

    <div className="sm:col-span-2">
    <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
    <input
    value={values.description}
    onChange={handleChange}
    id="description" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write product description here"></input>                    
    </div>


    <div className="sm:col-span-2">
    <div className="flex items-center justify-center w-full">
    {image === null && filePreview == '' ? (
              <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full md:w-3/4 h-64 mx-auto
              border-2 border-gray-600 border-dashed rounded-lg 
              cursor-pointer bg-gray-40 ${isHovered ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              >
              <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
              </svg>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
              </div>
              <input
              ref={inputRef}
              type="file"
              id="dropzone-file"
              multiple={true}
              onChange={handleFileChange}
              className="absolute w-full h-[300px] opacity-0"
              />
              </label>
              ) : (
                <div className='w-5/6 sm:w-3/5 mx-auto flex justify-center'>
                  <div>
                    <button 
                      onClick={removeImage}
                      type="button" className="absolute bg-gray-700 text-gray-20 hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm ml-auto -m-1 p-1 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <img
                      className='h-40 w-40 rounded-full object-cover'
                      src={filePreview || image}
                      alt="Imagen seleccionada"
                    />
                  </div>
                </div>

              )}
    </div> 
    </div> 


    </div>
    <button type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
    <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
    Edit product
    </button>
    </form>
    </div>
    </div>
    </div>
    </div>
    )
    }

export default EditHousing