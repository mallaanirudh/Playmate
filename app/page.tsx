
import Image from "next/image";
 const items = [
    { id: 1, image: '/tennis.png', description: 'Venues Listed' },
    { id: 2, image: '/tennis.png', description: 'Athletes Reached' },
    { id: 3, image: '/tennis.png', description: 'Cities Covered' },
    { id: 4, image: '/tennis.png', description: 'Tournaments Hosted' },
    { id: 5, image: '/tennis.png', description: 'Challenges Created' },
    { id: 6, image: '/tennis.png', description: 'Matches Played' },
  ]

export default function Home() {
  return (
    <>
    <img className= "landing" src="/landing.png" alt="picture"></img>
    <div >
      <h1 className ="text-6xl font-bold text-center"> 
        The <img src ="/playmate_word.png" className="w-48 h-auto inline"></img> Impact
      </h1>
       <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <img src={item.image} alt={item.description} className="w-40 h-32 object-cover rounded-xl mb-4" />
            <p className="text-lg font-medium">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    <img src ="/pen.png"></img>
    
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-8 bg-gray-100">
      
     
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img src="/tennis.png" alt="Example" className="w-80 h-auto rounded-xl shadow-lg" />
      </div>
      
      
      <div className="w-full md:w-1/2 text-center md:text-left px-4">
        <h1 className="text-4xl font-bold mb-4">From Gyms to Grounds-Find your spot</h1>
        <p className="text-lg mb-4">
          Discover and book top rated fitness studios,sports courts and open fields near you. Wheter you are 
          training solo or playing with friends, find the perfect space in seconds. Filter by sport, time and space
          .Get discovered by thousands of players looking for the perfect place to play.
        </p>
        <h1 className="text-4xl font-bold mb-4">List your Venue on PlayMate</h1>
        <p className="text-lg mb-4">
          Own a turf , court or a gym, or a training facility? Playmate helps to fill your slots faster.
          List your Venue, Set your Schedule, and start accepting bookings from athletes nearby. Get discovered by thousands
          of players looking for perfect place to play. 
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Go to Venues Section
        </button>
      </div>
      
    </div>

    </>
       
    
  );
}
