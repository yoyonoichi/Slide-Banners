Visit [Demo Page](http://the8thocean.com/misc/jqueryplugins/Slide-Banners/demo/)

## HTML side

		<div id="unique_id">
			<ul>
				<li><a image="path/image.jpg"></a></li>
				<li><a image="path/image.jpg"></a></li>
				<li><a image="path/image.jpg"></a></li>
			</ul>
		</div>
		
		OR
		
		<div id="unique_id">
			<noscript></noscript>
			<img class="loader" src="path/loader.gif" width="---px" height="---px" style="display:none;"/>
			<ul>
				<li><a href="http://example.com" image="path/image.jpg"></a></li>
				<li><a href="http://example.com" image="path/image.jpg"></a></li>
				<li><a href="http://example.com" image="path/image.jpg"></a></li>
			</ul>
		</div>
		

## JAVASCRIPT side

		$('#unique_id').slideBanners({options});

#### Options

* duration: Staying time of images ... (int / milliseconds)(default - 5000)
* speed: Moving speed of images ... (int / milliseconds)(default - 800)
* easing: Easing effect ... (string)(default - '')
* slideDirection: Sliding direction; 1: top to bottom or left to right, -1: bottom to top or right to left ... (1 or -1)(default - 1) 
* slideHorizontal: Sliding direction ... (boolean)(default - true)
* loading: If you have loading gif-animation image ... (boolean)(default - false)
* showButton: Showing buttons or not ... (boolean)(default - true)
* buttonStyle: Button style settings ... (object or false)(defalt - object):
                       
		> height: button height ... (int / px)(default - 25)
		> fontColor: font color ... (string)(default - '#252525')
		> fontSize: font size ... (int / px)(default - 14)
		> fontWeight: font weight ... (string)(default - 'normal')
		> fontFamily: font family ... (string)(default - 'Arial, Helvetica, sans-serif')
		> padding: padding for text ... (string)(default - '8px 15px')
		> borderWidth: border width for buttons ... (int / px)(default - 1)
		> borderType: border type for buttons ... (string)(default - 'solid')
		> borderColor: border color for buttons ... (string)(default - '#eee')
		> cornerRadius: round corner; No IE8 below ... (int / px)(default - 0)
		> bottom: button position bottom ... (int / px)(default - 0)
		> left: button position left ... (int / px)(default - 0)
		> bgColor: button background color ... (string)(default - '#fff')
		> selectColor: active button color ... (string)(default - '#f00')
		> textMargin: top margin for button text ... (int / px)(default - 0)
		> marginRight: margin right of each button ... (int / px)(default - 1)
		> opacity: buttons' transparency ... (Number / 0 - 1)(default - 0.8) 
* maps: Link mapping to images ... (Array / area tag HTML or false)(default - false) 
* text: display text for each button ... (Array / strings or false)(default - false)

#### Add link mapping

Add area tag as string to the "maps" in the options like this;

		maps:new Array('<area shape="rect" coords="0,0,100,20" href=""/>')