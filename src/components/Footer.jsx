import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';


const Footer = () => {

  return (
    <div className="sticky top-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 bg-bordo text-white font-bold">
      <div className="sm:col-span-5 sm:col-start-2 mt-7 p-5 sm:p-0" id="contact">
          <h4 className="text-center text-2xl mb-2">Puede enviarnos un mensaje</h4>
          <form>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              className="text-sm bg-white border border-gray-300 text-gray-950 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            /> <br/>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="text-sm bg-white border border-gray-300 text-gray-950 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            /> <br/>
            <textarea
              name="message"
              id="message"
              cols="25"
              rows="5"
              placeholder="Write the message here ..."
              className="text-sm bg-white border border-gray-300 text-gray-950 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            ></textarea> <br/>
            <button type='submit' className="bg-rojo-claro w-full hover:bg-negro p-2 px-5 rounded-full text-white font-bold">
                  Send
              </button>
          </form>
        </div>
    
        <div className="text-base sm:col-span-4 sm:col-start-8 sm:text-right flex flex-col justify-end mt-7 ml-3">
          

          <div className="flex sm:justify-end sm:items-end sm:mt-20" >
            <ul className="sm:col-span-4 sm:col-start-8 mt-10 sm:mt-20">
              <li className="inline-block mr-3">
                <a href="https://www.whatsapp.com/" target="_blank" rel="noreferrer">
                  <FaWhatsapp className="w-10 h-10" />
                </a>
              </li>
              <li className="inline-block mr-3">
                <a href="https://www.instagram.com/gonzamaldonado.06/" target="_blank" rel="noreferrer">
                  <FaInstagram className="w-10 h-10" />
                </a>
              </li>
              <li className="inline-block mr-3">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" >
                  <FaFacebook className="w-10 h-10" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-sm sm:col-span-10 sm:col-start-2 text-center bg-negro p-3">
          <p>&copy; 2023 Portafolio. Todos los derechos reservados.</p>
        </div>
  </div>

  )
}

export default Footer