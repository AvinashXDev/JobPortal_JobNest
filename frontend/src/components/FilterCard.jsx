import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Button } from './ui/button'

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])

  return (
    <>
      {/* Toggle button for mobile */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filter Container */}
      <div className={`bg-white p-4 rounded-md shadow-sm w-full ${isOpen ? "block" : "hidden"} lg:block`}>
        <h1 className='font-semibold text-xl mb-3'>Filter Jobs</h1>
        <hr className='mb-4' />

        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          <div className="flex flex-col lg:flex-col gap-6">
            {fitlerData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-col gap-2"
              >
                <h2 className='font-medium text-base'>{data.fitlerType}</h2>
                <div className="flex flex-row lg:flex-col flex-wrap gap-4 overflow-x-auto">
                  {data.array.map((item, idx) => {
                    const itemId = `id${index}-${idx}`
                    return (
                      <div className='flex items-center space-x-2' key={itemId}>
                        <RadioGroupItem value={item} id={itemId} />
                        <Label htmlFor={itemId} className='text-sm'>{item}</Label>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </>
  )
}

export default FilterCard


