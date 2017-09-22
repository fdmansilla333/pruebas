<!--//--><![CDATA[//><!--

function ieHover() {
	var sfEls = document.getElementById("menu").getElementsByTagName("DIV");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
         this.noHvrClass = this.className;
         this.className=this.className.replace(new RegExp("^(\\w+?)\\b"), "$1 $1-hvr");          
         //alert(this.className);         
		}
		sfEls[i].onmouseout=function() {
         if (this.noHvrClass != undefined)
         {
            this.className = this.noHvrClass;
            //alert(this.className);
         }
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", ieHover);

//--><!]]>