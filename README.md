# esKju's jQuery FancyIndex Plugin

## What is it?

Nowadays almost every "fresh" page looks the (s)hame: One page, very content, much scroll. So even though you really hate usability, enhance your design patters by using customer-orientated plugins like this.
It was built using the jQuery library. Licensed under MIT and GPL licenses.

## Features

+ Using the directory-function upgrades the user's experience
+ Customizable trough settings and CSS
+ Highly compatible
+ Highly customizable
+ Uses CSS3 transitions by default

## How to use

### 1. doctype

Make sure you are using valid DOCTYPE. This is required for FancyIndex to look and function correctly.

```
<!DOCTYPE html>
```

### 2. include files

Loading jQuery from CDN (Content Delivery Network) is recommended.
Include all FancyIndex JavaScript and CSS files in addition.

```
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/eskju.jquery.fancyindex.js"></script>
<link rel="stylesheet" href="css/eskju.jquery.fancyindex.css" />
```

### 3. html markup

Create a HTML container.

```
<-- oh wait... it's created automatically, nothing to do here :) -->
<-- just skip this gratuitous step! :) -->
```

### 4. fire plugin using jquery selector

If you are not familiar with jQuery, please, read this tutorial for beginners.
Sample examples:

```
$( document ).ready( function( )
{
	// instead of "body" use your desired containing element
	// "body" fetchs all information
	$( "body" ).FancyIndex(); 
} );
```


## Options

Easy plugin, easy life. Configure things just to taste :)

```
$( document ).ready( function( )
{
	$( "body" ).FancyIndex( {
		your: "option",
		will: "be",
		the: "best"
	});
} );
```

| Option | Type | Default | Description |
|---------------------|---------|-------|---------------------------------------------------|
| hideWhenInactive | boolean | true | Hide index if unwanted |
| focusInitally | boolean | true | Focus index on load |
| focusOnResize | boolean | true | Focus index on window resize |
| focusOnScroll | boolean | true | Focus index on scroll |
| focusOnHover | boolean | true | Focus index on hover |
| focusTimeout | int | 1000 | Time before setting index inactive |
| firstOnly | boolean | false | Highlight the first match only |
| forceLastActive | boolean | true | Highlight the last headline (even if not visible) |
| scrollOnClick | boolean | true | Scroll to desired section once clicked |
| scrollToDuration | int | 1000 | Scroll duration |
| maxPrioritizedItems | int | 3 | Number of prioritized items (important for CSS) |
| flipPosition | boolean | false | Pulls index to left screen border |

## HTML Attributes

Customize single HTML objects

| Option | Type | Default | Description |
|---------------------|---------|-------|---------------------------------------------------|
| data-fancyindex-hide | boolean | false | Hide this HTML item in index |
| data-fancyindex-title | string | | Custom title in index (use HTML content if empty) |


## Author & Help

For more information visit the author's page:

+ <http://www.cwdesigns.de> esKju's Playground
+ <http://www.cwdesigns.de/eskju-jquery-lazyimage.html> esKju's LazyImage Project Page
