import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

export const DiceStore = signalStore(
  withState({
    current: 0,
    rollCounts: [0, 0, 0, 0, 0, 0,]
  }),
  withMethods((store) => ({
    roll: () => {
      const rolledValue = Math.floor(Math.random() * 6) + 1;
      const updatedCounts = [...store.rollCounts()];
      updatedCounts[rolledValue - 1]++;
      patchState(store, { current: rolledValue, rollCounts: updatedCounts })
    }
  })
  ))
