// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({
        color
    }) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async() => {
    let[tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function : setPageBackgroundColor,
    });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
    var mouseX = null;
    var mouseY = null;
    let element = document.createElement('div');
    element.id = "click-container";
    element.style = "position: fixed;	left: 0px; top: 0px; bottom: 0px; right: 0px; z-index: 999; cursor: crosshair;";
    element.addEventListener('click',e => {
      const getGapElement = () => {
        let gapElement = document.createElement('div');
        gapElement.style = `width: 1.230769230769231%;
                            height: 100%;
                            opacity: 0.5;
                            background-color: pink;`;
        return gapElement;
      }
      const getColElement = () => {
        let colElement = document.createElement('div');
        colElement.style = `width: 7%;
                            height: 100%;
                            opacity: 0.5;
                            background-color: blue;`;
        return colElement;
      }
      
      if (mouseX == null && mouseY == null) {
        mouseX = e.pageX;
        mouseY = e.pageY;
        let gridTest = document.createElement('div');
        gridTest.id = "grid-test";
        gridTest.style = `position: absolute;	
                          left: ${mouseX}px; 
                           top: ${mouseY}px; 
                           z-index: 998; 
                           opacity: 0.5;
                           background-color: black;
                           color: white`;
        document.getElementById("click-container").addEventListener('mousemove', e => {
          let gridElement = document.getElementById("grid-test");
          gridElement.innerHTML = `${Math.abs(mouseX - e.pageX)} X ${Math.abs(mouseY - e.pageY)}`;
          gridElement.style.left = Math.min(mouseX, e.pageX) + "px";
          gridElement.style.top = Math.min(mouseY, e.pageY) + "px";
          gridElement.style.width = Math.abs(mouseX - e.pageX) + "px";
          gridElement.style.height = Math.abs(mouseY - e.pageY) + "px";
        })
        document.body.appendChild(gridTest);
      } else {
        document.getElementById("grid-test").remove();
        let gridWrapper = document.createElement('div');
        gridWrapper.id = "grid-container";
        gridWrapper.style = `position: absolute;	
                           left: ${Math.min(mouseX, e.pageX)}px; 
                           top: ${Math.min(mouseY, e.pageY)}px; 
                           width: ${Math.abs(mouseX - e.pageX)}px; 
                           height: ${Math.abs(mouseY - e.pageY)}px;
                           z-index: 999; 
                           opacity: 0.5;`;
        let gridContent = document.createElement('div');
        gridContent.style = `display: flex;	width: 100%; height: 100%;`;
        gridWrapper.appendChild(gridContent);
        gridContent.appendChild(getGapElement());
        gridContent.appendChild(getColElement());
        gridContent.appendChild(getGapElement());
        gridContent.appendChild(getColElement());
        gridContent.appendChild(getGapElement());
        gridContent.appendChild(getColElement());
        gridContent.appendChild(getGapElement());
        gridContent.appendChild(getColElement());
        gridContent.appendChild(getGapElement());
        gridContent.appendChild(getColElement());
        gridContent.appendChild(getGapElement());
        gridContent.appendChild(getColElement());
        gridContent.appendChild(getGapElement());
        gridContent.appendChild(getColElement());
        gridContent.appendChild(getGapElement());
        gridContent.appendChild(getColElement());
        gridContent.appendChild(getGapElement());
        gridContent.appendChild(getColElement());
        gridContent.appendChild(getGapElement());
        gridContent.appendChild(getColElement());
        gridContent.appendChild(getGapElement());
        gridContent.appendChild(getColElement());
        gridContent.appendChild(getGapElement());
        gridContent.appendChild(getColElement());
        gridContent.appendChild(getGapElement());
        document.body.appendChild(gridWrapper);
        let clickContainer = document.getElementById("click-container");
        clickContainer.remove();
        mouseX = null;
        mouseY = null;
      }
    });
    document.body.appendChild(element);
}
