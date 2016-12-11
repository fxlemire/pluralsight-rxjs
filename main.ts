import {Observable, Observer} from 'rxjs';

const output = document.getElementById('output');
const button = document.getElementById('button');
const click = Observable.fromEvent(button, 'click');

function load(url: string): Observable<any> {
  return Observable.create((observer: Observer<any>) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      const data: any[] = JSON.parse(xhr.responseText);
      observer.next(data);
      observer.complete();
    });

    xhr.open('GET', url);
    xhr.send();
  });
}

function renderMovies(movies: any[]): void {
  movies.forEach(m => {
    const div = document.createElement('div');
    div.innerText = m.title;
    output.appendChild(div);
  });
}

click
  .flatMap(e => load('movies.json'))
  .subscribe(
    renderMovies,
    e => console.log(`error: ${e}`),
    () => console.log('complete'),
  );
