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
  return Observable.defer(() => {
    return Observable.fromPromise(
      fetch(url).then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      }));
  }).retryWhen(retryStrategy());
}

function retryStrategy({attempts = 4, delay = 1000} = {}): any { // tslint:disable-line:typedef
  return (errors: Observable<string>): Observable<any> => {
    return errors
      .scan((acc, value) => {
        if (++acc < attempts) {
          return acc;
        }

        throw new Error(value);
      }, 0)
      .delay(delay);
  };
}

export {load, loadWithFetch};
