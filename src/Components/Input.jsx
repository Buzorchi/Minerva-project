import React from 'react'

const Input = ({type, label, className2, className, className3,className4, value, name, onChange, span, p}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={label} className= {`${className2} text-lg font-normal dark:text-white`} >
      {/* text-white font-light text-xl leading-normal tracking-[0.01875rem] */}
        {label} 
        <span className= {`${className3} text-[#FF0220] `}>{span}</span>
        <br /> 
        <p className= {`${className4} text-sm`}>{p}</p>
      </label>
      <input type={type} name={name} onChange={onChange} value ={value} className={`${className} h-[3rem]  pl-5  text-gray-900 text-base  `}/>
      {/* rounded-lg border-white w-[30rem] h-[3.3125rem] focus:border-[#BA68C8] */}
    </div>
  )
}

export default Input
