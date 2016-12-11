import {Observable, Observer} from 'rxjs';

import {load, loadWithFetch} from './loader';

const output = document.getElementById('output');
const button = document.getElementById('button');
const click = Observable.fromEvent(button, 'click');

function renderMovies(movies: any): void {
  movies.forEach(m => {
    const div = document.createElement('div');
    div.innerText = m.title;
    output.appendChild(div);
  });
}

click
  .flatMap(e => load('movies.json'))
  // .flatMap(e => loadWithFetch('movies.json'))
  .subscribe(
    renderMovies,
    e => console.log(`error: ${e}`),
    () => console.log('complete'),
  );
