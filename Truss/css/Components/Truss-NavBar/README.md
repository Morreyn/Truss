Three Tier Fixed Top Navigation Bar
=======
A Three Tier Fixed-position Top Navigation Bar that remains visible while the user scrolls the page. 

### Setup:
------
**1. Include CSS files (normalize.css and truss-navbar-style.css) 		
	<link  href="css/normalize.css" rel="stylesheet" type="text/css" media="all">
	<link href="css/truss-navbar-style.css" rel="stylesheet" type="text/css" media="all">

**2. Include HTML Navigation Bar (modify to your needs)
````html
Change the anchor tag description for the item and include any necessary href links.
When adding list items to navbar, besure to include any required classes.
Class: 'right', 'left', 'down' are for the direction of arrow image. 	
Class 'last' is for the operation of left flyout.		
The top level list items is fixed width. 
If list items are added or removed the width will require changing in the CSS.

<nav id="navBarId">
	<ul>
		<li><a  class=" down" href="index.html">Menu1</a>
			<ul>	
				<li><a class="right" href="#" >Menu11</a>
					<ul>
						<li><a href="#">Menu111</a></li>
						<li><a href="#">Menu112</a></li>
						<li><a href="#">Menu113</a></li>
						<li><a href="#">Menu114</a></li>
					</ul>
				</li>
			</ul>
		  </li>
		<li><a  class=" down" href="#">Menu2</a>
			<ul>
				<li><a href="#">Menu21</a></li>
				<li><a href="#">Menu22</a></li>
				<li><a href="#">Menu23</a></li>
				<li><a  class="right" href="#">Menu24</a>
					<ul>
						<li><a href="#">Menu241</a></li>
						<li><a href="#">Menu242</a></li>
					</ul>
				</li>
				<li><a href="#">Menu25</a></li>
				<li><a href="#">Menu26</a></li>
				<li><a href="#">Menu27</a></li>
			</ul>
		</li>
		<li><a class=" down" href="#">Menu3</a>
			<ul>
				<li><a class="right" href="#">Menu31</a>
					<ul>
						<li><a href="#">Menu311</a></li>
						<li><a href="#">Menu312</a></li>
						<li><a href="#">Menu313</a></li>
						<li><a href="#">Menu314</a></li>
					</ul>
				</li>
				<li><a  class="right"  href="#">Menu32</a>
					<ul>
						<li><a href="#">Menu321</a></li>
						<li><a href="#">Menu322</a></li>
						<li><a href="#">Menu323</a></li>
						<li><a href="#">Menu324</a></li>
					</ul>
				</li>
				<li><a class="right" href="#" >Menu33</a>
					<ul>
						<li><a href="#">Menu331</a></li>
						<li><a href="#">Menu332</a></li>
						<li><a href="#">Menu333</a></li>
						<li><a href="#">Menu334</a></li>
					</ul>
				</li>
				<li><a href="#">Menu34</a></li>
				<li><a href="#">Menu35</a></li>
				<li><a href="#">Menu36</a></li>
			</ul>

		</li>
		<li class="last"><a class="down" href="#">Menu4</a>
			<ul>
				<li><a href="#">Menu41</a></li>
				<li><a href="#">Menu42</a></li>
				<li><a  href="#" class="left">Menu43</a>
					<ul>
						<li><a href="#">Menu431</a></li>
						<li><a href="#">Menu432</a></li>
						<li><a href="#">Menu433</a></li>
						<li><a href="#">Menu434</a></li>
						<li><a href="#">Menu435</a></li>
					</ul>
				</li>
				<li><a href="#">Menu44</a></li>
			</ul>
		</li>
	</ul>
</nav>			
````

**3. Include Optional Embedded CSS (modify to your needs). See table below.
````CSS
/*  CAN CHANGE THE DEFAULT LIST ITEM COLORS HERE OR IN THE CSS FILE*/		
/*  SETS ALL LIST ITEM COLOR  */					
	#navBarId ul li a {
		background: #cfc796;
		border-top: 2px solid #144c85;
		border-right: 2px solid #0d3155;
		border-bottom: 2px solid #0d3155;
		border-left: 2px solid #144c85;	
		}
		
/*  BACKGROUND COLOR FOR LIST ITEM THAT CONTAINS THE ARROW IMAGE  */	
	#navBarId li a.right, #navBarId li a.down, #navBarId li a.left  {
		background-color: #cfc796;
		}
	
/*  SETS HOVER OR FOCUS LIST ITEM COLOR  */			
	#navBarId ul li a:hover,
	#navBarId ul li a:focus {
		background: #dcd6b2;       
		border-top: 2px solid #e8dd9c;
		border-right: 2px solid #f0e8b9;
		border-bottom: 2px solid #f0e8b9;
		border-left: 2px solid  #e8dd9c;
		}
:-------------|:------------------------------------------------------------------------------------|:-------------|:-------------------| 
| Option      |    Desciption                                                                       | Type         | Default            | :-------------|:------------------------------------------------------------------------------------|:-------------|:-------------------|  
|background   | Background color for list item.                                                     | String (hex) | #cfc796 and #dcd6b2|
|background   | Background color for list item that contains the arrow image.                       | String (hex) | #cfc796            |
|border-'side'| Border background color values for a specific side: top, right, bottom, left.       | String (hex) | #144c85 #0d3155    |
|             | 	                                                                                |              | #e8dd9c #f0e8b9    |
:-------------|:------------------------------------------------------------------------------------|:-------------|:-------------------| 

**4. These styles do not automatically make up a finished site navigation bar. 
They are simply a starting point, ideally for rapid prototyping or as a basis for creating your own navigation bar. 
You should not feel constrained by the way I have built the initial code. 
If you disagree with how something has been done, feel free to revise it for the needs of your particular site.
````
````