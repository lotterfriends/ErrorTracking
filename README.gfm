# ErrorTracking

Wraps JavaScript Errors with an try/catch so you got 
a stacktrace. Also you can send your errors to 
Google Analytics.

## Options
bold=default

| name  | value | decription |
------------- | -------------
| debug | true/**false** | print the error to console if the error cause |
| throwErrors | **true**/false | throw the error |
| pushToAnalytics | true/**false** | push errors to google analytics |



## Access

```javascript
window.errorTracking // the object
window.errorTracking.errorStack // list of all occured errors
window.errorTracking.printErrors() // print all errors from the errorStack list to console
window.errorTracking.printError(error) // print one error to console
window.errorTracking.clearErrorStack() // clear the list of occured errors
window.errorTracking.functionsToTrack // list of all functions we wrap with try/catch
```
