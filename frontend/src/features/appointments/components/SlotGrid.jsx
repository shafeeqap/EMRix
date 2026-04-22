import React from 'react'
import { Button } from '../../../components/ui'

const SlotGrid = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4 py-5 px-5 bg-white border border-gray-300 rounded">
    <Button>09:00</Button>
    <Button>09:00</Button>
    <Button>09:00</Button>
    <Button>09:00</Button>
    <Button>09:00</Button>
    <Button>09:00</Button>
    <Button>09:00</Button>
    <Button>09:00</Button>
    <Button>09:00</Button>
    <Button>09:00</Button>
  </div>
  )
}

export default SlotGrid