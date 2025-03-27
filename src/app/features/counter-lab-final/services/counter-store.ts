import { computed, effect } from '@angular/core';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
const COUNTBYVALUES = [1, 2, 3, 4, 5] as const;

type CountByValues = (typeof COUNTBYVALUES)[number];
type CounterState = {
  countBy: CountByValues;
  currentNumber: number;
};
export const CounterStore = signalStore(
  withState<CounterState>({
    countBy: 1,
    currentNumber: 0,
  }),
  withProps(() => ({
    availableCountByValues: COUNTBYVALUES,
  })),
  withMethods((store) => {
    return {
      setCountBy: (countBy: CountByValues) => patchState(store, { countBy }),
      increment: () =>
        patchState(store, {
          currentNumber: store.currentNumber() + store.countBy(),
        }),
      decrement: () =>
        patchState(store, {
          currentNumber: store.currentNumber() - store.countBy(),
        }),
    };
  }),
  withComputed((store) => {
    return {
      decrementShouldBeDisabled: computed(
        () => store.currentNumber() - store.countBy() < 0,
      ),
      fizzBuzz: computed(() => {
        const currentNumber = store.currentNumber();
        return fizzBuzzer(currentNumber);
      }),
      primeNumber: computed(() => {
        const currentNumber = store.currentNumber();
        return primeNumber(currentNumber);
      }),
    };
  }),

  withHooks({
    onInit(store) {
      // check to see if it is in localstorage and if it is, set the state
      const savedJson = localStorage.getItem('counter-data-final');
      if (savedJson) {
        const savedState = JSON.parse(savedJson) as CounterState;

        patchState(store, savedState);
      }

      effect(() => {
        const stateToSave = JSON.stringify(getState(store));
        localStorage.setItem('counter-data-final', stateToSave);
      });
    },
  }),
);

function isFizz(n: number) {
  return n % 3 === 0;
}

function isBuzz(n: number) {
  return n % 5 === 0;
}
function isFizzBuzz(n: number) {
  return isFizz(n) && isBuzz(n);
}

function fizzBuzzer(n: number): 'Fizz' | 'Buzz' | 'FizzBuzz' | undefined {
  if (n === 0) {
    return undefined;
  }
  if (isFizzBuzz(n)) {
    return 'FizzBuzz';
  }
  if (isFizz(n)) {
    return 'Fizz';
  }
  if (isBuzz(n)) {
    return 'Buzz';
  }
  return undefined;
}

function isPrime(n: number) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function primeNumber(n: number) {
  if (isPrime(n)) {
    return 'This number is a prime Number!';
  }
  return 'This number is NOT a prime Number!';
}
