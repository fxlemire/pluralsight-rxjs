import {Observable, Observer} from 'rxjs';

import {load, loadWithFetch} from './loader';

const source = Observable.merge(
  Observable.of(1),
  Observable.from([2, 3, 4]),
  Observable.throw(new Error('Stop!')),
  Observable.of(5),
).catch(e => {
  console.log(`caught: ${e}`);
  return Observable.of(10);
});

source.subscribe(
  value => console.log(`value: ${value}`),
  e => console.error(`error: ${e}`),
  () => console.log('complete'),
);

// const output = document.getElementById('output');
// const button = document.getElementById('button');
// const click = Observable.fromEvent(button, 'click');

// function renderMovies(movies: any): void {
//   movies.forEach(m => {
//     const div = document.createElement('div');
//     div.innerText = m.title;
//     output.appendChild(div);
//   });
// }

// click
//   // .flatMap(e => load('movies.json'))
//   .flatMap(e => loadWithFetch('movies.json'))
//   .subscribe(
//     renderMovies,
//     e => console.log(`error: ${e}`),
//     () => console.log('complete'),
//   );
