import {Injectable} from 'angular2/core';
import {Hero} from './../hero';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Router} from 'angular2/router';


@Injectable()
export class HeroService {
  
  private _url = 'http://localhost:5000/api/hero';
  private _options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json'})});

  constructor(private _http: Http, private _router: Router) { }

  get(): Observable<Hero[]> {
    return this._http.get(this._url)
      .map(res=> <Hero[]>res.json())
      .catch(this.handleError);
  }

  getById(id: string): Observable<Hero> {
    return this._http.get(`${this._url}/${id}`)
      .map(res=> <Hero>res.json())
      .catch(this.handleError);
  }
  
  post(hero){
    this._http.post(this._url, JSON.stringify(hero), this._options)
    .subscribe(res=>{this._router.navigate(['Dashboard'])});
  }
  
  delete(id){
    this._http.delete(`${this._url}/${id}`).subscribe();
  }
  
  update(hero:Hero){
    this._http.put(this._url, JSON.stringify(hero), this._options)
    .subscribe(res=>{this._router.navigate(['Dashboard'])});
  }

  private handleError(error: Response) {
    var errorMessage = 'Server Error';

    if (error.json && error.json().error) {
      errorMessage = error.json().error;
    }

    return Observable.throw(errorMessage);
  }
}