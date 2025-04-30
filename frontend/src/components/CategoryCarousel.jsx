import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-6 md:my-10">
      <h2 className="text-lg sm:text-xl font-medium mb-4 text-center">Popular Categories</h2>
      
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="px-2">
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="basis-4/5 sm:basis-2/5 md:basis-1/3 lg:basis-1/4 p-1"
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="w-full h-12 rounded-full text-sm sm:text-base border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden sm:block">
            <CarouselPrevious className="bg-white shadow-md hover:bg-gray-100" />
            <CarouselNext className="bg-white shadow-md hover:bg-gray-100" />
          </div>

          <div className="block sm:hidden">
            <CarouselPrevious className="h-7 w-7 bg-white shadow-md left-0" />
            <CarouselNext className="h-7 w-7 bg-white shadow-md right-0" />
          </div>
        </Carousel>
        
        <div className="mt-4 flex justify-center space-x-1 md:hidden">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-900"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;