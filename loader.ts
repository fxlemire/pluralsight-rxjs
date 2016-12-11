import {Observable, Observer} from 'rxjs';

function load(url: string): Observable<any> {
  return Observable.create((observer: Observer<any>) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const data: any[] = JSON.parse(xhr.responseText);
        observer.next(data);
        observer.complete();
      } else {
        observer.error(xhr.statusText);
      }
    });

    xhr.open('GET', url);
    xhr.send();
  }).retryWhen(retryStrategy({attempts: 3, delay: 1500}));
}

function loadWithFetch(url: string): Observable<Response> {
  // defer allows the function to be lazy. Will only execute if someone subscribes to it.
  return Observable.defer(() => Observable.fromPromise(fetch(url).then(response => response.json())));
}

function retryStrategy({attempts = 4, delay = 1000}: any): Function {
  return (errors: Observable<string>): Observable<any> => {
    return errors
      .scan((acc, value) => {
        console.log(acc, value);
        return ++acc;
      }, 0)
      .takeWhile(acc => acc < attempts)
      .delay(delay);
  };
}

export {load, loadWithFetch};