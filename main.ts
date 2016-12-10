/* should do something similar to what's below in prod do reduce app size instead of general import */
// import {Observable} from 'rxjs/Observable';
// import {Observer} from 'rxjs/Observer';

// import 'rxjs/add/observable/from';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/map';
import {Observable, Observer} from 'rxjs';

const numbers = [1, 5, 10];
let source: Observable<any>;

function createObservableFrom(): void {
  class MyObserver implements Observer<number> {
    next(value: any): void {
      console.log(`value: ${value}`);
    }

    error(e: any): void {
      console.log(`error: ${e}`);
    }

    complete(): void {
      console.log('complete');
    }
  }

  source = Observable.from(numbers);
  // source.subscribe(new MyObserver());
}

function createObservableCreate(): void {
  source = Observable.create(observer => {
    for (let n of numbers) {
      if (n === 5) {
        observer.error('Something went wrong!');
      }

      observer.next(n);
    }

    observer.complete();
  });
}

function observableOverTime(): void {
  source = Observable.create(observer => {
    let index = 0;
    let produceValue = () => {
      observer.next(numbers[index++]);

      if (index < numbers.length) {
        setTimeout(produceValue, 250);
      } else {
        observer.complete();
      }
    };

    produceValue();
  })
  .map(n => n * 2)
  .filter(n => n > 4);
}

// createObservableFrom();
// createObservableCreate();
observableOverTime();

source.subscribe(
  value => console.log(`value: ${value}`),
  e => console.log(`error: ${e}`),
  () => console.log('complete'),
);
