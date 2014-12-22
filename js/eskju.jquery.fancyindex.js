/*
 * jQuery fancyIndex plugin
 *
 * Copyright (c) 2014 Christian Witte
 * licensed under MIT license.
 *
 * https://github.com/eskju/eskju-jquery-fancyindex
 *
 * Version: 1.0
 * 
 * Licensed under MIT license.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

	$.fn.FancyIndex = function( options )
	{
		new FancyIndex( this, options );
	}
	
	FancyIndex = function( selector, options )
	{
		this.init( selector, options );
	}
	
	$.extend( FancyIndex.prototype,
	{
		init : function( selector, options )
		{
			this.selector = $( selector );
			this.items = [];
			this.disabled = false;
			this.lastActivity = 0;
			this.options = $.extend(
			{
				hideWhenInactive: true,
				focusInitally: true,
				focusOnResize: true,
				focusOnScroll: true,
				focusOnHover: true,
				focusTimeout: 1000,
				firstOnly: false,
				forceLastActive: true,
				scrollToDuration: 1000,
				scrollOnClick: true,
				maxPrioritizedItems: 3,
			}, options );
			
			this.loadHierarchy();
			this.bindSelf();
			this.bindScroll();
			this.bindResize();
			this.bindHover();
			this.updateItems();
			
			if( this.options.hideWhenInactive )
			{
				if( this.options.focusInitally )
				{
					this.setActive();
				}
				else
				{
					this.hide();
				}
			}
		},
		
		setActive : function()
		{
			var $this = this;
			$( "#esKju-fancyIndex" ).removeClass( "inactive" );
			$( "#esKju-fancyIndex" ).animate( { minHeight: 0 }, parseInt( this.options.focusTimeout ), function()
			{
				$this.hide();
			});
		},
		
		hide: function()
		{
			if( this.options.hideWhenInactive )
			{
				$( "#esKju-fancyIndex" ).addClass( "inactive" );
			}
		},
		
		bindSelf: function()
		{
			var $this = this;
			
			$( "body" ).bind( "refreshFancyIndex", function( e, options )
			{
				$this.options = options;
			});
		},
		
		bindScroll : function()
		{
			var $this = this;
			
			$( window ).scroll( function()
			{
			 	$this.updateItems();
			 	
			 	if( $this.options.focusOnScroll )
			 	{
			 		$this.setActive();
			 	}
			});
		},
		
		bindResize: function()
		{
			var $this = this;
			
			$( window ).resize( function()
			{
			 	$this.updateItems();
			 	
			 	if( $this.options.focusOnResize )
			 	{
			 		$this.setActive();
			 	}
			});
		},
		
		bindHover: function()
		{
			var $this = this;
			
			$( "#esKju-fancyIndex" ).hover( function()
			{
			 	if( $this.options.focusOnHover )
			 	{
			 		$this.setActive();
			 	}
			});
		},
		
		updateItems : function()
		{
			var $this = this;
			var windowTop = $( window ).scrollTop()
			var windowHeight = $( window ).height();
			var firstFound = false;
			var focusedItems = parseInt( this.options.maxPrioritizedItems );
			var lastActive = false;
			 	
		 	$.each( $this.items, function( key, obj )
		 	{
		 		$( obj.obj ).removeClass( "active" );
		 		$( obj.obj ).removeClass( "prioritized" );
	 			
	 			for( i = 1; i <= parseInt( $this.options.maxPrioritizedItems ); i++ )
	 			{
	 				$( obj.obj ).removeClass( "priority-" + i );
	 			}
	 			
	 			if( windowTop > parseInt( obj.offset.top ) + 50 )
	 			{
 					lastActive = $( obj.obj );
	 			}
		 		
		 		if( ( windowTop <= parseInt( obj.offset.top ) + 50 && windowTop + windowHeight >= parseInt( obj.offset.top ) && ( !$this.options.firstOnly || !firstFound ) ) && ( parseInt( $this.options.maxPrioritizedItems ) == 0 || focusedItems > 0 ) )
		 		{
		 			$( obj.obj ).addClass( "active" );
		 			$( obj.obj ).addClass( "prioritized" );
		 			$( obj.obj ).addClass( "priority-" + focusedItems );
		 			firstFound = true;
		 			focusedItems--;
		 		}
		 	});
		 	
		 	if( $this.options.forceLastActive && $( "#esKju-fancyIndex .active" ).length == 0 )
	 		{
	 			$( lastActive ).addClass( "active" );
	 			$( lastActive ).addClass( "prioritized" );
	 			$( lastActive ).addClass( "priority-" + $this.options.maxPrioritizedItems );
	 		}
		},
		
		loadHierarchy : function()
		{
			var $this = this;
			this.items = [];
			
			esKjuFancyIndex = $( "<ul>" ).attr( "id", "esKju-fancyIndex" );
			$( "body" ).append( esKjuFancyIndex );
			
			$( this.selector.find( "h1,h2,h3,h4,h5,h6,h7" ) ).each( function( key, obj )
			{
				var tag = $( obj ).prop( "tagName" ).toLowerCase();
				var content = $( obj ).html();
				var offset = $( obj ).offset();
				var item = $( "<li>" ).addClass( tag ).html( "<div>" + content + "</div>" );
				esKjuFancyIndex.append( item );
				
				$this.items.push({ 
					offset: offset, 
					obj: item 
				}); 
				
				if( $this.options.scrollOnClick )
				{
					$( item ).find( "div" ).click( function( )
					{
						offset = $( obj ).offset();
						$( "html, body" ).animate({ scrollTop: offset.top }, parseInt( $this.options.scrollToDuration ) );
					});
				}
			});
		}
	});