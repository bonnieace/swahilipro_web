import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
<div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="flex flex-col items-center text-center">
      
      <h1 className='mr-3 text-5xl font-semibold'>Swahilipro</h1>

      <div>Welcome to Swahilipro.Swahilipro is a compiler for a swahili based programming language that allows swahili speakers write executable code in their native language</div>

    <div className="flex mt-2 space-x-8 > * + *">
      <a href="https://pypi.org/project/swahilipro/">
      <Button  >Install Compiler</Button> 
      </a>
      <a href="https://github.com/bonnieace/swahilipro">
      <Button variant="outline">Contribute</Button>
      </a>
      </div>
      
  </div>
  </div>

</div>  )
}
