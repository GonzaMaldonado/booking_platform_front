import { useQuery } from '@tanstack/react-query'
import { housingsReq } from '../api/bookings'
import Loader from '../components/Loader'
import Banner from '../assets/banner.jpeg'

const baseURL = import.meta.env.VITE_BACKEND_URL

const Home = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ['housings'],
    queryFn: housingsReq,
  });

  let listHousings
  if (data) {
    listHousings = data.map(housing =>
      <article key={housing.id} className="mx-auto justify-center items-center">
        <div className="h-16 lg:h-20 w-16 lg:w-20 rounded-2xl mx-auto">
          <img className="h-full w-full object-cover rounded-3xl bg-slate-700" src={`${baseURL}${housing.image}`} alt={housing.name} />
        </div>
        <p className='text-center text-white font-bold'>{housing.name}</p>
      </article>
    )
  }


  return (
    <main>
      <section>
        <h1 className="text-4xl font-serif font-bold text-center my-2">Haga sus reservas aquí ctm ;)</h1>
        <div className="relative w-full h-52">
          <img src={Banner} alt="imagen banner" className="opacity-40 absolute w-full h-full object-cover" />
          <div className="absolute p-5">
            <p>Holaaa</p>
          </div>
        </div>
      </section>
      {isLoading && (<Loader />)}
      {error ? (
        <h2 className='text-2xl text-center'>Ocurrio un error al cargar bookings</h2>
      ) : (
        <section className="grid grid-cols-2 gap-3 mt-10">
          {listHousings}
          <article className="bg-black opacity-50 h-56">A1</article>
          <article className="bg-black opacity-50 h-56">A2</article>
          <article className="bg-black opacity-50 h-56">A2</article>
          <article className="bg-black opacity-50 h-56">A2</article>
          <article className="bg-black opacity-50 h-56">A2</article>
          <article className="bg-black opacity-50 h-56">A2</article>
        </section>
      )}
    </main>
  )
}

export default Home