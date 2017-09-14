# BrowserHistory

This service gives access to session navigation history. Is useful for example if you want get back to page after a few redirection. History if you want can be save in localStorage and will be available even after escape from the site. Default automaticly when stack find key in localStorage starts saving every change.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.7.

## Installation

To start using browser history you must download service from github and import `BrowsingHistoryModule` from `browser-history.module` to your `app.module` 

## Documentation

 | Function | Description |
 | ------------- |:-------------:| 
 | `getHistory()` | return full history as `observable`|
 | `filterBySegmentId(id:number, position:string )` | return filtered first or last element of sequence in column with id as `observable`. `id` is number of column, `position` (default `'first'` accept value `'last'`) is responsible for choose whitch element should be returned |
 | `filterBySegment( segmentName: string, segmentId?: number)` | return filtered element of history which contain segment with specified name. `segmentId` skip elements which contain specified name in different segment then specified in id |
 | `saveStackStatus(status:boolean)` | Specified whether history should be saved in `localStorage` |
 | `getSaveStackStatus()` | return information about status of stackSave | 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
