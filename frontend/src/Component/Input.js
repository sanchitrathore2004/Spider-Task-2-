import React from 'react'

function Input({label, placeholder, value, setValue}) {
  return (
    <div className='w-full flex justify-center my-[0.5vmax] items-center'>
        <form>
            <div>
            <label className='text-white text-[1.3vmax] font-semibold'>{label}:</label></div>
            <div>
            <input onChange={(e)=>{
              setValue(e.target.value);
            }} className='rounded-[0.2vmax] text-[1.1vmax] text-black w-[20vmax] h-[2vmax] p-[0.5vmax]' placeholder={placeholder} type='text'></input></div>
        </form>
    </div>
  )
}

export default Input