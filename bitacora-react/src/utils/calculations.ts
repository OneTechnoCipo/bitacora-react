
// src/utils/calculations.ts
import type { Trip, CalcResult } from '../models/types';

export const calculateStatics = (trip: Trip): CalcResult | null => {
    // Si no hay KM inicial o no hay cargas, no hay nada que calcular
    if (trip.initKm === null || trip.loads.length === 0) {
        return null;
    }

// I struggled with the math logic here. Initially, I tried mapping through the array 
  // and adding the differences between each load step-by-step, but the calculation was 
  // always returning wrong totals or breaking. 
  // Then I realized the simplest and most accurate way is just to subtract the starting KM 
  // from the very last recorded load. Much cleaner.
  const lastLoad = trip.loads[trip.loads.length - 1];
  const totalDistance = lastLoad.km - trip.initKm;

    // Validación para evitar distancias negativas o cero
    if (totalDistance <= 0) {
        return null;
    }

    const totalLiters = trip.loads.reduce((acc, load) => acc + load.liters, 0);
    const averageConsumption = (totalLiters / totalDistance) * 100;

    return {
        totalDistance,
        totalLiters,
        averageConsumption
    };
};