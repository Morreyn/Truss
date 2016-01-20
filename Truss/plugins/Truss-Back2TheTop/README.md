jQuery - back2TheTop()
=======
A simple customizable plugin for scrolling BACK 2 THE TOP of page.

### Operation:
------
**1. Run the Truss-Back2TheTop-demo.html demonstration HTML. 
This will show how the plugin functions. 

**2. Apply the setup to Truss-Back2TheTop.html or your HTML file. 

### Setup:
------
**1. Include JS files (jQuery = 1.11.3 and back2TheTop.js)**
````html
<script src="js/jquery.1.11.3.min.js"></script>
<script src="js/jquery.back2TheTop.js"></script>
````

**2. Include CSS (modify if desired)**
<!-- 		back2TheTop CSS 				-->
<link href="css/back2TheTop.css" rel="stylesheet" type="text/css" />
	
````css
<style>
#back2TheTopId {	  
/* modify below css for your needs */ 
/* for example - left: 20px        */ 	
	width: 35px;
	height: 35px;
	right: 20px; 
  }
</style>
````

**3. Include in HTML Back 2 The Top Arrow Icon**
````html
 <div id="back2TheTopId">BACK 2 THE TOP</div>
````

**4. Include in HTML jQuery call method back2TheTop()**
````javascript
 $("#back2TheTopId").back2TheTop();
````

**5. If desired include and modify the options for back2TheTop Arrow Image:
````javascript
$("#back2TheTopId").back2TheTop({
	shownAt: 150,
	fadeSpeed: 2000,
	scrollSpeed: 1000,
	arrowImage: 'round-grey'
});

|:------------|:-----------------|:-----------------------------------------------------------------------------------------|:-------------------|
| Option      | Type             | Description                                                                              | Default            | 
|:------------|:-----------------|:-----------------------------------------------------------------------------------------|:-------------------|
| shownAt     | Integer (px)     | Where scroll image should show based on scrollbar's vertical position.                   | 150                |
|             |                  | (higher the number, the longer it takes for scroll image to appear)                      |                    |
| fadeSpeed   | Integer (ms)     | Control 'Fade' effect speed for scroll image.                                            | 2000               |
| scrollSpeed | Integer (ms)     | Control speed when animation scrolls up.                                                 | 1000               |
| arrowImage  | String (image)   | Selects the Arrow Image.                                                                 |                    |
|             |                  | Image names: white, black, red, grey, green, round-blue, round-green, round-orange,      | round-grey         |
|             |                  | round-grey, round-corner-grey, round-corner-black, round-broken-line.                    |                    |                     
|:------------|:-----------------|:-----------------------------------------------------------------------------------------|--------------------|
````
````

 
