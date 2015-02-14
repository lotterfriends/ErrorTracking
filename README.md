# ErrorTracking

Wraps JavaScript Errors with an try/catch so you got 
a stacktrace. Also you can send your errors to 
Google Analytics.

## Options
bold=default

<table>
  <tr>
    <th>name</th><th>value</th><th>description</th></tr>
  </tr>
  <tr>
	<td>debug</td><td>true/<b>false</b></td><td>print the error to console if the error cause</td>
</tr>
<tr>
	<td>throwErrors</td><td><b>true</b>/false</td><td>print the error to console if the error cause</td>
</tr>
<tr>
	<td>pushToAnalytics</td><td>true/<b>false</b></td><td>ush errors to google analytics</td>
</tr>
</table>


## Access

```javascript
window.errorTracking // the object
window.errorTracking.errorStack // list of all occured errors
window.errorTracking.printErrors() // print all errors from the errorStack list to console
window.errorTracking.printError(error) // print one error to console
window.errorTracking.clearErrorStack() // clear the list of occured errors
window.errorTracking.functionsToTrack // list of all functions we wrap with try/catch
```
