import React from 'react'

function Searchbar({label, placeholder, value, setValue}) {
  return (
    <div className='w-fit flex justify-center my-[0.5vmax] items-center'>
        <form className='flex gap-[1vmax]'>
            <div>
            <label className='text-white text-[1.6vmax] font-bold'>{label}:</label></div>
            <div>
            <input onChange={(e)=>{
              setValue(e.target.value);
            }} className='rounded-[0.2vmax] text-[1.1vmax] text-black w-[35vmax] h-[3vmax] p-[1vmax]' placeholder={placeholder} type='text'></input></div>
        </form>
    </div>
  )
}

export default Searchbar