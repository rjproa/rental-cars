import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';
import { Car } from '@/lib/generated/prisma';
import { set } from 'zod';
import { get } from 'http';

interface UseLovedCarsType {
  lovedItems: Car[],
  addLovedItem: (car: Car) => void,
  removeLovedItem: (carId: string) => void,
}

export const useLovedCars = create(
  persist<UseLovedCarsType>(
    (set, get) => ({
      lovedItems: [],
      addLovedItem: (data: Car) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find(item => item.id === data.id);

        if (existingItem) {
          return toast.error('El coche ya está en tus favoritos');
        }

        set({
          lovedItems: [...get().lovedItems, data]
        })

        toast.success('Coche añadido a tus favoritos');

      },
      removeLovedItem: (id: string) => {
        set({
          lovedItems: [...get().lovedItems.filter((item) => item.id !== id)]
        })
        toast.success('Coche eliminado de tus favoritos');
      }
    }),
    {
      name: "loved-cars-storage",
      storage: createJSONStorage(() => localStorage),
    }

  )
)