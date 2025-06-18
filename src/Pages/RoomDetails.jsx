import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets';
import Starrating from '../Components/Starrating';
import Testimonial from '../Components/Testimonial';

const RoomDetails = () => {
      const {id} = useParams()
      const [room, SetRoom] = useState(null);
      const [mainImage,SetMainImage] = useState(null)

      useEffect(()=>{
        const room = roomsDummyData.find(room => room._id === id)
        room && SetRoom(room)
        room && SetMainImage(room.images[0])
      },[])


      {/* Form functions */} 
      const [rooms, setRooms] = useState(1);
        const [guests, setGuests] = useState(1);
      
        const handleRoomChange = (e) => {
          const value = parseInt(e.target.value) || 1;
          setRooms(value);
      
          // Adjust guests if necessary
          const maxGuests = value * 2;
          if (guests > maxGuests) {
            setGuests(maxGuests);
          }
        };
      
        const handleGuestChange = (e) => {
          const value = parseInt(e.target.value) || 1;
          const maxGuests = rooms * 2;
      
          if (value > maxGuests) {
            window.alert("Please add more rooms to accommodate additional guests.");
          
          }
      
          setGuests(value);
        };
      


  return room && (

    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
       {/*Room Details */}
       <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
        <h1 className='text-3xl md:text-4xl font-playfair'>{room.roomType}</h1>
       </div>
       {/*Room Rating */}
       <div className='flex items-center gap-1 mt-2'>
        <Starrating/>
        <p className='ml-2'>100+ reviews</p>
       </div>

       {/*Room Address*/}
       <div className='flex items-center gap-1 text-gray-500 mt-2'>
        <img src={assets.locationIcon} alt='location-icon'/>
        <span>{room.hotel.address}</span>
       </div>
       {/* Room Images */}
       <div className='flex flex-col lg:flex-row mt-6 gap-6'>
        <div className='lg:w-1/2 w-full'>
        <img src={mainImage} alt='Room Image' className='w-full rounded-xl shadow-lg object-cover'/>
       </div>
       <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full' >
        {room?.images.length > 1 && room.images.map((image,index)=>(
            <img onClick={()=>SetMainImage(image)} key={index} src={image} alt='Room Image' className={`w-full rounded-xl shadow-md object-cover
            cursor-pointer ${mainImage==image && 'outline-3 outline-orange-500'}`}/>
        ))}
        </div>
       </div>

       {/*Room Highlights */}
       <div className='flex flex-col md:flex-row md:justify-between mt-10'>
         <div className='flex flex-col'>
            <h1 className='text-3xl text-black text-bold md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
            <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                {room.amenities.map((item,index)=>(
                    <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                       <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                       <p className='text-xs'>{item}</p>
                    </div>
                ))}
            </div>
         </div>
         {/*Room Price */}
         <p className='text-2xl font-medium'>Rs{room.pricePerNight}/night</p>
       </div>
       {/* CheckIn CheckOut form*/ }
       <form className="flex flex-col md:flex-row items-start md:items-center
       justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
         onSubmit={(e) => {
           e.preventDefault();
           const today = new Date().setHours(0, 0, 0, 0);
           const checkInDate = new Date(e.target.checkIn.value).setHours(0, 0, 0, 0);
           const checkOutDate = new Date(e.target.checkOut.value).setHours(0, 0, 0, 0);
       
           if (checkInDate < today) {
             alert("Check-in date cannot be before today.");
             return;
           }
       
           if (checkInDate >= checkOutDate) {
             alert("Check-out date must be after check-in date.");
             return;
           }
       
           // Proceed with availability check
           alert("Form submitted successfully!");
         }}
         
       ><div className="flex flex-col">
         <label htmlFor="rooms" className="text-sm font-medium">Rooms</label>
       
         {/* Mobile: Increment/Decrement buttons */}
         <div className="flex md:hidden items-center gap-2 mt-1">
           <button
             type="button"
             className="bg-gray-200 px-3 py-1 rounded text-lg"
             onClick={() => setRooms(prev => Math.max(1, prev - 1))}
           >−</button>
           <span className="px-3">{rooms}</span>
           <button
             type="button"
             className="bg-gray-200 px-3 py-1 rounded text-lg"
             onClick={() => setRooms(prev => Math.min(10, prev + 1))}
           >+</button>
         </div>
       
         {/* Desktop: Regular input */}
         <input
           min={1}
           max={10}
           id="rooms"
           type="number"
           value={rooms}
           onChange={handleRoomChange}
           className="hidden md:block rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none max-w-[100px]"
         />
       </div>
       
         <div className="flex flex-col">
           <label htmlFor="checkIn" className="text-sm font-medium">Check in</label>
           <input
             id="checkIn"
             type="date"
             className="rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none"
             min={new Date().toISOString().split("T")[0]} // today's date
             required
           />
         </div>
       
         <div className="flex flex-col">
           <label htmlFor="checkOut" className="text-sm font-medium">Check out</label>
           <input
             id="checkOut"
             type="date"
             className="rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none"
             required
           />
         </div>
           <div className="flex flex-col">
         <label htmlFor="guests" className="text-sm font-medium">Guests</label>
       
         {/* Mobile: Increment/Decrement buttons */}
         <div className="flex md:hidden items-center gap-2 mt-1">
           <button
             type="button"
             className="bg-gray-200 px-3 py-1 rounded text-lg"
             onClick={() => setGuests(prev => Math.max(1, prev - 1))}
           >−</button>
           <span className="px-3">{guests}</span>
           <button
             type="button"
             className="bg-gray-200 px-3 py-1 rounded text-lg"
             onClick={() => {
               const maxGuests = rooms * 2;
               if (guests < maxGuests) setGuests(prev => prev + 1);
               else alert("Add more rooms to accommodate more guests.");
             }}
           >+</button>
         </div>
       
         {/* Desktop: Regular input */}
         <input
           min={1}
           max={rooms * 2}
           id="guests"
           type="number"
           value={guests}
           onChange={handleGuestChange}
           className="hidden md:block rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none max-w-[100px]"
           placeholder="1"
         />
       </div>
       
          <div className='flex flex-col  gap-2 hidden md:flex-row '>
           <label for="cars" className="text-sm font-medium">Room Type</label>
       
       <select name="room" id="room"   className="rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none max-w-[100px]">
         <option value="Delux">{room.roomType}</option>
        
        
       </select>
          </div>
         <button
           type="submit"
           className="flex items-center justify-center gap-2 rounded-md bg-black py-3 px-4 text-white cursor-pointer max-md:w-full max-md:py-2 transition duration-300 hover:bg-gray-900"
         >
           <img src={assets.searchIcon} alt="" className="h-5" />
           <span>Continue Booking</span>
         </button>
       </form>
       {/* Common Specifications */}
       <div className='mt-25 space-y-4'>
        {roomCommonData.map((spec,index)=>(
            <div key={index} className='flex items-start gap-2'>
                <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5'/>
                <div>
                    <p className='text-base'>{spec.title}</p>
                    <p className='text-gray-500'>{spec.description}</p>
                </div>
            </div>
        ))}
       </div>
       <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
           <p className="text-gray-600 mb-4">
            Booking terms=50% advance payment is required before booking the room.

Cancellation policy-=If you cancel your booked room within seven days, you will only get a refund of 50% of the advance amount you paid. After seven days, the advance amount will not be refunded.
            </p>
       </div>
 <div className="w-full h-full mt-10">
  <h2 className="text-2xl font-semibold mb-4">Resort Location</h2>
  <div className="w-full h-[400px] rounded-xl overflow-hidden">
    <iframe
      title="Coral Creek Resort Location"
       src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d84344.10455421753!2d92.81056134972992!3d12.18403714266162!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x308f37d7893d6ce5%3A0x3fbcaa8f58c60e44!2sOYO%2061587%20Coral%20Creek%20Resort!5e0!3m2!1sen!2sin!4v1749767364854!5m2!1sen!2sin" 
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>


    </div>
  )
}

export default RoomDetails
