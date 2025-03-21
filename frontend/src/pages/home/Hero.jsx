import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8'>
        <div className='md:w-1/2 w-full items-center'>
            <h1 className='md:text-5xl text-3xl font-bold md:leading-tight'>Hotels With Rooftop Pools Near Me</h1>
            <p className='py-4'>
                
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus vel similique commodi beatae praesentium, minus, numquam, voluptatem non aspernatur quaerat cupiditate provident saepe obcaecati ullam eveniet illo veritatis sunt dolore!
            </p>
        </div>
      
      <div className='md:w-1/2 w-full mx-auto'>
            Image Swiper
      </div>
    </div>
  )
}

export default Hero
