# ErrorTracking

Wraps JavaScript Errors with an try/catch so you got 
a stacktrace. Also you can send your errors to 
Google Analytics.

## start
```
> npm install
> grunt
```

## new release
```
> grunt release
```

## develop
```
> grunt watch
```


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

## Example usage
```html
<script type="text/javascript" src="http://cdn.rawgit.com/lotterfriends/ErrorTracking/master/build/ErrorTracking.min.js"></script>
<script type="text/javascript">
var errorTracking = new ErrorTracking({
  pushToAnalytics: true
});	
</script>
```

## Access

```javascript
errorTracking // the object var
errorTracking.errorStack // list of all occured errors
errorTracking.printErrors() // print all errors from the errorStack list to console
errorTracking.printError(error) // print one error to console
errorTracking.clearErrorStack() // clear the list of occured errors
errorTracking.functionsToTrack // list of all functions we wrap with try/catch
```
