<!--
// utils

function GetElementById(elemId)
{
   if (document.getElementById)
   {
     e = document.getElementById(elemId);   
   }
   else if (document.all) 
   {
      e = document.all(elemId);      
   }
   return e;  
}   
   
function SetClass(elemId,className)   
{
	e = GetElementById(elemId);
	e.className = className;
	
}

function AddClass(elemId,className)   
{
	e = GetElementById(elemId);
	e.className = e.className + " " + className;	
}

function SetImgSrc(imgId,imgSrc)   
{
	e = GetElementById(imgId);
	e.src = imgSrc;
	
}

// Fo NS. IE doesn't get upset, though. It jsut returns doc
function FindTopDoc(doc)
{
	var topDoc = doc;
	
	if (doc.layers)
	{
		var topLayer = doc.parentLayer;
	
		while ( topLayer != null)
		{
			topDoc = topLayer.document;
			topLayer = doc.parentLayer;		
		}
	}
	
	return topDoc;
}


function FindImage(imageName, doc)
{
   	var i, img;

  	for (i = 0; i < doc.images.length; i++)
    	if (doc.images[i].name == imageName)
	      return doc.images[i];
  
	// for NS 
	if (doc.layers)
	{
		for (i = 0; i < doc.layers.length; i++)
		{
			if ((img = FindImage(imageName, doc.layers[i].document)) != null) 
			{
    			img.container = doc.layers[i];
	      		return img;
    		}
		}
	}
		
  	return null;
}


// MouseOverImage methods

function MOIOn()
{
	this.onCount++;
	targetImg = FindImage(this.imgTagName, FindTopDoc(document));
	if (targetImg != null)
	{
		if (this.onImg.src == "")
		{
			this.curimg   = this.overImg;
			targetImg.src = this.overImg.src;
		}
		else
		{
			this.curimg   = this.onImg;
			targetImg.src = this.onImg.src;	
		}
	}
}

function MOIOff()
{
	if (this.onCount >= 0)
	{
		this.onCount--;
	}

	if (this.onCount == 0)
	{
		targetImg = FindImage(this.imgTagName, FindTopDoc(document));
		if (targetImg != null)
		{
			this.curImg = this.offImg;
			targetImg.src = this.offImg.src;
		}
	}

}

function MOIOver()
{
	//if (this.onCount == 0)
	//{
		this.overCount++;
		targetImg = FindImage(this.imgTagName, FindTopDoc(document));
		if (targetImg != null)
		{
			this.curimg   = this.overImg;
			targetImg.src = this.overImg.src;
		}
	//}
}

function MOIOut()
{
	if (this.overCount >= 0)
	{
		this.overCount--;
	}
	
	targetImg = FindImage(this.imgTagName, FindTopDoc(document));
	if (targetImg != null)
	{	
		if (this.overCount == 0)
		{
			if (this.onCount == 0)
			{
				this.curImg = this.offImg;
				targetImg.src = this.offImg.src;
			}
			else
			{
				this.curImg = this.onImg;
				targetImg.src = this.onImg.src;			
			}
		}
	}
}

function MouseOverImage(imgTagName, offImgFile, overImgFile, onImgFile)
{
	this.offImg = new Image;
	this.offImg.src = offImgFile;
	
	this.overImg = new Image;
	this.overImg.src = overImgFile;

	this.onImg = new Image;
	this.onImg.src = onImgFile;	
	
	this.imgTagName = imgTagName;
	this.overCount = 0;
	this.onCount = 0;
	
	this.curImg = this.offImg;
	
	this.Over = MOIOver;
	this.Out  = MOIOut;
	
	this.On   = MOIOn;
	this.Off  = MOIOff;
}



// -->