"use client";

import { Car } from "@/lib/generated/prisma";
import { ListCars } from "../ListCars";
import { FilterAndListCarsProps } from "./FilterAndListCars.type";
import { useEffect, useState } from "react";
import { FilterCars } from "../FilterCars";

export function FilterAndListCars(props: FilterAndListCarsProps) {
  const { cars } = props;
  const [filteredCars, setFilterCars] = useState<Car[]>();
  const [filters, setFilters] = useState({
    type: "",
    transmission: "",
    engine: "",
    people: "",
  });


  useEffect(() => {
    let filtered = cars;

    if (filters.type) {
      filtered = filtered.filter((car) =>
        car.type.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    if (filters.transmission) {
      filtered = filtered.filter((car) =>
        car.transmission
          .toLowerCase()
          .includes(filters.transmission.toLowerCase())
      );
    }

    if (filters.engine) {
      filtered = filtered.filter((car) =>
        car.engine.toLowerCase().includes(filters.engine.toLowerCase())
      );
    }

    if (filters.people) {
      filtered = filtered.filter((car) =>
        car.people.toLowerCase().includes(filters.people.toLowerCase())
      );
    }

    setFilterCars(filtered);

  }, [filters, cars]);

  const handleFilteredChange = (filterName: string, filterValue: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      transmission: "",
      engine: "",
      people: "",
    })
  };

  return (
    <div>
      <FilterCars setFilters={handleFilteredChange} clearFilters={clearFilters} filters={filters} />
      <ListCars cars={filteredCars} />
    </div>
  )
}